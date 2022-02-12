import React from "react";
import axios from "axios";
import Nav from "../src/components/Nav";
import { Grid, Typography, Container, Button, Divider, Paper } from '@material-ui/core';
import BillingCycleSwitch from "../src/components/subComponents/BillingCycleSwitch";
import StripeRedirectDialog from "../src/components/StripeRedirectDialog";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { Desktop, MobileOrTablet } from '../src/responsive';
import { applySession } from 'next-iron-session';
import database from '../src/service/database';
import { getStripe, plans } from '../src/utils/stripe';
import constants from "../src/utils/constants";
import config from '../config';

const styles = theme => ({
    root: {
        height: 'calc(100vh + 66px)'
    },
    spacer: theme.mixins.toolbar
});

// This is server side code, in here we can verify user session and fetch any data we need before page load. 
// This route is protected so that if uid doesn't exist we redirect to /login
export const getServerSideProps = async (ctx) => {
    try {
        await applySession(ctx.req, ctx.res, constants.SESSION_OPTIONS);
        const uid = ctx.req.session.get('uid');

        if (!uid) {
            ctx.res.statusCode = 302
            ctx.res.setHeader('Location', `/login`);
            return {
                props: {}
            }
        }

        const user = await database.loadUser(uid);
        if (user && user.plan && user.plan.accessLevel > 0) {
            ctx.res.statusCode = 302
            ctx.res.setHeader('Location', `/dashboard`);
            return { props: {} };
        }

        return {
            props: {
                uid, //req.session.get('uid'),
            }
        }
    } catch (e) {
        console.log("[getServerSideProps] /plans.js ", e)
        ctx.res.statusCode = 302
        ctx.res.setHeader('Location', `/login`);
        return { props: {} };
    }
}

class ChoosePlan extends React.Component {
    constructor(props) {
        super(props);

        this.stripePromise = getStripe();

        this.state = {
            loading: false,
            newYearsDiscount: false,
            pricingRoute: true,
            showDialog: false,
            billingCycle: 'yearly'
        };
    }

    /**
     * Redirect to Stripe checkout when a user
     * selects a plan.
     */
    handleGetStarted = async (plan) => {
        const { uid } = this.props;

        // pass a falsey value here for a free plan
        if (plan) {
            this.setState(
                {
                    showDialog: true,
                },
                async () => {
                    try {
                        const stripe = await this.stripePromise;
                        const response = await axios.post('/api/payments/create-checkout', {
                            plan_id: plan.id,
                            uid
                        });
                        const result = await stripe.redirectToCheckout({
                            sessionId: response.data.id,
                        });
                        if (result.error) {
                            console.error(result.error);
                            window.location.href = "/checkout/failed";
                        }
                    } catch (error) {
                        console.error(error);
                        window.location.href = "/checkout/failed";
                    }
                }
            );
        } else {
            window.location.href = "/dashboard"
        }
    };

    handleChange = () => {
        let newBillingCycle = '';
        if (this.state.billingCycle === "yearly") {
            newBillingCycle = "monthly"
        } else if (this.state.billingCycle === "monthly") {
            newBillingCycle = "yearly"
        }

        this.setState({
            billingCycle: newBillingCycle
        });
    }

    render() {
        const { classes, uid } = this.props;

        return (
            <div className={classes.root}>
                <Nav dark={true} uid={uid} />
                <Container maxWidth="sm" style={{ height: "100%" }}>
                    <Grid container style={{ paddingTop: "20%" }}>
                        <Paper elevation={0}>
                            <Grid container justifyContent="center" style={{ marginTop: 20 }}>
                                <Grid item xs={12}>
                                    <Typography style={{ paddingBottom: 20, textAlign: "center" }} variant="h4">
                                        Choose Your Plan
                                    </Typography>
                                    <Typography style={{ paddingBottom: 20, textAlign: "center" }} variant="body1">
                                        We&apos;re offering a <b style={{ color: this.props.theme.palette.secondary.main }}>Launch</b> discount for the two weeks after launch. Sign up for a paid account and lock in that monthly price <b>forever</b>.
                                    </Typography>
                                </Grid>
                                {plans.map((dataFn, index) => {
                                    const data = dataFn(this.state.billingCycle);
                                    return <Grid container key={index} alignItems="center" alignContent="center">
                                        <Grid item xs={12}>
                                            <Grid
                                                alignItems="center"
                                                container
                                                justifyContent="space-between"
                                                style={{
                                                    paddingTop: 20,
                                                    paddingBottom: 20,
                                                }}
                                            >
                                                <Grid item sm={8} style={{ paddingLeft: 10 }} xs={12}>
                                                    <Typography
                                                        style={{ textAlign: "left" }}
                                                        display="inline"
                                                        // style={{ paddingLeft: 8 }}
                                                        variant="h6"
                                                        paragraph
                                                    >
                                                        {`${data.name}: `}
                                                    </Typography>
                                                    <Typography
                                                        display="inline"
                                                        style={{
                                                            textDecoration: data.discountedPrice
                                                                ? "line-through"
                                                                : "none", 
                                                                textAlign: "left"
                                                        }}
                                                        paragraph
                                                        variant="h6"
                                                    >
                                                        {data.price}
                                                    </Typography>
                                                    {data.discountedPrice ? (
                                                        <Typography
                                                            style={{ textAlign: "left" }}
                                                            display="inline"
                                                            variant="h6"
                                                            paragraph
                                                        >
                                                            {data.discountedPrice}
                                                        </Typography>
                                                    ) : (
                                                        <div></div>
                                                    )}
                                                </Grid>
                                                <Grid item sm={4} style={{ paddingRight: 10 }} xs={12}>
                                                    <Desktop>
                                                        <Grid container justifyContent="flex-end">
                                                            <Button
                                                                style={{ color: config.PALETTE.BACKGROUND_SECONDARY }}
                                                                onClick={() =>
                                                                    this.handleGetStarted(data)
                                                                }
                                                                variant="contained"
                                                            >
                                                                Choose Plan
                                                            </Button>
                                                            <Typography variant="body2" style={{ color: "#716565" }}>
                                                                {data.detailText && `(${data.detailText})`}
                                                            </Typography>
                                                        </Grid>
                                                    </Desktop>
                                                </Grid>
                                                {/* && <Grid item xs={12} style={{ paddingRight: 10, textAlign:"right" }}>
                                                    
                                                </Grid>} */}
                                                {data.features.map((feature, idx) => (
                                                    <Grid key={idx} item style={{ paddingLeft: 10, fontWeight: 200 }} xs={12}>
                                                        {feature}
                                                    </Grid>
                                                ))}
                                                <Grid item sm={4} style={{ paddingTop: 20 }} xs={12}>
                                                    <MobileOrTablet>
                                                        <Grid container alignItems="center" flexDirection="column">
                                                            <Button
                                                                style={{ color: config.PALETTE.BACKGROUND_SECONDARY }}
                                                                onClick={() =>
                                                                    this.handleGetStarted(data)
                                                                }
                                                                variant="contained"
                                                            >
                                                                Choose Plan
                                                            </Button>
                                                            {data.detailText && <Typography variant="body2" style={{ color: "#716565" }}>
                                                                ({data.detailText})
                                                            </Typography>}
                                                        </Grid>
                                                    </MobileOrTablet>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                    </Grid>
                                })}
                                <Grid item xs={12} style={{ textAlign: "center" }}>
                                    <BillingCycleSwitch checked={this.state.billingCycle === "yearly"} onChange={this.handleChange} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <div>
                        <StripeRedirectDialog open={this.state.showDialog} />
                    </div>
                </Container>
            </div >
        );
    }
}

// @ts-ignore
export default withTheme(withStyles(styles)(ChoosePlan));

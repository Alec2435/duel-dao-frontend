import  { Component } from 'react';
import {
    withStyles
} from '@material-ui/core/styles';
import { Grid, Typography, Container, Button, Link } from '@material-ui/core';
import Nav from '../../src/components/Nav';
import Footer from '../../src/components/Footer';
import { applySession } from 'next-iron-session';

import database from '../../src/service/database';
import constants from '../../src/utils/constants';
import config from '../../config';

const styles = () => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    }
});

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

        if (!user.plan?.accessLevel || user.plan.accessLevel === 0) {
            ctx.res.statusCode = 302
            ctx.res.setHeader('Location', `/plans`);
            return {
                props: {}
            }
        }
        console.log({ user })
        return {
            props: {
                uid,
                user
            }
        }
    } catch (e) {
        console.log(e)
        ctx.res.statusCode = 302
        ctx.res.setHeader('Location', `/plans`);
        return {
            props: {}
        }
    }
}

class CheckoutSuccess extends Component {
    render() {
        console.log(this.props);
        const { classes, user } = this.props;

        return (
            <div className={classes.root}>
                <Nav />
                <Container maxWidth="sm">
                    <Grid container spacing={3} style={{ marginTop: 175 }}>
                        <Grid item xs={12}>
                            <Typography variant="h5" paragraph>
                                Thank you for your purchase!
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {user.plan?.accessLevel > 1 ? "You are now a Pave.so member" : "You now have access to the Pave.so template"}. Everything is ready for you on your dashboard
                            </Typography>
                            {user.plan?.accessLevel > 1 &&
                                <Typography variant="body1" paragraph>
                                    If you did not mean to make this change, no worries! You can <Link href="/cancel">Cancel</Link> anytime.
                            </Typography>
                            }

                        </Grid>
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <Button style={{ borderRadius: 50, color: config.PALETTE.BACKGROUND_SECONDARY }} variant="contained" component="a" href="/dashboard">Go to dashboard</Button>
                        </Grid>
                    </Grid>
                </Container>
                <Footer />
            </div>
        );
    }
}

// @ts-ignore
export default withStyles(styles)(CheckoutSuccess);
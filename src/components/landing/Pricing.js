import { useState } from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import { Grid, Typography, Container } from '@material-ui/core';
import SectionHeader from '../SectionHeader';
import BillingCycleSwitch from '../subComponents/BillingCycleSwitch';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import config from '../../../config';

const useStyles = makeStyles({
    root: {
        background: config.PALETTE.BACKGROUND_SECONDARY,
        padding: 'calc(7vw + 100px) 0',
    },
    spacer: {
        paddingTop: 100
    },
    pricingCard: {
        backgroundColor: config.PALETTE.BACKGROUND_PRIMARY,
        // border: '1px solid ' + config.PALETTE.COLOR_PRIMARY,
        borderRadius: 30,
        padding: 20
    },
    pricingCardInverted: {
        backgroundColor: config.PALETTE.COLOR_PRIMARY,
        border: '1px solid ' + config.PALETTE.BACKGROUND_PRIMARY,
        borderRadius: 30,
        padding: 20
    },
    pricingCardContainer: {
    },
    pricingButton: {
        borderRadius: 10,
        marginTop: 16
    },
    pricingItem: {
        color: config.PALETTE.TEXT_PRIMARY,
        fontWeight: 200
    },
    pricingItemInverted: {
        color: config.PALETTE.TEXT_SECONDARY,
        fontWeight: 200
    },
    text: {
        color: config.PALETTE.TEXT_PRIMARY
    },
    negative: {
        color: config.PALETTE.BACKGROUND_PRIMARY
    }
});

const Pricing = () => {

    const [payYearly, setPayYearly] = useState(true);

    const handleChange = () => {
        setPayYearly(!payYearly);
    }

    const classes = useStyles();

    return <div className={classes.root}>
        <div className={classes.spacer} />
        <SectionHeader primaryText="Maximize your output" />
        <div className={classes.spacer} />
        <Container maxWidth="md">
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <BillingCycleSwitch checked={payYearly} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6} className={classes.pricingCardContainer}>
                    <div>
                        <Grid container className={classes.pricingCard} justifyContent="center" alignItems="center" direction="column">
                            <Typography variant="body1" paragraph className={classes.text} style={{ color: config.PALETTE.TEXT_PRIMARY, textAlign: "center" }}>BUY NOW</Typography>
                            <Grid item xs={12} style={{ padding: 16, paddingTop: 20, textAlign: "left" }}>
                                <Typography variant="h3" paragraph className={classes.text} style={{ textAlign: "center" }}>$60</Typography>
                                <Typography variant="body1" style={{ textAlign: "center" }} paragraph>
                                    Best if you need to get off the ground quickly with the full landing page template
                                </Typography>

                                <Typography className={classes.pricingItem} paragraph variant="h6"><CheckCircleIcon color="inherit" fontSize="small" style={{ marginRight: 16, transform: 'translateY(2px)' }} />Full landing page template</Typography>
                                <Typography className={classes.pricingItem} paragraph variant="h6"><CheckCircleIcon color="inherit" fontSize="small" style={{ marginRight: 16, transform: 'translateY(2px)' }} />Pave.so documentation</Typography>
                                <Typography className={classes.pricingItem} paragraph variant="h6"><CheckCircleIcon color="inherit" fontSize="small" style={{ marginRight: 16, transform: 'translateY(2px)' }} />Access to builder discord</Typography>
                                {/* <Button variant="contained" className={classes.pricingButton} fullWidth component="a" href="/signup" style={{color: config.PALETTE.BACKGROUND_SECONDARY}}>Get started</Button> */}

                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} className={classes.pricingCardContainer}>
                    <div>
                        <Grid container className={classes.pricingCardInverted} justifyContent="center" alignItems="center" direction="column">
                            <Typography variant="body1" paragraph style={{ textAlign: "center" }} className={classes.negative}>BECOME A MEMBER</Typography>

                            <Grid item xs={12} style={{ padding: 16, paddingTop: 20 }}>
                                <Typography variant="h3" paragraph style={{ color: config.PALETTE.BACKGROUND_SECONDARY, textAlign: 'center' }}>
                                    {payYearly ?
                                        "$100/yr"
                                        :
                                        "$40 + $20/mo"
                                    }
                                </Typography>
                                <Typography variant="body1" className={classes.negative} style={{ textAlign: "center" }} paragraph>
                                    Best if you build many projects and want to benefit from the updates we roll out in the future
                                </Typography>
                                <Typography className={classes.pricingItemInverted} paragraph variant="h6"><CheckCircleIcon fontSize="small" color="secondary" style={{ color: config.PALETTE.TEXT_SECONDARY, marginRight: 16, transform: 'translateY(2px)' }} />Website template + </Typography>
                                <Typography className={classes.pricingItemInverted} paragraph variant="h6"><CheckCircleIcon fontSize="small" color="secondary" style={{ color: config.PALETTE.TEXT_SECONDARY, marginRight: 16, transform: 'translateY(2px)' }} />Project creation crawler</Typography>
                                <Typography className={classes.pricingItemInverted} paragraph variant="h6"><CheckCircleIcon fontSize="small" color="secondary" style={{ color: config.PALETTE.TEXT_SECONDARY, marginRight: 16, transform: 'translateY(2px)' }} />Full-time support</Typography>
                                <Typography className={classes.pricingItemInverted} paragraph variant="h6"><CheckCircleIcon fontSize="small" color="secondary" style={{ color: config.PALETTE.TEXT_SECONDARY, marginRight: 16, transform: 'translateY(2px)' }} />Free SaaS-critical components</Typography>
                                <Typography className={classes.pricingItemInverted} paragraph variant="h6"><CheckCircleIcon fontSize="small" color="secondary" style={{ color: config.PALETTE.TEXT_SECONDARY, marginRight: 16, transform: 'translateY(2px)' }} />Builder newsletter</Typography>

                                {/* <Button variant="contained" className={classes.pricingButton} fullWidth component="a" href="/signup" style={{backgroundColor: config.PALETTE.BACKGROUND_PRIMARY}}>Get started</Button> */}

                            </Grid>

                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </Container>
        <div className={classes.spacer} />

    </div>
}

export default Pricing
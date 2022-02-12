import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import { Grid, Typography, Container, Divider } from '@material-ui/core';
import Tilt from 'react-parallax-tilt';
import SectionHeader from '../SectionHeader';
import ScribbleMinimal from '../../img/scribbleMinimal.svg';
import WideScribble from '../../img/wideScribble.svg';
import config from '../../../config';

const useStyles = makeStyles({
    root: {
        padding: 'calc(7vw + 100px) 0',
        backgroundColor: config.PALETTE.BACKGROUND_SECONDARY,
    },
    tiltObject: {
        backgroundColor: config.PALETTE.BACKGROUND_PRIMARY,
        borderRadius: 20,
        boxShadow: '0 10px 20px rgb(0 0 0 / 5%)',
        padding: 30
    },
});

const values = {
    startWithNothing: [
        {
            name: "Create Github repo",
            value: 0.5
        },
        {
            name: "Create & link Vercel project",
            value: 0.5
        },
        {
            name: "Create & link Firebase project",
            value: 0.5
        },
        {
            name: "Create Twitter/Open Graph image & meta info",
            value: 3
        },
        {
            name: "Create privacy & terms",
            value: 3
        },
        {
            name: "Set up Firebase auth",
            value: 15
        },
        {
            name: "Integrate Stripe",
            value: 20
        },
        {
            name: "Build landing page",
            value: 30
        },
    ],
    useTemplate: [
        {
            name: "Download & start Pave crawler",
            value: 0.1
        },
        {
            name: "Deploy your page on Vercel",
            value: 0.0
        },
        {
            name: "Find appropriate images",
            value: 3
        },
        {
            name: "Edit meta information",
            value: 3
        },
        {
            name: "Edit privacy & terms",
            value: 0.1
        },
        {
            name: "Choose auth types to support",
            value: 0.1
        },
        {
            name: "Finish entering business info in Stripe",
            value: 0.5
        },
        {
            name: "Enter your own landing page copy",
            value: 2
        },
    ]
}

const PrimaryValue = () => {
    const classes = useStyles();

    return <div className={classes.root}>
        <Container maxWidth="lg">
            <SectionHeader primaryText="You Choose" secondaryText="You can save a ridiculous amount of time using Pave." bottomMargin='2vw'></SectionHeader>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={6}>
                    <Tilt>
                        <Grid container spacing={0} className={classes.tiltObject} alignContent="center" justifyContent="center" alignItems="center" style={{textAlign:"center"}}>
                            <Grid item xs={12}>
                                <ScribbleMinimal style={{ margin: 53 }} />
                            </Grid>
                            <Typography variant="h5" paragraph>
                                Start from scratch
                            </Typography>
                            {values.startWithNothing.map(value => {
                                return <React.Fragment key={value.name}>
                                    <Grid xs={8} style={{textAlign:"left"}}>
                                        <Typography variant="body1">{value.name}</Typography>
                                    </Grid>
                                    <Grid xs={4} style={{textAlign:"right"}}>
                                        <Typography variant="body1">{value.value} hours</Typography>
                                    </Grid>
                                </React.Fragment>
                            })}
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid xs={8} style={{textAlign:"left"}}>
                                <Typography variant="body1"><b>Total</b></Typography>
                            </Grid>
                            <Grid xs={4} style={{textAlign:"right"}}>
                                <Typography variant="body1"><b>{values.startWithNothing.reduce((agg, val) => (agg + val.value), 0).toFixed(2)} hours</b></Typography>
                            </Grid>
                        </Grid>
                    </Tilt>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Tilt>
                        <Grid container spacing={0} className={classes.tiltObject} alignContent="center" justifyContent="center" alignItems="center" style={{textAlign:"center"}}>
                            <Grid item xs={12}>
                                <WideScribble style={{ margin: 7, maxHeight: (53 * 2) + 40 - (7 * 2) }} />

                            </Grid>
                            <Typography variant="h5" paragraph>
                                Start with a fully functional template
                            </Typography>
                            {values.useTemplate.map(value => {
                                return <React.Fragment key={value.name}>
                                    <Grid xs={8} style={{textAlign:"left"}}>
                                        <Typography variant="body1">{value.name}</Typography>
                                    </Grid>
                                    <Grid xs={4} style={{textAlign:"right"}}>
                                        <Typography variant="body1">{value.value} hours</Typography>
                                    </Grid>
                                </React.Fragment>
                            })}
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid xs={8} style={{textAlign:"left"}}>
                                <Typography variant="body1"><b>Total</b></Typography>
                            </Grid>
                            <Grid xs={4} style={{textAlign:"right"}}>
                                <Typography variant="body1"><b>{values.useTemplate.reduce((agg, val) => (agg + val.value), 0).toFixed(2)} hours</b></Typography>
                            </Grid>
                        </Grid>
                    </Tilt>
                </Grid>
            </Grid>

        </Container>
    </div >
}

export default PrimaryValue
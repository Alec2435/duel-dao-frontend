import { Component } from 'react';
import {
    withStyles, withTheme
} from '@material-ui/core/styles';
import { Grid, Typography, Container, Button, Link } from '@material-ui/core';
import WaitlistField from '../subComponents/WaitlistField';
import Nav from '../Nav';
import config from '../../../config';
import { ArrowRight, ArrowRightAlt } from '@material-ui/icons';

const styles = theme => ({
    root: {
        background: config.PALETTE.BACKGROUND_PRIMARY,
        // background: 'linear-gradient(66deg, #C82090, #D060AB)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        [theme.breakpoints.down('sm')]: {
            height: 'auto'
        }
    },
    after: {
        position: 'absolute',
        left: 0,
        bottom: '-7vw',
        width: '100%',
        height: '7vw',
        background: config.PALETTE.BACKGROUND_PRIMARY,
        transform: 'skew(-86deg)',
        transformOrigin: 'top',
        // zIndex: '-1',
    },
    heroPrimary: {
        // color: theme.palette.secondary.light,
        fontFamily: 'Times New Roman',
        [theme.breakpoints.down('sm')]: {
            fontSize: 32
        }
    },
    heroSecondary: {
        fontFamily: 'sans-serif',
        fontWeight: 300,
        [theme.breakpoints.down('sm')]: {
            fontSize: 18
        }
    },
    heroText: {
        order: 0,
        paddingTop: 40,
        paddingBottom: 40,
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            order: 1
        }
    },
    blobHolder: {
        zIndex: 0,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '50%',
    },
    heroImage: {
        position: 'relative',
        order: 1,
        [theme.breakpoints.down('sm')]: {
            order: 0,
        },
    },
    cta: {
        marginTop: 16,
        width: 160,
        height: 50,
        color: "#F1EEEE",
        fontWeight: 100
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: "conic-gradient(from 180deg at 50% 50%, #2400FF 0deg, #0087FF 82.5deg, rgba(255, 29, 122, 0.760597) 148.93deg, #BBFF11 205.61deg, rgba(255, 83, 53, 0.600302) 267.32deg, #691EFF 360deg)",
        filter: 'blur(95px)'
    }
})

class Hero extends Component {

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root} >
                <Nav auth app />
                <Container maxWidth="md" style={{ height: '100%', zIndex: 1 }}>
                    <Grid container spacing={3} style={{ height: '100%', paddingTop: '7vw', paddingBottom: '2vw' }} justifyContent="center" alignItems="center" alignContent="center">
                        <Grid item xs={12} className={classes.heroText} style={{ zIndex: 8 }}>
                            <Typography variant="h4" className='main-text' paragraph>
                                Bettable DAO games on-chain
                            </Typography>
                            <Typography variant="body1" className='detail-text' paragraph>
                                It’s us vs them.
                            </Typography>
                            <Button onClick={() => window.location.href = "/signup"} variant="contained" className='action-button' >
                                Enter App
                            </Button>

                        </Grid>
                        <Grid item xs={12} className={classes.heroImage} style={{ textAlign: "center", position: 'relative', display: 'flex', justifyContent: 'center' }}>
                            <div className={classes.backdrop}></div>
                            <div style={{ width: '80%', height: 400, zIndex: 4, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flex: 1, borderRadius: 8, background: config.PALETTE.BACKGROUND_PRIMARY, boxShadow: '0 0 16px rgb(0 155 255 / 25%)' }}>placeholder</div>
                                <Link href="#">
                                    <div className='horiz' style={{ color: "#FFF", justifyContent: 'flex-end' }}>


                                        <Typography variant='body2' style={{ fontSize: 12, paddingTop: 2 }} ><i>check out the white paper</i></Typography>
                                        <ArrowRight fill={"#FFF"} style={{ marginLeft: 4, height: 16, width: 16 }} />
                                    </div>
                                </Link>
                            </div>
                            {/* <video src="/LaunchVideo.mp4" autoPlay muted controls loop style={{ maxWidth: '80%', objectFit: 'contain', boxShadow: '0 0 12px rgb(0 0 0 /20%)', borderRadius: 8 }} /> */}
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

// @ts-ignore
export default withTheme(withStyles(styles)(Hero));
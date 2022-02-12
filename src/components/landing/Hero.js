import { Component } from 'react';
import {
    withStyles, withTheme
} from '@material-ui/core/styles';
import { Grid, Typography, Container } from '@material-ui/core';
import WaitlistField from '../subComponents/WaitlistField';
import Nav from '../Nav';
import config from '../../../config';

const styles = theme => ({
    root: {
        background: config.PALETTE.BACKGROUND_PRIMARY,
        // background: 'linear-gradient(66deg, #C82090, #D060AB)',
        position: 'relative',
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
        textAlign: 'left',
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
    }
})

class Hero extends Component {

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Container maxWidth="lg" style={{ height: '100%', zIndex: -2 }}>
                    <Nav auth />
                    <Grid container spacing={3} style={{ height: '100%', paddingTop: '7vw', paddingBottom: '2vw' }} justifyContent="center" alignItems="center" alignContent="center">
                        <Grid item xs={12} sm={6} className={classes.heroText}>
                            <Typography variant="h2" className={classes.heroPrimary} paragraph>
                                Save time by automating the fundamentals so you can build what matters
                            </Typography>
                            <Typography variant="h6" className={classes.heroSecondary} paragraph>
                                Our scraper sets you up with every account you need to launch your startup, so you can focus on building.
                            </Typography>
                            {/* <Button onClick={() => window.location.href = "/signup"} variant="contained" className={classes.cta} >
                                <span style={{ fontWeight: 600 }}>Start building</span>
                            </Button> */}

                            {/* NOT LIVE YET (Collect emails with waitlist) */}
                            <WaitlistField />

                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.heroImage} style={{ textAlign: "center" }}>
                            <video src="/LaunchVideo.mp4" autoPlay muted controls loop style={{ maxWidth: '100%', objectFit: 'contain', boxShadow: '0 0 12px rgb(0 0 0 /20%)', borderRadius: 8, transform: 'rotate(2deg)' }} />
                            {/* <img src={"/assets/img/plane.png"} style={{ maxWidth: '80%', objectFit: 'cover', filter: 'invert', position: 'absolute' }} /> */}
                        </Grid>
                    </Grid>
                </Container>
                <div className={classes.after} />
            </div>
        );
    }
}

// @ts-ignore
export default withTheme(withStyles(styles)(Hero));
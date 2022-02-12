import  { Component } from 'react';
import {
    withStyles
} from '@material-ui/core/styles';
import { Grid, Typography, Container,  Link, Divider } from '@material-ui/core';
import Image from 'next/image';
import config from '../../config';

const styles = (theme) => ({
    root: {
        minHeight: 80,
        width: '100%',
        marginTop: 'auto',
        backgroundColor: config.PALETTE.BACKGROUND_PRIMARY,
        display: 'flex',
        flexDirection: 'column'
    },
    img: {
        maxWidth: 30,
        maxHeight: 30,
        marginRight: 8
    },
    leftMostText: {
        marginLeft: 'auto',
        marginRight: 16,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginRight: 200
        }
    },
    linkText: {
        marginRight: 16,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginRight: 200
        }
    }
})

class Footer extends Component {

    onClick = () => {
        window.location.href = "/";
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Divider variant="middle" style={{ background: config.PALETTE.BORDER_COLOR }}></Divider>
                <Container maxWidth="lg" style={{ display: 'flex', flexGrow: 1 }}>
                    <Grid container spacing={0} style={{ display: 'flex', flexGrow: 1 }} justifyContent="space-between" alignItems="center">
                        <Grid item xs={12} sm={4} md={3}>
                            <Grid container spacing={0} style={{ cursor: "pointer", display: 'flex', alignItems: 'center' }}>
                                <Image width={30} height={50} src={config.COMPANY_LOGO_URL} />
                                <Typography variant="h6" display="inline" style={{ fontWeight: 100, marginLeft: 8 }}>{config.DISPLAY_COMPANY_NAME}</Typography>
                            </Grid>
                        </Grid>

                        {/* <Typography className={classes.leftMostText} variant="body1"><Link style={{ display: 'block' }} href="/signup" >Sign up</Link></Typography>
                                    <Typography className={classes.linkText} variant="body1"><Link href="/login" >Log in</Link></Typography> */}
                        {config.SUPPORT_EMAIL && <Typography className={classes.leftMostText} variant="body1"><Link href={"mailto:" + config.SUPPORT_EMAIL} >Contact</Link></Typography>}
                        {config.TWITTER_URL && <Typography className={classes.linkText} variant="body1"><Link href={config.TWITTER_URL} >Twitter</Link></Typography>}
                        {config.BUY_ME_A_COFFEE_URL && <Typography className={classes.linkText} variant="body1"><Link href={config.BUY_ME_A_COFFEE_URL} >Buy me a ☕️</Link></Typography>}
                        <Typography className={classes.linkText} variant="body1"><Link href="/privacy" >Privacy</Link></Typography>
                        <Typography className={classes.linkText} variant="body1"><Link href="/terms" >Terms</Link></Typography>

                    </Grid>
                </Container>
            </div>
        );
    }
}

// @ts-ignore
export default withStyles(styles)(Footer);
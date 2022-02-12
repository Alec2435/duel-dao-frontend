
import {
    makeStyles
} from '@material-ui/core/styles';
import { Grid, Typography, Container } from '@material-ui/core';
import WebsiteTemplate from '../../img/websiteTemplate.svg';

import config from '../../../config';


const useStyles = makeStyles(theme => ({
    root: {
        background: config.PALETTE.BACKGROUND_PRIMARY,
        position: 'relative',
        padding: 'calc(7vw + 100px) 0',
        [theme.breakpoints.down('sm')]: {
            height: 'auto'
        }
    },
    before: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '7vw',
        background: config.PALETTE.BACKGROUND_SECONDARY,
        transform: 'skew(-86deg)',
        transformOrigin: 'top',
        // zIndex: '-1',
    },
    text: {
        order: 2,
        [theme.breakpoints.down('sm')]: {
            order: 2
        }
    },
    image: {
        order: 1,
        [theme.breakpoints.down('sm')]: {
            order: 1
        }
    },
    logo: {
        width: `calc(25% - ${24 * 3}px)`,
        marginRight: 24
    },
    spacer: {
        paddingTop: 100
    }
}));

const Feature2 = () => {
    const classes = useStyles();

    return <div className={classes.root}>
        <Container maxWidth="lg">
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6} className={classes.image} style={{textAlign:"center"}}>
                    <WebsiteTemplate style={{maxWidth: '80%'}}/>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.text}>
                    <Typography variant="h3" paragraph>Website Template</Typography>
                    <Typography variant="h6" paragraph style={{ fontWeight: 200 }}>Pave comes with a fully responsive landing page template (you&apos;re looking at it). </Typography>
                    <Typography variant="h6" paragraph style={{ fontWeight: 200 }}>The landing page is build with Next.js and has Firebase auth, Stripe checkout, and Vercel hosting integrated from the start.</Typography>
                    
                </Grid>
            </Grid>
        </Container>
    </div>
}

export default Feature2


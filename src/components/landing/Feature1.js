import {
    makeStyles
} from '@material-ui/core/styles';
import { Grid, Typography, Container } from '@material-ui/core';
import Stripe from '../../img/stripelogo.svg';
import Firebase from '../../img/firebaselogo.svg';
import Github from '../../img/githublogo.svg';
import Vercel from '../../img/vercellogo.svg';
import Scribble from '../../img/smallscribble1.svg';
import SectionHeader from '../SectionHeader';

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
        order: 1,
        [theme.breakpoints.down('sm')]: {
            order: 2
        }
    },
    image: {
        order: 2,
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

const Feature1 = () => {
    const classes = useStyles();

    return <div className={classes.root}>
        <div className={classes.before} />
        <div className={classes.spacer} />
        <SectionHeader primaryText="What do you get" />
        <div className={classes.spacer} />
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} className={classes.text}>
                    <Typography variant="h3" paragraph>Crawler</Typography>
                    <Typography variant="h6" paragraph style={{ fontWeight: 200 }}>The Pave crawler sets you up with all the accounts and credentials you need. When you launch it you can sit back and watch as it gets all your necessary API keys and populates them in the right places</Typography>
                    <div>
                        <Stripe className={classes.logo} style={{ transform: 'translateY(8px)' }} />
                        <Github className={classes.logo} />
                        <Vercel className={classes.logo} />
                        <Firebase className={classes.logo} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.image}>
                    <Scribble style={{ width: '60%' }} />
                </Grid>
            </Grid>
        </Container>
    </div>
}

export default Feature1



import {
    makeStyles
} from '@material-ui/core/styles';
import { Grid, Typography, Container } from '@material-ui/core';
import Flows from '../../img/flows.svg';
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
        width: `calc(25% - ${24*3}px)`,
        marginRight: 24
    },
    spacer: {
        paddingTop: 100
    }
}));

const Feature3 = () => {
    const classes = useStyles();

    return <div className={classes.root}>
        <Container maxWidth="lg">
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6} className={classes.text}>
                    <Typography variant="h3" paragraph>Ready to go Flows</Typography>
                    <Typography variant="h6" paragraph style={{fontWeight: 200}}>The website template already has a ton of application logic built in, such as sign up/sign in, one time payment &amp; subscription checkout flows, etc.</Typography>
                    <Typography variant="h6" paragraph style={{fontWeight: 200}}>We take care of a lot of the boilerplate that comes with starting a business, so you don&apos;t have to.</Typography>

                </Grid>
                <Grid item xs={12} sm={6} className={classes.image}>
                    <Flows />
                </Grid>
            </Grid>
        </Container>
        <div className={classes.after} />
    </div>
}

export default Feature3


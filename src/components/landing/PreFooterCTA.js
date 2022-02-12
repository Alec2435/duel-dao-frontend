
import {
    makeStyles
} from '@material-ui/core/styles';
import {  Typography, Container } from '@material-ui/core';
import WaitlistField from '../subComponents/WaitlistField';

import config from '../../../config';

const useStyles = makeStyles({
    root: {
        padding: 'calc(7vw + 150px) 0',
        backgroundColor: config.PALETTE.BACKGROUND_PRIMARY
    },
    primary: {
        fontFamily: 'Roboto Black'
    }
})

const Dashboard = () => {
    const classes = useStyles();

    return <div className={classes.root}>
        <Container maxWidth="sm" style={{textAlign:"center"}}>
            <Typography style={{textAlign:"center"}} data-aos="fade-up" variant="h3" paragraph className={classes.primary}>
                Ready to start building?
            </Typography>
            <Typography variant="body1" style={{textAlign:"center"}} paragraph data-aos="fade-up" >
                Pave.so isn&apos;t fully launched just yet, but if you&apos;d like to help us beta test, join our waitlist!
            </Typography>
            <WaitlistField />
        </Container>
    </div>
}

export default Dashboard
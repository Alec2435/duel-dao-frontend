import  { Component } from 'react';
import {
    withStyles
} from '@material-ui/core/styles';
import { Grid, Typography, Container, Button, Link} from '@material-ui/core';
import Nav from '../../src/components/Nav';
import Footer from '../../src/components/Footer';

import config from '../../config';

const styles = () => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    }
});

class CheckoutSuccess extends Component {
    render() {

        const { classes }= this.props;

        return (
            <div className={classes.root}>
                <Nav />
                <Container maxWidth="sm">
                    <Grid container spacing={3} style={{ marginTop: 175 }}>
                        <Grid item xs={12}>
                            <Typography variant="h5" paragraph>
                                Something went wrong
                            </Typography>
                            <Typography variant="body1" paragraph>
                                We were not able to complete the transaction <Link href="/upgrade">Click here</Link> to try again
                            </Typography>
                            <Typography variant="body1" paragraph>
                                If this problem persists, please <Link href={`mailto:${config.SUPPORT_EMAIL}?subject=Checkout%20Failure&body=Add%20any%20comments%20below%20this%20line%0D%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0D%0A`}>Reach out</Link> and we will look into it immediately.
                            </Typography>

                        </Grid>
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <Button style={{ borderRadius: 50 }} variant="contained" component="a" href="/plans">Back to plan selection</Button>
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
import  { Component } from 'react';
import {
    withStyles
} from '@material-ui/core/styles';
import { Grid, Typography, Container } from '@material-ui/core';


const styles = () => ({
    root: {
    },
    primary: {
        fontWeight: 800,
        fontFamily: 'Roboto Black'
    },
    secondary: {
        fontWeight: 300,
    }
})

class SectionHeader extends Component {
    render() {

        const { classes, primaryText, secondaryText, bottomMargin } = this.props;

        return (
            <div className={classes.root} style={{marginBottom: bottomMargin}}>
                <Container maxWidth="md">
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <Typography style={{textAlign:"center"}} data-aos="fade-up" variant="h3" paragraph className={classes.primary}>
                                {primaryText}
                            </Typography>
                            {secondaryText && <Typography style={{textAlign:"center"}} data-aos="fade-up" variant="h6" paragraph className={classes.secondary}>
                                {secondaryText}
                            </Typography>}
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

// @ts-ignore
export default withStyles(styles)(SectionHeader);
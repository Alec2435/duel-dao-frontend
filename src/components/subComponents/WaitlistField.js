import { Component } from 'react';
import {
    withStyles, withTheme
} from '@material-ui/core/styles';
import {
    Grid, Button, TextField, Typography
} from '@material-ui/core';
import axios from 'axios';
import config from '../../../config';

const styles = () => ({
    root: {
        background: 'transparent',
    },
    emailInput: {
        borderRadius: 50,
        height: 36,
    },
    outline: {
        border: '1px solid ' + config.PALETTE.BORDER_COLOR,
    },
    button: {
        borderRadius: '0 50px 50px 0',
        zIndex: 2,
        whiteSpace: 'nowrap',
        paddingLeft: 42, paddingRight: 42,
        boxShadow: '0px 0px 20px 7px rgba(0,0,0,0.1)'
    },
    adornedEnd: {
        paddingRight: 0
    },
})

class WaitlistField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            signedUp: false
        }
    }

    handleChange = (e) => {
        this.setState({
            email: e.currentTarget.value
        })
    }

    handleSubmit = async (e) => {
        if (!this.state.email) {
            return;
        }

        e.preventDefault();
        await axios.post('/api/waitlist/join', {
            email: this.state.email
        });

        this.setState({
            signedUp: true
        })
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root} data-aos="fade-up" >

                <Grid item xs={12} style={{ marginTop: 32 }}>
                    <Grid container spacing={1} alignItems="center" justifyContent="center" component="form" onSubmit={this.handleSubmit}>
                        {this.state.signedUp ?
                            <Grid item xs={12} style={{ textAlign: "center" }}>
                                <Typography variant="h6">
                                    Thanks for signing up, we&apos;ll send you an email with next steps!
                                </Typography>
                            </Grid>
                            :
                            <>
                                <Grid item xs={12} sm={10}>
                                    <TextField
                                        className={classes.emailInput}
                                        InputProps={{
                                            className: classes.emailInput,
                                            classes: {
                                                notchedOutline: classes.outline,
                                                adornedEnd: classes.adornedEnd
                                            },
                                            endAdornment: <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}>
                                                Join the waitlist
                                            </Button>
                                        }}
                                        value={this.state.email}
                                        id="email"
                                        fullWidth
                                        placeholder="your@email.com"
                                        required
                                        variant="outlined"
                                        size="small"
                                        onChange={this.handleChange.bind(this)} />
                                </Grid>
                            </>
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

// @ts-ignore
export default withTheme(withStyles(styles)(WaitlistField));
import React, { Component, useState } from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles({
    root: {
        padding: '64px 0',
        paddingTop: 0
    },
    subscribeTextField: {
        height: 50
    },
    subscribeButton: {
        height: 50,
        width: 74 + 32,
        transition: 'all 0.2s ease-out'
    }
})

const Subscribe = (props) => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const classes = useStyles();

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (subscribed) return;
        setSubscribed(true);

        await axios.post('/api/blog/subscribe', {
            email: email
        });
    }

    const { title } = props;

    return <div className={classes.root}>
        <Grid container justifyContent="center" spacing={2} component="form" onSubmit={handleSubscribe}>
            {title && <Grid item xs={12}>
                <Typography variant="h4" paragraph style={{ fontFamily: "Manrope", fontWeight: 700, textAlign: "center" }}>The Pave Blog</Typography>
            </Grid>}
            <Grid item xs={12}>
                <Typography variant="body1" style={{ color: "#25303F", textAlign: "center" }}  paragraph>An investment in knowledge pays the best interest. Subscribe today to stay in the loop on the fastest ways to build.</Typography>
            </Grid>
            <Grid item xs={9} sm={6}>
                <TextField
                    required
                    className={classes.subscribeTextField}
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    InputProps={{
                        className: classes.subscribeTextField
                    }}
                ></TextField>
            </Grid>
            <Grid item xs={3} sm={3}>
                <Button type="submit" variant="contained" color="primary" className={classes.subscribeButton} style={subscribed ? { backgroundColor: "#02a506" } : {}}>
                    {subscribed ? <CheckCircleOutlineIcon /> : "Subscribe"}</Button>
            </Grid>
        </Grid >
    </div>
}

export default Subscribe
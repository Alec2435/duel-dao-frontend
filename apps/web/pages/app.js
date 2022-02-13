import React, { Component } from 'react';
import {
    makeStyles
} from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import config from '../config';
import GameDisplay from '../src/components/app/GameDisplay';

const useStyles =  makeStyles({
    root: {
        background: config.PALETTE.BACKGROUND_PRIMARY,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }
})

const Dashboard = (props) => {
    const classes = useStyles();

    return <div className={classes.root}>
        This is app.js

        <GameDisplay />
    </div>
}

export default Dashboard
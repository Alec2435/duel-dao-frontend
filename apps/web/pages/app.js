import React, { Component } from 'react';
import {
    makeStyles
} from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import config from '../config';
import { useChessBoardState } from '../src/service/contract-interface';

const useStyles = makeStyles({
    root: {
        background: config.PALETTE.BACKGROUND_PRIMARY,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }
})

const Dashboard = (props) => {
    const classes = useStyles();
    // TODO: gameId
    const gameId = 1
    const [boardState, refreshBoardState] = useChessBoardState(gameId)

    return <div className={classes.root}>
        This is app.js
    </div>
}

export default Dashboard
import React, { Component, useState } from 'react';
import {
    makeStyles
} from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import config from '../config';
import { initGame, usePlayerGameIds } from '../src/service/contract-interface';
import { ConnectButton } from '../src/components/connect_button';
import { useWeb3Account } from '../src/service/web3-provider';
import { useRouter } from 'next/router'
import Link from 'next/link'

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
    const router = useRouter()

    // TODO: gameId
    const gameId = 1

    const { provider, connectAccount: onConnect, disconnectAccount: onDisconnect, address } = useWeb3Account()

    const [playerGameIds, refreshGameIds] = usePlayerGameIds()

    // TODO(jyen): signMessage
    async function signMessage() {
    }

    async function handleInitGame() {
        const initGameId = await initGame(provider, "Player 1")
        console.log("Game initted:", initGameId)
        refreshGameIds()
    }

    return (
        <div className={classes.root} style={{ color: "#FFFFFF" }}>
            <div>{address}</div>
            <ConnectButton title="Connect" onClick={onConnect} />
            <ConnectButton title="Disconnect" onClick={onDisconnect} />
            <button onClick={handleInitGame}>StartGame</button>
            <ul>
            {playerGameIds.map(id => (<li key={id}><Link href={`app/game/${id}`}>{id}</Link></li>))}
            </ul>
            This is app.js
        </div>
    )
}

export default Dashboard
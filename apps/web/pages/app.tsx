import React, { Component, useState } from 'react';
import {
    makeStyles
} from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import config from '../config';
import { useChessBoardState } from '../src/service/contract-interface';

import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import Web3Modal from "web3modal";
import { ConnectButton } from '../src/components/connect_button';

const INFURA_ID = "3c79214add5e49d9a15fd67ec5dba754";

const useStyles = makeStyles({
    root: {
        background: config.PALETTE.BACKGROUND_PRIMARY,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }
})

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: INFURA_ID
        }
    }
}

let web3Modal;
if (typeof window !== 'undefined') {
    web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
    });
}

const Dashboard = (props) => {
    const classes = useStyles();
    // TODO: gameId
    const gameId = 1
    const [boardState, refreshBoardState] = useChessBoardState(gameId)
    const [address, setAddress] = useState("");
    const [chainId, setChainId] = useState(0);
    const [provider, setProvider] = useState({});

    async function onConnect () {
        console.log("onConnect");

        if (!INFURA_ID) {
            throw new Error("Missing Infura ID");
        }

        const web3Provider = await web3Modal.connect();
        const provider = new providers.Web3Provider(web3Provider);
        setProvider(provider);

        const accounts = (await web3Provider.enable());
        setAddress(accounts[0]);
        setChainId(web3Provider.chainId);
    }

    async function onDisconnect () {
        console.log("onDisconnect");

        if (provider) {
            await web3Modal.clearCachedProvider();
        }
        setAddress("");
    }

    // TODO(jyen): signMessage
    async function signMessage() {
    }

    return (
        <div className={classes.root}>
            <div style={{ color: "#FFFFFF" }}>{address}</div>
            <ConnectButton title="Connect" onClick={onConnect} />
            <ConnectButton title="Disconnect" onClick={onDisconnect} />
            This is app.js
        </div>
    )
}

export default Dashboard
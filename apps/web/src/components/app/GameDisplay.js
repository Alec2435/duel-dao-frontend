import React, { Component } from 'react';
import {
    makeStyles
} from '@material-ui/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import { Chessboard } from "react-chessboard";
import { recoverPersonalSignature, web3 } from '../../utils/security';

const useStyles = makeStyles({
    root: {
    },
    gameDisplay: {
        display: 'flex',
        flexDirection: 'row',
    },
    infoBox: {
        width: '100%',
        height: '100%',
        border: '1px solid #212838',
        borderRadius: 8,
    },
    gameBoard: {
        textAlign: 'center'
    }
})

const GameDisplay = ({ address }) => {
    const classes = useStyles();

    async function triggerVote() {
        
        if (!web3) {
            return;
        }
        // test message
        const message = await axios.get(GENERATOR_URL_BASE + 'nonce/' + address).then(res => res.data.message);

        // encode message (hex)
        const hexMsg = convertUtf8ToHex(message ?? '');

        try {
            // open modal
            this.toggleModal();

            // toggle pending request indicator
            this.setState({
                pendingRequest: true,
                modalTitle: 'Pending signature request',
                modalContent: 'Please open your wallet and sign the message. This is for security purposes and does not cost you anything.'
            });

            // send message
            const result = await web3.eth.personal.sign(hexMsg, address);

            // trying out auth on server
            await axios.post(GENERATOR_URL_BASE + 'login', {
                address: address,
                signature: result,
            }).then(res => sessionStorage.setItem('token', res.data.token))
                .catch(err => console.error('error occurred while logging in.'));

            // verify signature
            const signer = recoverPersonalSignature(result, message);
            const verified = signer.toLowerCase() === address.toLowerCase();

            // format displayed result
            const formattedResult = {
                action: SIGN_AUTH,
                address,
                signer,
                verified,
                result
            };

            // display result
            this.setState({
                web3,
                pendingRequest: false,
                showModal: false,
                // result: formattedResult || null,
                currentStage: MintStage.PICK_TITLE
            });
        } catch (error) {
            console.error(error); // tslint:disable-line
            this.setState({ web3, pendingRequest: false, result: null });
        }

    }


    return <div className={classes.root}>
        <Container maxWidth='lg'>
            <Grid container spacing={0} alignItems="stretch" justifyContent="center" style={{ marginTop: 120 }}>
                <Grid item xs={3}>
                    <div className={classes.infoBox}>

                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.gameBoard}>
                        <Chessboard boardWidth={450} customBoardStyle={{ border: '1px solid #006DBD', boxSizing: 'border-box', borderRadius: 8, overflow: 'hidden', margin: '0 auto' }} customDarkSquareStyle={{ backgroundColor: '#006DBD00' }} customLightSquareStyle={{ backgroundColor: "#006DBD" }} />
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.infoBox}>

                    </div>
                </Grid>
            </Grid>
        </Container>
    </div>
}

export default GameDisplay    

function convertUtf8ToHex(arg0) {
    throw new Error('Function not implemented.');
}

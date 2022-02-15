import React from "react";
import {
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@material-ui/core";
import axios from "axios";
import config from "../config";
import { initGame, usePlayerGameIds } from "../src/service/contract-interface";
import { ConnectButton } from "../src/components/connect_button";
import { useWeb3Account } from "../src/service/web3-provider";
import { useRouter } from "next/router";
import Link from "next/link";
import Root from "../src/components/Root";
import AppFrame from "../src/components/app/AppFrame";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import theme from "../src/theme";

const Dashboard = (props) => {
    const {
        provider,
        connectAccount: onConnect,
        disconnectAccount: onDisconnect,
        address,
    } = useWeb3Account();

    const [playerGameIds, refreshGameIds] = usePlayerGameIds();

    // TODO(jyen): signMessage
    async function signMessage() {}

    async function handleInitGame() {
        await initGame(provider, "Player 1");
        refreshGameIds();
    }

    return (
        <AppFrame>
            <List>
                {playerGameIds.map((id) => (
                    <ListItem disablePadding key={id}>
                        <Link href={`app/game/${id}`} passHref>
                            <ListItemButton LinkComponent="a">
                                {/* <ListItemIcon></ListItemIcon> */}
                                {/* <ListItemText
                                    primary={id}
                                    style={{ "& MuiTypography-root": { fontFamily: "monospace"} }}
                                /> */}
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography
                                            style={{ fontFamily: "monospace" }}
                                        >
                                            {id}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
                {!address ? null : (
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleInitGame}>
                            <ListItemIcon>
                                <AddCircleIcon
                                    htmlColor={theme.palette.text.primary}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary="Start Game"
                                style={{
                                    fontFamily:
                                        theme.typography.body1.fontFamily,
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </AppFrame>
    );
};

export default Dashboard;

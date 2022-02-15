import { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, AppBar, Toolbar, Button } from "@material-ui/core";
import Image from "next/image";

import config from "../../../config";
import Link from "next/link";
import { AuthButton } from "./AuthButton";

const useStyles = makeStyles({
    root: {
        zIndex: 99,
    },
});

interface AppNavProps {
    loggedIn?: boolean;
}

export default function AppNav({ loggedIn }: AppNavProps) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar color="transparent" elevation={0} position="static">
                <Toolbar style={{ paddingTop: 16, width: "100%" }}>
                    <Grid container alignItems="center">
                        <Link href={loggedIn ? "/app" : "/"}>
                            <div
                                style={{
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {/* <Image width={40} height={40} src={config.COMPANY_LOGO_URL} /> */}
                                <Typography
                                    variant="h6"
                                    display="inline"
                                    className="main-text"
                                    style={{ color: "#FFF" }}
                                >
                                    ⚔️ {config.DISPLAY_COMPANY_NAME}
                                </Typography>
                            </div>
                        </Link>
                        <div style={{ flexGrow: 1 }}></div>
                        <AuthButton />
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

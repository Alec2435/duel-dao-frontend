import { Component } from 'react';
import axios from "axios";
import {
    withStyles
} from '@material-ui/core/styles';
import { Grid, Typography, AppBar, Toolbar, Button } from '@material-ui/core';
import Image from 'next/image';

import config from '../../config';

const styles = () => ({
    root: {
        zIndex: 99
    }
});

class Nav extends Component {
    handleSignOut = async () => {
        try {
            const response = await axios.post('/api/auth/signout');
            console.log("Sign out response: ", response);
            window.location.href = "/login";
        } catch (error) {
            console.log("[handleSignOut] Error ", error);
        }
    }

    render() {
        const { classes, uid } = this.props;
        return (
            <div className={classes.root}>
                <AppBar color="transparent" elevation={0} position="static">
                    <Toolbar style={{ paddingTop: 30, width: "100%" }} >
                        <Grid container alignItems="center">
                            <div style={{ cursor: "pointer", display: 'flex', alignItems: 'center' }} onClick={() => window.location.href = `${uid ? "/dashboard" : "/"}`}>
                                <Image width={50} height={50} src={config.COMPANY_LOGO_URL} />
                                <Typography variant="h6" display="inline" style={{ fontWeight: 100, marginLeft: 8 }}>{config.DISPLAY_COMPANY_NAME}</Typography>
                            </div>
                            <Button style={{ marginLeft: 'auto' }} component="a" href="/blog">
                                Blog
                            </Button>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

// @ts-ignore
export default withStyles(styles)(Nav);
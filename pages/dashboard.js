import { Component } from 'react';
import {
    withStyles
} from '@material-ui/core/styles';
import { Grid, Typography, Container} from '@material-ui/core';
import Nav from '../src/components/Nav';
import { applySession } from 'next-iron-session';
import constants from '../src/utils/constants';
import CopyToClipboardText from '../src/components/subComponents/CopyToClipboardText';
import config from '../config';
import axios from 'axios';
import database from '../src/service/database';

const styles = theme => ({
    root: {
        backgroundColor: config.PALETTE.BACKGROUND_PRIMARY,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    paper: {
        borderRadius: 20,
        border: "1px solid rgba(255, 55,55, 0.6)",
        backgroundColor: "rgba(255, 40,0, 0.1)"
    },
    template: {
        border: "1px solid #EEEEF1",
        padding: theme.spacing(2, 4),
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '&:hover': {
            border: "1px solid #DDDDE1",
            boxShadow: 'rgba(0, 0, 0, 0.1) 1px 1px 1px'
        }
    },
    tokenHolder: {
        backgroundColor: config.PALETTE.BACKGROUND_SECONDARY,
        borderRadius: 8,
        border: `2px solid ${config.PALETTE.BORDER_COLOR}`
    }
})

export const getServerSideProps = async (ctx) => {
    try {
        await applySession(ctx.req, ctx.res, constants.SESSION_OPTIONS);
        const uid = ctx.req.session.get('uid');
        if (!uid) {
            ctx.res.statusCode = 302
            ctx.res.setHeader('Location', `/login`);
            return {
                props: {}
            }
        }

        const user = await database.loadUser(uid);

        if (!user) {
            ctx.res.statusCode = 302
            ctx.res.setHeader('Location', `/login`);
            return {
                props: {}
            }
        }

        return {
            props: {
                uid,
                user
            }
        }
    } catch (e) {
        console.log(e)
        return { props: {} };
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        // console.log({ templates: props.templates });
        this.state = {
            alerts: {},
            creating: false,
            // loading: true,
            secretKey: "",
            showSecretKey: false,
            testKey: ""
        }
    }


    newProject = async () => {
        this.setState({
            creating: true
        })

        const response = await axios.post('/api/proxy/templates/save', {
            uid: this.props.uid,
            html: '',
            rawText: '',
            templateName: '',
            emailSubject: '',
            emailPreview: '',
        });

        window.location.href = `/dashboard/${response.data.tid}/edit`;

        this.setState({
            creating: false
        })
    }

    createTemplateBox = (classes, action, innerHtml) => {
        if (typeof action === "string") {
            return <a style={{ cursor: 'pointer' }} href={action} className={classes.template} >
                {innerHtml}
            </a>
        } else {
            return <a style={{ cursor: 'pointer' }} onClick={action} className={classes.template} >
                {innerHtml}
            </a>
        }

    }

    render() {
        const { classes,  uid, user } = this.props;

        return (
            <div className={classes.root}>
                <Nav dark={true} uid={uid} />
                <Container maxWidth="md">
                    <Grid container spacing={3} style={{ marginTop: 25 }}>
                        <Grid item xs={12}>
                            <Typography variant="body1">YOUR AUTHTOKEN</Typography>
                            <div className={classes.tokenHolder}>
                                <CopyToClipboardText value={user.authToken} variant="h6" textStyle={{ fontWeight: 100, padding: 8, cursor: 'pointer', fontFamily: 'monospace' }} />
                            </div>
                            <Typography variant="body2" style={{textAlign:"right"}}>click to copy to keyboard</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

// @ts-ignore
export default withStyles(styles)(Dashboard);
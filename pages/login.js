import { useState } from 'react';
import {
    makeStyles,
} from '@material-ui/core/styles';

import 'firebase/auth';
import { signInWithEmailAndPassword, googleAuth } from '../src/service/auth';
import { Grid, Typography, Container, Button, Link, TextField, CircularProgress, FormHelperText } from '@material-ui/core';
import Nav from '../src/components/Nav';
import GoogleButton from 'react-google-button';
import config from '../config';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh'
    },
    fullHeight: {
        minHeight: '100%'
    },
    pillow: {
        marginTop: theme.spacing(5),
        borderRadius: 15,
        border: '1px solid ' + config.PALETTE.BORDER,
        backgroundColor: config.PALETTE.FOREGROUND_BACKGROUND_SECONDARY,
    },
    spacer: theme.mixins.toolbar,
    notchedOutline: {
        border: '1px solid ' + config.PALETTE.BORDER,
        borderRadius: 10
    },
    inputHolder: {
        height: 50,
        borderRadius: 8
    },
    inputOverride: {
        height: 17
    }
}));

const Login = () => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [authErrors, setAuthErrors] = useState({
        emailpass: "",
        google: "",
        password: "",
        email: ""
    });

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        const {
            emailError,
            errorMessage,
            passwordError,
            success,
        } = await signInWithEmailAndPassword(email, password);
        if (!success) {
            const newErrors = {}
            if (emailError) {
                newErrors.email = errorMessage;
            } else if (passwordError) {
                newErrors.password = errorMessage;
            } else if (errorMessage) {
                newErrors.emailpass = errorMessage;
            }
            // @ts-ignore
            setAuthErrors(newErrors);
            setLoading(false);
        } else {
            console.log("successful log in");
            window.location.href = "/dashboard";
        }
    }

    const handleSignInWithGoogle = async () => {
        const {
            errorMessage,
            success,
        } = await googleAuth("signup", setLoading);
        /* Got a successful sign up */
        if (success) {
            console.log("Successful sign up");
            window.location.href = "/plans";
        } else {
            // @ts-ignore
            setAuthErrors({ google: errorMessage });
            setLoading(false);
        }
    };


    return <div className={classes.root}>
        <Nav center mono />
        <div className={classes.spacer} />
        <Container className={classes.fullHeight} maxWidth="sm">
            <Grid container spacing={2} className={classes.pillow} justifyContent="center" alignItems="center" style={{ textAlign: "center" }} component="form" onSubmit={handleEmailSignIn}>
                <Grid item xs={12} style={{ paddingTop: 30, paddingBottom: 30 }}>
                    <Typography variant="body1" style={{ color: config.PALETTE.GRAY_TEXT_COLOR, textAlign: "center" }}>
                        WELCOME BACK
                    </Typography>
                    <Typography variant="h6" style={{ textAlign: "center" }}>
                        Log in to your account
                    </Typography>
                </Grid>
                <Grid item xs={11} style={{ textAlign: "left" }}>
                    <Typography variant="body1">Email address</Typography>
                    <TextField
                        id="email"
                        test-id="email"
                        variant="outlined"
                        required
                        fullWidth
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        style={{ height: 50 }}
                        InputProps={{
                            className: classes.inputHolder,
                            classes: {
                                notchedOutline: classes.notchedOutline,
                                input: classes.inputOverride
                            }
                        }} />
                    {authErrors.email &&
                        <FormHelperText error={true}>
                            {authErrors.email}
                        </FormHelperText>
                    }

                </Grid>
                <Grid item xs={11} style={{ textAlign: "left" }}>
                    <Typography variant="body1">Password</Typography>
                    <TextField
                        id="password"
                        test-id="password"
                        variant="outlined"
                        type="password"
                        required
                        fullWidth
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.currentTarget.value)}
                        style={{ height: 50 }}
                        InputProps={{
                            className: classes.inputHolder,
                            classes: {
                                notchedOutline: classes.notchedOutline,
                                input: classes.inputOverride
                            }
                        }} />
                    {authErrors.password &&
                        <FormHelperText error={true}>
                            {authErrors.password}
                        </FormHelperText>
                    }
                </Grid>
                <Grid item xs={11} style={{ textAlign: "left" }}>
                    {authErrors.emailpass &&
                        <FormHelperText error={true}>
                            {authErrors.emailpass}
                        </FormHelperText>
                    }
                    <Button test-id="login" type="submit" variant="contained" size="large" color="primary" style={{ textTransform: 'none', marginTop: 16, borderRadius: 10, height: 50, color: "#EEEEF1" }} fullWidth>
                        {loading ? <CircularProgress size={30} style={{ color: config.PALETTE.BACKGROUND_SECONDARY }} /> : "Login now"}
                    </Button>
                    <Typography variant="body2">Don&apos;t have an account? <Link href="/signup">Create one <ArrowForwardIcon fontSize="small" style={{ transform: 'translateY(6px)' }} /></Link></Typography>
                </Grid>
                <Grid item xs={11} style={{ marginBottom: 0, textAlign: "center" }}>
                    <Typography variant="body2">or</Typography>
                </Grid>
                <Grid item xs={11} style={{ marginBottom: 32 }}>
                    <GoogleButton type="light" style={{ width: '100%', borderRadius: 10, overflow: 'hidden', paddingRight: 40 }} onClick={handleSignInWithGoogle} />
                    {authErrors.google &&
                        <FormHelperText error={true}>
                            {authErrors.google}
                        </FormHelperText>
                    }
                </Grid>
            </Grid>
        </Container>
    </div >
}

export default Login;
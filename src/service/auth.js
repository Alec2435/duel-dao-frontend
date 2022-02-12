import axios from "axios";
import config from "../../config";
import { fbParent, firebase } from "./firebase";

const EMAIL_ERRORS = [
    "auth/invalid-email",
    "auth/user-disabled",
    "auth/user-not-found",
    "auth/email-already-in-use",
    "auth/argument-error",
];
const PASSWORD_ERRORS = ["auth/wrong-password", "auth/weak-password"];

export const createUserWithEmailAndPassword = async ({
    email,
    firstName,
    lastName,
    password,
}) => {
    try {
        /* Create user */
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const idToken = await firebase.auth().currentUser.getIdToken(true);
        const uid = firebase.auth().currentUser.uid;
        const response = await axios.post('/api/auth/login', {
            uid,
            email,
            firstName,
            idToken,
            isSignUp: true,
            lastName,
        });
        return {
            ...response.data
        };
    } catch (error) {
        console.log("Error creating user: ", error);
        return {
            emailError: EMAIL_ERRORS.includes(error.code),
            errorMessage: error.response?.data?.message || getErrorMessage(error.code),
            passwordError: PASSWORD_ERRORS.includes(error.code),
        };
    }
};

export const googleAuth = async (type, setLoading) => {
    try {
        const provider = new fbParent.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        const userExists = !result.additionalUserInfo.isNewUser;
        const { email, displayName, uid } = result.user;

        setLoading(true);
        /* Check if user already exists */
        const name = displayName ? displayName.split(" ") : ["", ""];
        const idToken = await firebase.auth().currentUser.getIdToken(true);
        const response = await axios.post('/api/auth/login', {
            email,
            uid,
            firstName: name[0],
            idToken,
            isSignUp: !userExists,
            lastName: name[1],
        });
        return {
            ...response.data
        };
    } catch (error) {
        console.log("[signInWithGoogle] Error signing in with Google: ", error);
        return {
            errorMessage: error.response?.data?.message || error.message,
            googleError: true,
        }
    }
}

export const signInWithEmailAndPassword = async (email, password) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        const idToken = await firebase.auth().currentUser.getIdToken(true);
        const response = await axios.post('/api/auth/login', {
            idToken,
        });
        return {
            ...response.data
        };
    } catch (error) {
        console.log("[signInWithEmailAndPassword] error: ", error);
        const errorCode = error.code;
        return {
            emailError: EMAIL_ERRORS.includes(errorCode),
            errorMessage: getErrorMessage(errorCode),
            passwordError: PASSWORD_ERRORS.includes(errorCode),
        };
    }
};

export const resetPassword = async (email, updateUI) => {
    try {
        await firebase.auth().sendPasswordResetEmail(email);
        updateUI({ success: true });
        console.log("successfully sent reset email");
    } catch (error) {
        console.log("error: ", error);
        updateUI({ error: getErrorMessage(error.code) });
    }
};

const getErrorMessage = (errorCode) => {
    switch (errorCode) {
        /* Email */
        case "auth/invalid-email":
            return "Invalid email address.";
        case "auth/user-disabled":
            break;
        case "auth/email-already-in-use":
            return "This email is already in use, try logging in.";
        case "auth/user-not-found":
            return "No user exists with this email address, please double check it.";
        /* Password */
        case "auth/wrong-password":
            return "Invalid password for the given email address.";
        case "auth/weak-password":
            return "Your password should be at least 6 characters long.";
        /* Google */
        case "auth/network-request-failed":
            return "A network error occurred, please try again.";
        // case "auth/cancelled-popup-request":
        //   return "It appears that you clicked the 'Log in with Google' button multiple times. Please only click it once.";
        case "auth/popup-blocked":
            return "It appears that your browser is blocking popups. Please allow them for this website so you can log in with Google.";
        // case "auth/popup-closed-by-user":
        //   return "It appears that you closed the Google sign in pop up without completing it. Feel free to sign up with email/password if you prefer.";
        default:
            return `Unknown error, please try again or email issue to ${config.SUPPORT_EMAIL}.`;
    }
};

export const signOut = async () => {
    try {
        await firebase.auth().signOut();
    } catch (err) {
        console.log("Error signing out: ", err);
    }
};

export const createUser = async(uid, email, displayName) => {
    await axios.post('/api/accounts/create', {
        uid,
        email,
        displayName
    })
}
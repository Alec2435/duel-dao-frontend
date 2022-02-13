
import admin from '../../src/service/firebaseAdmin';
import utils from '../../src/utils/utils';

const db = admin.firestore();

export const createNewUser = async (uid, userObj) => {
    db.collection('users').doc(uid).set(userObj);
}

export const loadUser = async (uid) => {
    const userDoc = await db.collection('users').doc(uid).get();

    return userDoc.data() || {};
}

export const upgradeAccount = async (uid, plan, customerId, subscriptionId) => {
    await db.collection('users').doc(uid).update({
        plan: plan,
        stripe: {
            customer_id: customerId,
            subscription_id: subscriptionId
        }
    })
}

export const getUserByAuthToken = async (authToken) => {
    const userQuery = await db.collection('users').where('authToken', '==', authToken).get();

    if (userQuery.docs.length > 0) {
        return userQuery.docs[0].data();
    }
    return null;
}

export const addToWaitlist = async (email) => {
    await db.collection('waitlist').doc(email).set({
        email,
        joinDate: admin.firestore.FieldValue.serverTimestamp()
    })
}

export const writeOnboardData = async (uid, onboardData, browser) => {
    await db.collection('users').doc(uid).collection('metadata').doc('onboard-data').set({
        onboardData: utils.cleanObj(onboardData),
        browser: utils.cleanObj(browser)
    }, { merge: true });
}


export default {
    createNewUser,
    loadUser,
    upgradeAccount,
    getUserByAuthToken,
    addToWaitlist,

}
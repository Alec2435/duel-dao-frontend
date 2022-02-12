import * as database from '../../../src/service/database';
import { withIronSession } from 'next-iron-session';
import config from '../../../config';
import admin from '../../../src/service/firebaseAdmin';
import constants from '../../../src/utils/constants';
import utils from '../../../src/utils/utils';

const loginHandler = async (req, res) => {
    const uidFromClient = req.body.uid;
    const idToken = req.body.idToken;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const isSignUp = req.body.isSignUp;

    admin.auth().verifyIdToken(idToken).then(async idToken => {
        const { uid } = idToken;
        req.session.set('uid', uid);
        if (isSignUp) {
            const authToken = utils.makeid(32);
            const userObj = {
                user_id: uid,
                firstName,
                lastName,
                email,
                authToken,
                plan: null
            }

            await database.createNewUser(uid, userObj);
        }
        await req.session.save();
        res.json({ success: true });

    }).catch(async err => {
        await admin.auth().deleteUser(uidFromClient);
        console.log(err);
        res.status(500).json({ success: false, error: err, message: "Unknown error, please try again. If the issue persists please let us know at " + config.SUPPORT_EMAIL });
    });
}

export default withIronSession(loginHandler, constants.SESSION_OPTIONS);
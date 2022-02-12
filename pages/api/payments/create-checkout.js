
import stripe from '../../../src/service/stripe';

export default async (req, res) => {
    const uid = req.body.uid;
    const planId = req.body.plan_id;

    const session = await stripe.handleCreateCheckoutSession(uid, planId);
    res.json(session);
}
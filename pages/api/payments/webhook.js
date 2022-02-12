import database from '../../../src/service/database';

// let stripe;
// if (process.env.NODE_ENV === "production") {
//     stripe = require('stripe')(process.env.STRIPE_LIVE_SK);
// } else {
//     stripe = require('stripe')(process.env.STRIPE_TEST_SK);
// }

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

export default async (req, res) => {
    if (req.method === "POST") {
        let data;
        let eventType;

        try {
            data = req.body.data;
            eventType = req.body.type;
        } catch (err) {
            console.error('[/api/payments/webhook] Error parsing webhook body:', err)
            res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // console.log(eventType, ":", data);
        switch (eventType) {
            case 'checkout.session.completed':
                let plan = JSON.parse(data.object.metadata.plan || "{}");
                console.log(`Upgrading account for uid <${data.object.metadata.uid}> to plan <${plan.id}>`);

                await database.upgradeAccount(data.object.metadata.uid, plan, data.object.customer, data.object.subscription);
                break;
            case 'invoice.paid':
                // Continue to provision the subscription as payments continue to be made.
                // Store the status in your database and check when a user accesses your service.
                // This approach helps you avoid hitting rate limits.
                break;
            case 'invoice.payment_failed':
                // The payment failed or the customer does not have a valid payment method.
                // The subscription becomes past_due. Notify your customer and send them to the
                // customer portal to update their payment information.
                break;
            default:
            // Unhandled event type

            //TODO: emailr add cancellation email and failed payment invoice email and invoice paid email
        }

        res.status(200).send('ok');

    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
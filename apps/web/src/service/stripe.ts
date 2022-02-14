// this file handles backend services releated to stripe

import config from '../../config';
import access from '../utils/access';
import database from './database';
import { buffer } from "micro";

const stripeKey = process.env.NODE_ENV === "production" ? process.env.STRIPE_LIVE_SK : process.env.STRIPE_TEST_SK;
// @ts-ignore
const stripe = require("stripe")(stripeKey);

const BASE_URL = process.env.NODE_ENV === "production" ? config.COMPANY_URL : "http://localhost:3000";
const successEndpoint = "/checkout/success";
const failedEndpoint = "/checkout/failed";

export const handleCreateCheckoutSession = async (uid, planId) => {
  console.log("Create Stripe Checkout session");
  const planObj = access[planId];
  planObj.id = planId;
  // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
  // the actual Session ID is returned in the query parameter when your customer
  // is redirected to the success page.
  const lineItems = planObj.priceIds.map(priceId => ({
    price: priceId,
    quantity: 1
  }));

  const params = "?session_id={CHECKOUT_SESSION_ID}";
  try {
    const session = await stripe.checkout.sessions.create({
      client_reference_id: uid,
      allow_promotion_codes: true,
      metadata: {
        uid: uid,
        plan: JSON.stringify(planObj)
      },
      line_items: lineItems,
      mode: planObj.type,
      payment_method_types: ["card"],
      // subscription_data: {
      //   trial_period_days: 14,
      // },
      success_url: `${BASE_URL}${successEndpoint}${params}`,
      cancel_url: `${BASE_URL}${failedEndpoint}${params}`
    });
    console.log(
      `[handleCreateCheckoutSession] Successfully created checkout session with ${planObj.priceIds}`
    );
    return {
      id: session.id,
    };
  } catch (error) {
    console.log(
      `[handleCreateCheckoutSession] Error creating checkout session with ${planObj.priceIds}: ${error}`
    );
    return {
      error,
    };
  }
};

export const stripeWebHook = async (req, res) => {
  if (req.method === "POST") {
    let eventType;
    let event;
    let data;

    const webhookSecret = true;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      const buf = await buffer(req);
      let signature = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          buf.toString(),
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed: ${err}`);
        return res.status(400).send('forbidden');
      }
      // Extract the object from the event.
      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    }

    switch (eventType) {
      case 'checkout.session.completed':
        const checkoutSession = data.object;
        console.log("Checkout session completed:", checkoutSession);
        await database.upgradeAccount(checkoutSession.metadata.uid, checkoutSession.metadata.plan, checkoutSession.customer, null);
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
    }

    res.status(200).send('ok');

  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export default {
  handleCreateCheckoutSession,
  stripeWebHook
}
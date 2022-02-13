// This file contains frontend stripe utilities

import { loadStripe } from "@stripe/stripe-js";

const isLocal = () => {
    return (process.browser && window.location.hostname === "localhost")
}


export const plans = [
    () => {
        return {
            id: "template",
            features: [
                "Full website template",
                "Pave.so documentation",
                "Access to discord server",
            ],
            name: "Pave.so Template",
            price: "$60",
        }
    },
    (cycle) => {
        const features = [
            "Everything you get with the Pave template + ",
            "Project creation crawler access",
            "Priority support + future template updates",
        ];
        const billingCycles = {
            "monthly": {
                id: "member_monthly",
                features,
                name: "Pave.so Member",
                price: "$45 + $15/mo",
                detailText: "$15 billed monthly",
            },
            "yearly": {
                id: "member_yearly",
                features,
                name: "Pave.so Member",
                price: "$10/mo",
                detailText: "Billed annually",
            }
        }
        return billingCycles[cycle];
    }
]

export const getStripe = () => {
    const stripeKey = isLocal() ?
        process.env.NEXT_PUBLIC_STRIPE_TEST_PK : process.env.NEXT_PUBLIC_STRIPE_LIVE_PK;

    return loadStripe(stripeKey);
}
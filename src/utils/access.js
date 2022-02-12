

export default {
    //This is how you would create a 1 time payment (the price needs to be defined as a 1 time charge)
    "template": {
        accessLevel: 1,
        priceIds: [
            "price_1IS9yMDnYc5fR9thdydKXqES"
        ],
        type: "payment",
    },
    //This is how you would create a subscription with a 1 time fee (1 price for each charge)
    "member_monthly": {
        accessLevel: 2,
        priceIds: [
            "price_1ISAOrDnYc5fR9thTq3YwhM5",
            "price_1ISAPjDnYc5fR9thW3AI1hdg"
        ],
        type: "subscription"
    },
    //this is how you would create a plain subscription
    "member_yearly": {
        accessLevel: 2,
        priceIds: [
            "price_1ISAORDnYc5fR9thIZuPNT2g"
        ],
        type: "subscription"
    }
}
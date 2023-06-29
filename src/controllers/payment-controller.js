const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(STRIPE_SECRET_KEY)
const { Payment } = require('../models')

exports.checkout = async (req, res, next) => {
    try {
        // console.log('--------------------', req.body)
        const data = await stripe.checkout.sessions.create({
            success_url:
                'http://localhost:5173/thank?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:5173/',
            locale: 'th',
            currency: 'THB',
            // customer: ,
            line_items: [{ price: req.body.id, quantity: 1 }],
            mode: 'payment',
        })
        // console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
}

exports.payment = async (req, res, next) => {
    try {
        const user = req.user
        const data = req.query
        const response = {}
        // console.log('payment :', data)
        const session = await stripe.checkout.sessions.retrieve(
            req.query.session_id
        )
        //   console.log("________1", session);
        if (session) {
            response.session = session
        }
        // console.log(response)
        //   await Payment.create({
        //     id: session.id,
        //     userId: user.id,
        //   });
        //   console.log("_______aa", req.query);

        const { customer_details, payment_status } = response.session
        console.log(customer_details)
        const { email } = customer_details

        const createPayment = await Payment.create({
            emailUser: email,
            paymentStatus: payment_status,
        })

        res.json({
            message: 'success',
            ...response,
        })
    } catch (err) {
        next(err)
    }
}

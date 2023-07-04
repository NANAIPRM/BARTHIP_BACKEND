const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(STRIPE_SECRET_KEY)
const { Payment } = require('../models')

exports.checkout = async (req, res, next) => {
   
    try {
    
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
     
        const session = await stripe.checkout.sessions.retrieve(
            req.query.session_id
        )
     
        if (session) {
            response.session = session
        }

        const { customer_details, payment_status } = response.session
     
        const { email } = customer_details

        const createPayment = await Payment.create({
            emailUser: email,
            paymentStatus: payment_status,
        })

        res.json(createPayment)
    } catch (err) {
        next(err)
    }
}



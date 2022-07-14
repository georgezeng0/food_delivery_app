if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET)

async function postCharge(req, res, next) {
    try {
      const { amount } = req.body
  
      const charge = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'gbp',
      })
  
      if (!charge) throw new Error('charge unsuccessful')
  
      res.status(200).json({
        clientSecret:charge.client_secret,
        message: 'charge posted successfully'
      })
    } catch (error) {
        next(error)
    }
  }
  
  module.exports = postCharge
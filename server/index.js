if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const path = require('path')
const helmet = require('helmet')

// Utils //
const postCharge = require('./utils/stripeHandler');
// const { authenticateJWT } = require('./utils/auth_middleware.js');
// const wrapAsync = require('./utils/wrapAsync');

// Import routes
const restaurantRoutes = require('./routes/restaurantRoutes');
const dishRoutes = require('./routes/dishRoutes')
const userRoutes = require('./routes/userRoutes')
const reviewsRoutes = require('./routes/reviewsRoutes')

// env variables
const PORT = process.env.PORT || 5000;

// App
const app = express();

// Middleware //
app.use(express.json()); //Parse JSON in req.body
app.use(express.urlencoded({ extended: true }));

// Helmet
if (process.env.NODE_ENV !== "production") {
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                "default-src": ["'self'", "js.stripe.com","fonts.gstatic.com","blob:","mapbox.com"],
                "font-src": ["'self'", "https:", "data:", "fonts.gstatic.com"],
                "script-src": ["'self'", "js.stripe.com"],
                "img-src": ["'self'", "images.unsplash.com", "data:"]
            }
        },
        crossOriginEmbedderPolicy: false,
        expectCt: false,
    }))
} else {
    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    "default-src": ["'self'", "*.stripe.com","fonts.gstatic.com","blob:","*.mapbox.com"],
                    "font-src": ["'self'", "https:", "data:", "fonts.gstatic.com"],
                    "script-src": ["'self'", "js.stripe.com","blob:",],
                    "img-src": ["'self'", "images.unsplash.com", "data:"]
                }
            },
            crossOriginResourcePolicy: true,
            crossOriginEmbedderPolicy: false,
        })
    );
}

// Reroute to https - x-forwarded-proto as per heroku docs
app.use((req, res, next) => {
    if ( req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === "production") {
        return res.redirect(`https://${req.get('host')}${req.url}`);
    }
    next();
  })

// Pick up react index.html file
app.use(express.static(
    path.join(__dirname,'../app/build')));

// Enable cors for all requests (used with stripe)
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})
  
// API routes
app.get("/api", (req, res) => {
    res.json({ message: "Server responding" });
})
app.use("/api/restaurants", restaurantRoutes)
app.use("/api/dishes", dishRoutes)
app.use("/api/users", userRoutes)
app.use("/api/reviews", reviewsRoutes)
app.post('/api/stripe/charge', postCharge)

// Client routes not matching any api endpoints
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../app/build/index.html'))
})

// 404 handler for non-get requests
app.all('*', (req, res, next) => {
    res.status(404).send({message: 'API route not found'})
})

// Error handler
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})

// Listen
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})
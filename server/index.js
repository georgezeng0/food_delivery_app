if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const { getDishes, newDish, deleteDish, updateDish } = require('../models/dish_model');
const { getRestaurants,createRestaurant,deleteRestaurant,updateRestaurant,getRestaurantOwner, getRating, getRestaurantById } = require('../models/restaurant_model');
const { registerUser, getPassword,getUser,editUser } = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createReview, getReviews, deleteReview, getReviewOwner, editReview, updateRating } = require('../models/review_model');
const postCharge = require('./utils/stripeHandler');
const path = require('path')

// Utils
const { authenticateJWT } = require('./utils/auth_middleware.js');


// env variables
const PORT = process.env.PORT || 5000;
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// App
const app = express();

// Middleware
app.use(express.json()); //Parse JSON in req.body
app.use(express.urlencoded({ extended: true }));

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

app.get("/api/restaurants", async (req, res, next) => {
    try {
        const data = await getRestaurants();
        res.send(data);
    } catch (error) {
        next(error);
    }
})

app.get("/api/restaurants/:r_id", async (req, res, next) => {
    try {
        const data = await getRestaurantById(req.params.r_id);
        res.send(data);
    } catch (error) {
        next(error);
    }
})

app.get("/api/restaurants/:r_id/owner", async (req, res, next) => {
    try {
        const data = await getRestaurantOwner(req.params.r_id);
        res.send(data);
    } catch (error) {
        next(error);
    }
})

app.post("/api/restaurants/new",authenticateJWT, async (req, res, next) => {
    try {
        const token_email = req.user ? req.user.id : undefined;
        if (token_email == req.body.owner) {
            const data = await createRestaurant(req.body);
            res.send(data)
        } else {
            throw new Error("Auth token and request user mismatch.")
        }        
    } catch (error) {
        next(error)
    }
})

app.delete("/api/restaurants/:id",authenticateJWT, async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    
    try {
        const { owner } = await getRestaurantOwner(req.params.id)
        // Only owner may delete
        if (token_email == owner) {
            const data = await deleteRestaurant(req.params.id);
            res.send(data)
        } else {
            res.status(403).send("Unauthorized")
        }  
    } catch (error) {
        next(error)
    }
})

app.patch("/api/restaurants/:id",authenticateJWT, async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    try {
        const { owner } = await getRestaurantOwner(req.params.id)
        // Ownly owner may edit
        if (token_email == owner) {
            const data = await updateRestaurant(req.params.id, req.body);
            res.send(data)
        } else {
            res.status(403).send("Unauthorized")
        }
    } catch (error) {
        next(error)
    }
})

// GET all dishes
app.get("/api/dishes/", async (req, res, next) => {
    try {
        const data = await getDishes();
        res.send(data);
    } catch (error) {
        next(error);
    }
})

// Create dish
app.post("/api/dishes/new",authenticateJWT, async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    try {
        const { owner } = await getRestaurantOwner(req.body.restaurant)
        if (token_email === owner) {
            const data = await newDish(req.body)
            res.send(data)
        } else {
            res.status(403).send("Unauthorized")
        }
        
    } catch (error) {
        next(error)
    }
})

// Get dishes for one restaurant
app.get("/api/restaurants/:restaurant_id/dishes", async (req, res, next) => {

    try {
        const data = await getDishes(req.params.restaurant_id);
        res.send(data);
    } catch (error) {
        next(error);
    }
})

// Delete dish
app.delete("/api/dishes/:dish_id/:r_id",authenticateJWT, async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    try {
        const { owner } = await getRestaurantOwner(req.params.r_id)
        if (token_email === owner) {
            const data = await deleteDish(req.params.dish_id);
            res.send(data);
        }
        else {
            res.status(403).send("Unauthorized")
        }
    } catch (error) {
        next(error)
    }
})

// Edit dish
app.patch("/api/dishes/:dish_id",authenticateJWT, async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    try {
        const { owner } = await getRestaurantOwner(req.body.restaurant)
        delete req.body.restaurant
        if (token_email === owner) {
            const data = await updateDish(req.params.dish_id,req.body);
        res.send(data)
        } else {
            res.status(403).send("Unauthorized")
        }
        
    } catch (error) {
        next(error)
    }
})

// Add User/ Register
app.post("/api/users/new", async (req, res, next) => {
    try {
        const { name, email, location, password } = req.body;
        const hash = await bcrypt.hash(password, 12)
        const newUser = await registerUser({name, email, location, password:hash});
        delete newUser.password
        const token = jwt.sign(
            {
                id: newUser.email,
                group: "user"
            },
            TOKEN_SECRET,
            {
                expiresIn: "7d"
            } 
        )
        res.send({ ...newUser, token })
    } catch (error) {
        next(error)
    }
})

// Login
app.post("/api/users/login", async (req, res, next) => {
    const { email, password } = req.body
    try {
        let stored_pw = await getPassword(email)
        if (!stored_pw) {
            // If password not found - i.e. user email incorrect/ not in DB
            throw new Error("Incorrect Details")
        }
        const result = await bcrypt.compare(password, stored_pw.password)
        if (result) {
            const user = await getUser(email);
            delete user.password
            const token = jwt.sign(
                {
                    id: user.email,
                    group: user.group
                },
                TOKEN_SECRET,
                {
                    expiresIn: 86400 // 24h 
                } 
            )
            res.send({ ...user, token, expires: Date.now()+86400 })
        } else {
            throw new Error("Incorrect Details")
        }
    } catch (error) {
        next(error)
    }
})

// Edit User
app.patch("/api/users/edit",authenticateJWT, async (req, res, next) => {
    try {
        let { name, email, location, password } = req.body;
        let user
        if (password) {
            password = await bcrypt.hash(password, 12)
            user = await editUser({name, email, location, password});
        } else {
            user = await editUser({name, email, location});
        }
        delete user.password
        res.send({ ...user})
    } catch (error) {
        next(error)
    }
})

// Get reviews
app.get('/api/reviews/:r_id', async (req, res, next) => {
    try {
        const data = await getReviews(req.params.r_id);
        res.send(data);
    } catch (error) {
        next(error)
    }
})

// Create review
app.post('/api/reviews/new', authenticateJWT, async (req, res, next) => {
    try {
        const data = await createReview(req.body);
        res.send(data)
    } catch (error) {
        next(error)
    }
})

// Edit review
app.patch('/api/reviews/:rev_id', authenticateJWT, async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    try {
        const { author } = await getReviewOwner(req.params.rev_id)
        if (token_email===author) {
            const data = await editReview(req.params.rev_id,req.body);
            res.send(data)
        } else {
            res.status(403).send('Unauthorised')
        }
    } catch (error) {
        next(error)
    }
})


// Delete review
app.delete('/api/reviews/:rev_id',authenticateJWT, async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    try {
        const { author } = await getReviewOwner(req.params.rev_id)
        if (token_email===author) {
            const data = await deleteReview(req.params.rev_id);
            res.send(data)
        } else {
            res.status(403).send('Unauthorised')
        }
    } catch (error) {
        next(error)
    }
})

//Update rating
app.post('/api/reviews/:r_id/update_rating', async (req, res, next) => {
    try {
        const id = req.params.r_id
        const newRating = req.body.newRating
        const data = await updateRating(id, newRating);
        res.send(data)
    } catch (error) {
        next(error)
    }
})

// Stripe payment
app.post('/api/stripe/charge',postCharge)

// 404 handler
app.all('*', (req, res, next) => {
    res.status(404).send({message: 'API route not found'})
})

// Error handler - sends json 
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})
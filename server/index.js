if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const { getDishes, newDish, deleteDish, updateDish } = require('../models/dish_model');
const { getRestaurants,createRestaurant,deleteRestaurant,updateRestaurant } = require('../models/restaurant_model');
const { registerUser, getPassword,getUser } = require('../models/user_model');
const bcrypt = require('bcrypt')

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.post("/api/restaurants/new", async (req, res, next) => {
    try {
        const data = await createRestaurant(req.body);
        res.send(data)
    } catch (error) {
        next(error)
    }
})

app.delete("/api/restaurants/:id", async (req, res, next) => {
    try {
        const data = await deleteRestaurant(req.params.id);
        res.send(data)
    } catch (error) {
        next(error)
    }
})

app.patch("/api/restaurants/:id", async (req, res, next) => {
    try {
        const data = await updateRestaurant(req.params.id,req.body);
        res.send(data)
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
app.post("/api/dishes/new", async (req, res, next) => {
    try {
        const data = await newDish(req.body)
        res.send(data)
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
app.delete("/api/dishes/:dish_id", async (req, res, next) => {
    try {
        const data = await deleteDish(req.params.dish_id);
        res.send(data);
    } catch (error) {
        next(error)
    }
})

// Edit dish
app.patch("/api/dishes/:dish_id", async (req, res, next) => {
    try {
        const data = await updateDish(req.params.dish_id,req.body);
        res.send(data)
    } catch (error) {
        next(error)
    }
})

// Add User
app.post("/api/users/new", async (req, res, next) => {
    try {
        const { name, email, location, password } = req.body;
        const hash = await bcrypt.hash(password, 12)
        const data = await registerUser({name, email, location, password:hash});
        res.send(data)
    } catch (error) {
        next(error)
    }
})

// Login
app.post("/api/users/login", async (req, res, next) => {
    const { email, password } = req.body
    try {
        const {password: stored_pw} = await getPassword(email)
        const result = await bcrypt.compare(password, stored_pw)
        if (result) {
            const user = await getUser(email);
            res.send({...user, password: undefined})
        } else {
            throw new Error("Incorrect Details")
        }
    } catch (error) {
        next(error)
    }
})

// Edit User


// 404 handler
app.all('*', (req, res, next) => {
    res.status(404).send({error: 'API route not found'})
})

// Error handler - sends json 
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})
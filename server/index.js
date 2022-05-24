if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const { getRestaurants,createRestaurant,deleteRestaurant,updateRestaurant } = require('../models/restaurant_model');

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));


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
        console.log(req.body)
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

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})
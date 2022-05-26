if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const { getRestaurants,createRestaurant,deleteRestaurant,updateRestaurant } = require('../models/restaurant_model');

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
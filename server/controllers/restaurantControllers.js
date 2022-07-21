const {
    getRestaurants, createRestaurant, deleteRestaurant, updateRestaurant,
    getRestaurantOwner, getRestaurantById
} = require('../../models/restaurant_model');
const { getDishes } = require('../../models/dish_model');

const restaurants_get = async (req, res, next) => {
    const data = await getRestaurants();
    res.send(data);
}

const restaurants_getOne = async (req, res, next) => {
    const data = await getRestaurantById(req.params.r_id);
    res.send(data);
}

const restaurants_getOwner = async (req, res, next) => {
    const data = await getRestaurantOwner(req.params.r_id);
    res.send(data);
}

const restaurants_new = async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    if (token_email == req.body.owner) {
        const data = await createRestaurant(req.body);
        res.send(data)
    } else {
        throw new Error("Auth token and request user mismatch.")
    }
}

const restaurants_delete = async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    const { owner } = await getRestaurantOwner(req.params.id)
    // Only owner may delete
    if (token_email == owner) {
        const data = await deleteRestaurant(req.params.id);
        res.send(data)
    } else {
        res.status(403).send("Unauthorized")
    }  
}

const restaurants_edit = async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    const { owner } = await getRestaurantOwner(req.params.id)
    // Ownly owner may edit
    if (token_email == owner) {
        const data = await updateRestaurant(req.params.id, req.body);
        res.send(data)
    } else {
        res.status(403).send("Unauthorized")
    }
}

const restaurants_dishes = async (req, res, next) => {
    const data = await getDishes(req.params.restaurant_id);
    res.send(data);
}

module.exports = {
    restaurants_get, 
    restaurants_getOne,
    restaurants_getOwner,
    restaurants_new,
    restaurants_delete,
    restaurants_edit,
    restaurants_dishes
}
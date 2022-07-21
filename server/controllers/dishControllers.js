const { getDishes, newDish, deleteDish, updateDish } = require('../../models/dish_model');
const {
    getRestaurantOwner
} = require('../../models/restaurant_model');

const dishes_get = async (req, res, next) => {
    const data = await getDishes();
    res.send(data);
}

const dishes_new = async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    const { owner } = await getRestaurantOwner(req.body.restaurant)
    if (token_email === owner) {
        const data = await newDish(req.body)
        res.send(data)
    } else {
        res.status(403).send("Unauthorized")
    }
}

const dishes_delete = async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    const { owner } = await getRestaurantOwner(req.params.r_id)
    if (token_email === owner) {
        const data = await deleteDish(req.params.dish_id);
        res.send(data);
    }
    else {
        res.status(403).send("Unauthorized")
    }
}

const dishes_edit = async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    const { owner } = await getRestaurantOwner(req.body.restaurant)
    delete req.body.restaurant
    if (token_email === owner) {
        const data = await updateDish(req.params.dish_id, req.body);
        res.send(data)
    } else {
        res.status(403).send("Unauthorized")
    }
}

module.exports = {
    dishes_get, 
    dishes_new,
    dishes_delete,
    dishes_edit
}
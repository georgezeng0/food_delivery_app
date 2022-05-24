const { pool } = require("./pool");

const getRestaurants = async () => {
    try {
        const res = await pool.query(
            'SELECT * FROM restaurants;'
        )
        return res.rows
    } catch (error) {
        throw new Error(error);
    }
}

const createRestaurant = async (body) => {
    const {r_id,r_name,location} = body
    try {
        const res = await pool.query(
            `INSERT INTO restaurants (r_id,r_name,location) VALUES ('${r_id}','${r_name}','${location}') RETURNING *;`
        );
        return res.rows
    } catch (error) {
        throw new Error(error);
    }
}

const deleteRestaurant = async (id) => {
    try {
        const res = await pool.query(
            `DELETE FROM restaurants WHERE r_id='${id}' RETURNING *;`
        );
        return res.rows
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getRestaurants,
    createRestaurant,
    deleteRestaurant
}
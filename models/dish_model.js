const { pool } = require("./pool");
const format = require('pg-format')

// Queries SQL server for dishes, id optional to get disehs for one restaurant
const getDishes = async (restaurant_id='%') => {
    try {
        const res = await pool.query(
            'SELECT * FROM dishes WHERE restaurant LIKE $1;',
            [restaurant_id]
        )
        return res.rows
    } catch (error) {
        throw new Error(error);
    }
}

// Add dish
const newDish = async (body) => {
    const { d_id, restaurant, name, price, image, available, starred } = body
    const query = format('INSERT INTO dishes VALUES (%L) RETURNING *',
        [d_id, name, price, image, available, starred, restaurant])
    
    try {
        const res = await pool.query(query)
        return res.rows[0]
    } catch (error) {
        throw new Error(error);
    }
}

// Delete dish
const deleteDish = async (dish_id) => {
    try {
        const res = await pool.query(
            'DELETE FROM dishes WHERE d_id=$1 RETURNING *;',
            [dish_id]
        )
        return res.rows[0]
    } catch (error) {
        throw new Error(error);
    }
}

// Edit dish
const updateDish = async (id, body) => {
    let query = `UPDATE dishes SET `;
    const values = [id];
    const columns = Object.keys(body);
    columns.map((col, i) => {
        values.push(body[col]);
        query = `${query}${col}=$${i + 2},`
    });
    query = `${query.substring(0, query.length - 1)} WHERE d_id=$1 RETURNING *;`
    try {
        const res = await pool.query(
            query,
            values
        );
        return res;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getDishes,
    newDish,
    deleteDish,
    updateDish
}
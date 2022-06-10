const { pool } = require("./pool");
const format = require("pg-format")

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
    const { r_id, r_name, cuisine, pricepoint,location,open,close,rating=0,owner='NULL' } = body
    let cuisine_string = '{'
    cuisine.forEach(item => {
        cuisine_string=`${cuisine_string}${item},`
    })
    cuisine_string=`${cuisine_string.slice(0,cuisine_string.length-1)}}`
    const query = format(
        'INSERT INTO restaurants VALUES (%L) RETURNING *;',
        [r_id, r_name, cuisine_string, pricepoint,location,open,close,rating,owner]
    )
    try {
        const res = await pool.query(query);
        return res.rows[0]
    } catch (error) {
        throw new Error(error);
    }
}

const deleteRestaurant = async (id) => {
    try {
        const res = await pool.query(
            `DELETE FROM restaurants WHERE r_id=$1 RETURNING *;`,
            [id]
        );
        return res.rows
    } catch (error) {
        throw new Error(error);
    }
}

const updateRestaurant = async (id, body) => {
    let query = `UPDATE restaurants SET `;
    const values = [id];
    const columns = Object.keys(body);
    columns.map((col, i) => {
        values.push(body[col]);
        query=`${query}${col}=$${i + 2},`
    });
    query=`${query.substring(0,query.length-1)} WHERE r_id=$1 RETURNING *;`
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

const getRestaurantOwner = async (id) => {
    try {
        const res = await pool.query(
            `SELECT owner FROM restaurants WHERE r_id=$1`,
            [id]
        );
        return res.rows[0]
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getRestaurants,
    createRestaurant,
    deleteRestaurant,
    updateRestaurant,
    getRestaurantOwner
}
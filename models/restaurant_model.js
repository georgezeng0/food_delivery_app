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
            `INSERT INTO restaurants (r_id,r_name,location) VALUES ($1,$2,$3) RETURNING *;`,
            [r_id,r_name,location]
        );
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

module.exports = {
    getRestaurants,
    createRestaurant,
    deleteRestaurant,
    updateRestaurant
}
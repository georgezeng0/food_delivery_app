const { pool } = require("./pool");
const format = require("pg-format");

// const updateRating = async (id) => {
//     try {
//         const res = await pool.query(
//             `SELECT AVG(rating) FROM reviews WHERE restaurant=$1`,
//             [id]
//         );
//         const new_rating = res.rows[0].avg
//         const updated = await pool.query(
//             `UPDATE restaurants SET rating=$1 WHERE r_id=$2 RETURNING *`,
//             [new_rating,id]
//         )
//         console.log(updated.rows);
//         return updated.rows[0]
//     } catch (error) {
//         throw new Error(error);
//     }
// }

const createReview = async (input) => {
    const { rev_id, title, body, rating, restaurant, author } = input
    
    const query = format(
        'INSERT INTO reviews VALUES (%L) RETURNING *;',
        [rev_id, title, body, rating, restaurant,author]
    )
    
    try {
        const res = await pool.query(query);
        return res.rows[0]
    } catch (error) {
        throw new Error(error);
    }
}

const getReviews = async (restaurant) => {
    try {
        const res = await pool.query(
            `SELECT * FROM reviews WHERE restaurant=$1;`,
            [restaurant]
        );
        return res.rows
    } catch (error) {
        throw new Error(error)
    }
}

const deleteReview = async (id) => {
    try {
        const res = await pool.query(
            `DELETE FROM reviews WHERE rev_id=$1 RETURNING *;`,
            [id]
        );
        return res.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const getReviewOwner = async (id) => {
    try {
        const res = await pool.query(
            `SELECT author FROM reviews WHERE rev_id=$1;`,
            [id]
        );
        return res.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const editReview = async (rev_id,input) => {
    let query = `UPDATE reviews SET `;
    const values = [rev_id];
    const columns = Object.keys(input);
    columns.map((col, i) => {
        values.push(input[col]);
        query=`${query}${col}=$${i + 2},`
    });
    query=`${query.substring(0,query.length-1)} WHERE rev_id=$1 RETURNING *;`
    try {
        const res = await pool.query(
            query,
            values
        );
        return res.rows;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    createReview, 
    getReviews,
    deleteReview,
    getReviewOwner,
    editReview
}
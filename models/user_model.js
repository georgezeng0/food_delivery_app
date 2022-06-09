const { pool } = require("./pool");
const format = require('pg-format')

// Add user
const registerUser = async (body) => {
    const { name, email, password, location } = body;
    const query = format(
        'INSERT INTO users VALUES (%L) RETURNING *;',
        [email,name,password,location,'user']
    )
    try {
        const res = await pool.query(query);
        return res.rows[0]
    } catch (error) {
        throw new Error(error);
    }
}

const getPassword = async (email) => {
    try {
        const query = format(`SELECT password FROM users WHERE email=%L`, [email])
        const res = await pool.query(query)
        return res.rows[0]
    } catch (error) {
        throw new Error(error);
    }
}

const getUser = async (email) => {
    try {
        const query = format(`SELECT * FROM users WHERE email=%L`, [email])
        const res = await pool.query(query)
        return res.rows[0]
    } catch (error) {
        throw new Error(error);
    }
}

const editUser = async (body) => {
    let query = `UPDATE users SET `;
    const values = [body.email];
    delete body.email;
    const columns = Object.keys(body);
    columns.map((col, i) => {
        values.push(body[col]);
        query=`${query}${col}=$${i + 2},`
    });
    query=`${query.substring(0,query.length-1)} WHERE email=$1 RETURNING *;`
    try {
        const res = await pool.query(
            query,
            values
        );
        return res.rows[0];
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    registerUser,
    getPassword,
    getUser,
    editUser
}
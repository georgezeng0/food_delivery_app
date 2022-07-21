if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}


const { registerUser, getPassword, getUser, editUser } = require('../../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const user_register = async (req, res, next) => {
    const { name, email, location, password } = req.body;
    const hash = await bcrypt.hash(password, 12)
    const newUser = await registerUser({name, email, location, password:hash});
    delete newUser.password
    const token = jwt.sign(
        {
            id: newUser.email,
            group: "user"
        },
        TOKEN_SECRET,
        {
            expiresIn: "7d"
        } 
    )
    res.send({ ...newUser, token })
}

const user_login = async (req, res, next) => {
    const { email, password } = req.body
    let stored_pw = await getPassword(email)
    if (!stored_pw) {
        // If password not found - i.e. user email incorrect/ not in DB
        throw new Error("Incorrect Details")
    }
    const result = await bcrypt.compare(password, stored_pw.password)
    if (result) {
        const user = await getUser(email);
        delete user.password
        const token = jwt.sign(
            {
                id: user.email,
                group: user.group
            },
            TOKEN_SECRET,
            {
                expiresIn: "7d"
            } 
        )
        res.send({ ...user, token, expires: Date.now()+86400 })
    } else {
        throw new Error("Incorrect Details")
    }
}

const user_edit = async (req, res, next) => {
    let { name, email, location, password } = req.body;
    let user
    if (password) {
        password = await bcrypt.hash(password, 12)
        user = await editUser({name, email, location, password});
    } else {
        user = await editUser({name, email, location});
    }
    delete user.password
    res.send({ ...user})
}

module.exports = {
    user_register, user_login, user_edit
}
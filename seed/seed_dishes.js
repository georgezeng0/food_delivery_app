const { pool } = require("../models/pool");
const format = require('pg-format');
const { v4: uuid } = require('uuid')

// Name lists
const { main, side, starter, dessert, drink } = require('./dishes.json')

const buildDishes = (restaurants) => {
    const dishes = []
    restaurants.forEach(({ r_id }) => {
        const temp_main = [...main];
        const temp_side = [...side];
        const temp_starter = [...starter];
        const temp_dessert = [...dessert];
        const temp_drink = [...drink];
        // 2-5 starters
        for (let i = 0; i < Math.floor(2 + Math.random() * 4); i++){
            dishes.push([
                uuid(),
                temp_starter.splice(Math.floor(Math.random() * temp_starter.length), 1)[0],
                Math.floor(400+Math.random() * 401),
                '',
                true,
                Math.random() < 0.25 ? true : false,
                r_id,
                'starter'
            ])
        }
        // 3-7 mains
        for (let i = 0; i < Math.floor(3 + Math.random() * 5); i++){
            dishes.push([
                uuid(),
                temp_main.splice(Math.floor(Math.random() * temp_main.length), 1)[0],
                Math.floor(700+Math.random() * 1001),
                '',
                true,
                Math.random() < 0.25 ? true : false,
                r_id,
                'main'
            ])
        }
        // 1-3 desserts
        for (let i = 0; i < Math.floor(1 + Math.random() * 3); i++){
            dishes.push([
                uuid(),
                temp_dessert.splice(Math.floor(Math.random() * temp_dessert.length), 1)[0],
                Math.floor(300+Math.random() * 401),
                '',
                true,
                Math.random() < 0.25 ? true : false,
                r_id,
                'dessert'
            ])
        }
        // 1-3 drinks
        for (let i = 0; i < Math.floor(1 + Math.random() * 3); i++){
            dishes.push([
                uuid(),
                temp_drink.splice(Math.floor(Math.random() * temp_drink.length), 1)[0],
                Math.floor(200+Math.random() * 201),
                '',
                true,
                Math.random() < 0.25 ? true : false,
                r_id,
                'drink'
            ])
        }
        // 1-3 sides
        for (let i = 0; i < Math.floor(1 + Math.random() * 3); i++){
            dishes.push([
                uuid(),
                temp_side.splice(Math.floor(Math.random() * temp_side.length), 1)[0],
                Math.floor(300+Math.random() * 301),
                '',
                true,
                Math.random() < 0.25 ? true : false,
                r_id,
                'side'
            ])
        }
    });
    return dishes;
}

const seedDishes = async (restaurants) => {
    try {
        const dishes = buildDishes(restaurants)
        const query = format(`INSERT INTO dishes VALUES %L returning d_id`, dishes);
        await pool.query(`TRUNCATE TABLE dishes CASCADE`);
        const res = await pool.query(query)
        console.log(res.rows)
    } catch (error) {
        console.log(error)
    } 
}


module.exports =  seedDishes 
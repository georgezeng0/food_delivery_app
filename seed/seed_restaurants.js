const { pool } = require("../models/pool");
const format = require('pg-format');
const { v4: uuid } = require('uuid')

// Variables
const NUM = 50 // Number to seed
const ADJ_RATE = 0.8 // Rate of names with an adjective
const THE_RATE = 0.35 // Rate of names with "The" at start

// Import helper files
const { postcodes } = require('./postcodes')
const { adjectives, nouns } = require('./names.json');
const res = require("express/lib/response");

const cuisines = [
    "African", "American", "Asian", "British", "Brunch", "Caribbean", "Chinese", "Fast-food", "French",
    "German", "Greek", "Indian", "Italian", "Japanese", "Korean", "Pizza", "Mexican","Seafood","Spanish"
]

// Helper functions //
const randomName = () => {
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    let adjective = ""
    if (Math.random() >= ADJ_RATE) {
        adjective=adjectives[Math.floor(Math.random() * adjectives.length)]
    }
    if (Math.random() < THE_RATE) {
        adjective=`The${adjective?` ${adjective}`:''}`
    }
    return `${adjective} ${noun}`
}

const randomCuisines = () => {
    const res=[]
    const numCuisines = 1 + Math.floor(Math.random() * 3)
    let temp = [...cuisines]
    for (let i = 0; i < numCuisines; i++) {
        const ind = Math.floor(Math.random() * temp.length);
        res.push(temp.splice(ind,1))
    }
    let string = '{'
    res.forEach(item => {
        string=`${string}${item},`
    })
    return `${string.slice(0,string.length-1)}}`
}

// BuildList - this is positional with regard to col names. Update this if
// column names change.
const buildList = () => {
    const res = []
    for (let i = 0; i < NUM; i++){
        res.push([
            uuid(), // r_id
            randomName(), // r_name
            randomCuisines(), //cuisine
            Math.floor(1 + Math.random() * 3), // pricepoint
            postcodes[Math.floor(Math.random() * postcodes.length)], //location
            "00:00", // open
            "23:59", // close - Currently open 24h for seeded restaurants
            0 // rating
            // owner column - not yet implemented in seed
        ])
    }
    return res
}

// Query functions
const deleteRestaurants = async () => {
    try {
        const res = await pool.query(
            `TRUNCATE TABLE restaurants CASCADE`
        );
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const seedRestaurants = async () => {
    try {
        const restaurants = buildList();
        const query = format(`INSERT INTO restaurants VALUES %L returning r_id`, restaurants);
        await deleteRestaurants();
        const res = await pool.query(query);
        console.log(res.rows)
        
    } catch (error) {
        console.log(error)
    } finally {
        pool.end();
    }
}

seedRestaurants()




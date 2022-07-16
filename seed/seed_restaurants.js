const { pool } = require("../models/pool");
const format = require('pg-format');
const { v4: uuid } = require('uuid')
const seedDishes = require("./seed_dishes");
const axios = require('axios');

// Variables
const NUM = 25 // Number to seed
const ADJ_RATE = 0.8 // Rate of names with an adjective
const THE_RATE = 0.35 // Rate of names with "The" at start

// Import helper files
const { postcodes } = require('./postcodes')
const { adjectives, nouns } = require('./names.json');
const { images } = require('./images.json');

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

const randomImage = () => {
    const rand=Math.floor(Math.random()*images.length)
    return images[rand]
}

const getCoords = async (location) => {
    try {
        const res = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=GB&access_token=${process.env.MAPBOX_KEY}`)
        return res.data.features[0]?.center
    } catch (error) {
        throw new Error(error.response.data || 'mapbox API error')
    }
}

// BuildList - this is positional with regard to col names. Update this if
// column names change.
const buildList = async () => {
    const res = []
    for (let i = 0; i < NUM; i++){
        const location = postcodes[Math.floor(Math.random() * postcodes.length)]
        res.push([
            uuid(), // r_id
            randomName(), // r_name
            randomCuisines(), //cuisine
            Math.floor(1 + Math.random() * 3), // pricepoint
            location, //location
            "00:00", // open
            "23:59", // close - Currently open 24h for seeded restaurants
            "georgexzeng@outlook.com", // owner column
            randomImage(), // image_url
            0, //rating
            `{${await getCoords(location)}}` // coordinates
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
        const restaurants = await buildList();
        const query = format(`INSERT INTO restaurants VALUES %L returning r_id`, restaurants);
        console.log(query);
        await deleteRestaurants();
        const res = await pool.query(query);
        await seedDishes(res.rows)
        
    } catch (error) {
        console.log(error)
    } finally {
        pool.end();
    }
}

seedRestaurants()




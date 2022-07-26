const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

// Joi extension to sanitize html in string inputs
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                    disallowedTagsMode: 'escape',
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)


const restaurantSchema = Joi.object({
    r_id: Joi.string().required().escapeHTML(),
    r_name: Joi.string().required().escapeHTML(),
    cuisine: Joi.array().items(Joi.string().required()).required(), // Array must contain one string
    pricepoint: Joi.number().min(1).max(3).required(),
    location: Joi.string().required().escapeHTML(),
    open: Joi.string().required(),
    close: Joi.string().required(),
    owner: Joi.string(),
    image: Joi.string().allow('',null),
    rating: Joi.number().min(0).max(5),
    coordinates: Joi.array()
})

module.exports.validateRestaurant = (req, res, next) => {
    const result = restaurantSchema.validate(req.body);
    if (result.error) {
        const msg = result.error.details.map(el => el.message).join(',');
        throw new Error(msg)
    }
    else next();
}

const dishSchema = Joi.object({
    d_id: Joi.string().escapeHTML(),
    name: Joi.string().required().escapeHTML(),
    price: Joi.number().min(1).max(10000).required(),
    restaurant: Joi.string().required(),
    image: Joi.string().allow('',null),
    available: Joi.boolean().required(),
    starred: Joi.boolean().required(),
    category: Joi.string().required()
})

module.exports.validateDish = (req, res, next) => {
    const result = dishSchema.validate(req.body);
    if (result.error) {
        const msg = result.error.details.map(el => el.message).join(',');
        throw new Error(msg)
    }
    else next();
}

const reviewSchema = Joi.object({
    rev_id: Joi.string().escapeHTML(),
    title: Joi.string().required().escapeHTML(),
    body: Joi.string().allow('',null).escapeHTML(),
    rating: Joi.number().min(0).max(5),
    restaurant: Joi.string(),
    author: Joi.string(),
})

module.exports.validateReview = (req, res, next) => {
    const result = reviewSchema.validate(req.body);
    if (result.error) {
        const msg = result.error.details.map(el => el.message).join(',');
        throw new Error(msg)
    }
    else next();
}

const userSchema = Joi.object({
    email: Joi.string().required().escapeHTML(),
    name: Joi.string().required().escapeHTML(),
    password: Joi.string().required(),
    location: Joi.string(),
})

module.exports.validateUser = (req, res, next) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        const msg = result.error.details.map(el => el.message).join(',');
        throw new Error(msg)
    }
    else next();
}

const editUserSchema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().allow('',null),
    location: Joi.string(),
})

module.exports.validateUserEdit = (req, res, next) => {
    const result = editUserSchema.validate(req.body);
    if (result.error) {
        const msg = result.error.details.map(el => el.message).join(',');
        throw new Error(msg)
    }
    else next();
}
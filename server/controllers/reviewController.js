const { createReview, getReviews, deleteReview, getReviewOwner, editReview, updateRating } = require('../../models/review_model');

const reviews_get = async (req, res, next) => {
    const data = await getReviews(req.params.r_id);
    res.send(data);
}

const reviews_new = async (req, res, next) => {
    const data = await createReview(req.body);
    res.send(data)
}

const reviews_edit = async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    const { author } = await getReviewOwner(req.params.rev_id)
    if (token_email===author) {
        const data = await editReview(req.params.rev_id,req.body);
        res.send(data)
    } else {
        res.status(403).send('Unauthorised')
    }
}

const reviews_delete = async (req, res, next) => {
    const token_email = req.user ? req.user.id : undefined;
    const { author } = await getReviewOwner(req.params.rev_id)
    if (token_email===author) {
        const data = await deleteReview(req.params.rev_id);
        res.send(data)
    } else {
        res.status(403).send('Unauthorised')
    }
}

const reviews_updateRating = async (req, res, next) => {
    const id = req.params.r_id
    const newRating = req.body.newRating
    const data = await updateRating(id, newRating);
    res.send(data)
}

module.exports = {
    reviews_get,
    reviews_new,
    reviews_edit,
    reviews_delete,
    reviews_updateRating
}
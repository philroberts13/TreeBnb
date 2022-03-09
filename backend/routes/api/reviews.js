const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Review } = require('../../db/models');
const router = express.Router();

router.get('/:placeId', asyncHandler(async function (req, res) {
    const reviews = await Review.findAll(
        {
            where: {placeId: req.params.placeId}
        }
    );
    return res.json(reviews)
}));

router.post('/:placeId', asyncHandler(async function (req, res) {
    const review = await Review.create(req.body);
    return res.json(review);
}));


module.exports = router;

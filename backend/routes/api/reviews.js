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

router.get('/edit/:id', asyncHandler(async function (req, res) {
    const review = await Review.findByPk(req.params.id)
    return res.json(review)
}));

router.put('/edit/:id',asyncHandler(async function (req, res) {
    const { review_body } = req.body;
    await Review.update({review_body}, {where: {id: req.params.id} })
    const review = await Review.findByPk(req.params.id)
    return res.json(review);
    })
);


  router.delete('/edit/:id',asyncHandler(async (req, res) => {
        const review = await Review.findByPk(req.params.id);
        await review.destroy();
        return res.json({ message: 'success' });
    })
);


module.exports = router;

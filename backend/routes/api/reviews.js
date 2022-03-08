const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Review } = require('../../db/models');
const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
    const reviews = await Review.findAll();
    console.log("a;lkdjl;kajsdf;lkajsdf;", reviews)
    return res.json(reviews)
}));


module.exports = router;

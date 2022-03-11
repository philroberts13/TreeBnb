const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const validateReview = [
    check('review_body')
        .exists({ checkFalsy: true })
        .withMessage('You are going to have to be more specific...'),
    handleValidationErrors
];

module.exports = validateReview;

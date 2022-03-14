const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const validatePlace = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a descriptive title'),
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an address'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a city'),
    check('state')
        .exists({checkFalsy: true})
        .withMessage('Please provide the state'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the country'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a price per night'),
    check('imageUrl')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an image address'),
    handleValidationErrors
];

module.exports = validatePlace;

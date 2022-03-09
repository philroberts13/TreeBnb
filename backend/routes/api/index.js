// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const placesRouter = require('./places.js');
const reviewsRouter = require('./reviews.js');

router.use('/session', sessionRouter);
router.use('/places', placesRouter);
router.use('/users', usersRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;

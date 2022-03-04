// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const placesRouter = require('./places.js')

router.use('/session', sessionRouter);
router.use('/places', placesRouter)
router.use('/users', usersRouter);

module.exports = router;

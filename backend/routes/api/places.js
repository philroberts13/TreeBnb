const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Place } = require('../../db/models');
const { Review } = require('../../db/models');
const router = express.Router();

router.get('/', asyncHandler(async function(req, res) {
    const places = await Place.findAll({
      include: Review,
    });
    return res.json(places);
  }));

router.post('/form', asyncHandler(async function (req, res) {
    const place = await Place.create(req.body);
    return res.json(place);
  }));

router.get('/:id', asyncHandler(async function(req, res) {
    const place = await Place.findByPk(req.params.id)
    return res.json(place);
}));

// router.get('/:id', asyncHandler(async function (req, res) {
//   const reviews = await Review.findAll();
//   return res.json(reviews)
// }));



router.put('/edit/:id',asyncHandler(async function (req, res) {
    const { id, name, address, city, state, country, price } = req.body;
    await Place.update({ id, name, address, city, state, country, price }, {where: {id: req.params.id} })
    const place = await Place.findByPk(req.params.id)
    return res.json(place);
    })
);


  router.delete('/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const place = await Place.findByPk(id);
        const reviews = await Review.findAll({where: {placeId: place.id}})

        const reviewsArr = [...reviews]
        await reviewsArr.forEach(review => review.destroy());
        await place.destroy();
        return res.json({ message: 'success' });
    })
);

// router.get('/:placeId', asyncHandler(async function (req, res) {
//   const reviews = await Review.findAll({
//       where: {
//           placeId: req.params.placeId
//   }});
//   res.json(reviews)
// }));

// router.delete(
//   '/editReviewForm/id/:id',
//   asyncHandler(async (req, res) => {
//       const { id } = req.params;
//       const review = await review.findByPk(id);

//       await review.destroy();
//       return res.json({ message: 'success' });
//   })
// );


module.exports = router;

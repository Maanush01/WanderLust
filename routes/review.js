const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");

const {validateReview, isReviewAuthor} = require("../middleware.js");
const {isLoggedIn} = require("../middleware.js");

const ReviewController = require("../controllers/reviews.js")

//ReviewSchema validation as middleware

//Post Reviews
router.post('/',isLoggedIn, validateReview, wrapAsync(ReviewController.postReview));

//Delete Review Route
router.delete('/:reviewId',isReviewAuthor, wrapAsync(ReviewController.destroyReview));

module.exports = router;
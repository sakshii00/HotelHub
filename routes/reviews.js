const express=require('express');
const router=express.Router({mergeParams:true});

const {reviewSchema} =require('../joischema.js')
const {isLoggedIn}=require('../middleware.js')
const wrapAsync=require('../utils/wrapAsync');
const Review=require('../models/review.js');
const hotelground = require('../models/hotelground');
const ExpressErrors = require('../utils/expresserrors');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/hotels/${id}`);
    }
    next();
}

router.post('/', isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    const hotel = await hotelground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author=req.user.id;
    hotel.reviews.push(review);
    await review.save();
    await hotel.save();
    req.flash('success','new review created!')
    res.redirect(`/hotels/${hotel.id}`);
}))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await hotelground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','review has been deleted!')
    res.redirect(`/hotels/${id}`);
}))

module.exports=router;
const Campground = require('../models/campground');
const Review = require('../models/review.js');

module.exports.createReview = async(req,res)=>{
    const campground = await Campground.findById(req.params.id).populate('reviews');
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Review Accepted!');
    res.redirect(`/campgrounds/${campground._id}`);
}
module.exports.deleteReview = async(req,res)=>{
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Deleted the review successfully')
    res.redirect(`/campgrounds/${id}`);
}
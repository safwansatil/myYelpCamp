const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

const Campground = require('../models/campground');
const campgrounds =  require('../controllers/campgrounds.js');
const {storage} = require('../cloudinary');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware.js');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const upload = multer({storage});


router.get('/new', isLoggedIn, campgrounds.renderNewForm);


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,  upload.array('image') , validateCampground, catchAsync(campgrounds.createCampground))
    

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put( isLoggedIn, isAuthor,upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete( isLoggedIn, isAuthor, campgrounds.deleteCampground);


router.get('/:id/edit', isLoggedIn,isAuthor, catchAsync(campgrounds.renderEditForm));




module.exports = router;

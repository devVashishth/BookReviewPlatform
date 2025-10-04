const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Add new review
router.post('/:bookId', authMiddleware, reviewController.addReview);

// Get reviews for a book
router.get('/:bookId', reviewController.getReviewsOfBook);

// Get average rating of a book
router.get('/:bookId/average', reviewController.getAverageRating);

// UPDATE review by id (yeh naya add karo)
router.put('/:id', authMiddleware, reviewController.updateReview);

router.delete('/:id', authMiddleware, reviewController.deleteReview);


module.exports = router;

const Review = require('../models/Review');
const Book = require('../models/Book');

// Add new review
exports.addReview = async (req, res) => {
  try {
    const { rating, reviewText } = req.body;
    const review = await Review.create({
      bookId: req.params.bookId,
      userId: req.user.userId,
      rating,
      reviewText
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get reviews for a book
exports.getReviewsOfBook = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId }).populate('userId', 'name email');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get average rating of a book
exports.getAverageRating = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId });
    const average = reviews.length
      ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(2)
      : 0;
    res.json({ averageRating: average });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update review by ID
exports.updateReview = async (req, res) => {
  try {
    const { reviewText, rating } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { reviewText, rating },
      { new: true, runValidators: true }
    );
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


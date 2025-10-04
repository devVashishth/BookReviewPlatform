const Book = require('../models/Book');

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;
    const book = await Book.create({
      title,
      author,
      description,
      genre,
      year,
      addedBy: req.user.userId
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('addedBy', 'name email');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single book
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('addedBy', 'name email');
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

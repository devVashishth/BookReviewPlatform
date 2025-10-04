const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authMiddleware } = require('../middleware/authMiddleware'); // Sirf ek hi baar import!

// Book CRUD endpoints
router.post('/', authMiddleware, bookController.addBook);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);
router.put('/:id', authMiddleware, bookController.updateBook);
router.delete('/:id', authMiddleware, bookController.deleteBook);

module.exports = router;

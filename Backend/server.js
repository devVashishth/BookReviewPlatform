const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');                // <-- ADD THIS LINE

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const app = express();
app.use(express.json());
app.use(cors());                             // <-- ADD THIS LINE (just after express.json)

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('MongoDB error:', err));

app.get('/', (req, res) => {
  res.send('API is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

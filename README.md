# BookReview Platform - MERN Stack

A comprehensive book review platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

✅ **User Authentication**
- User registration and login
- JWT-based authentication
- Secure password hashing

✅ **Book Management**
- Add, view, update, and delete books
- Book details with author, genre, year, description
- Average rating display

✅ **Review System**
- Add reviews with rating (1-5 stars) and text
- Edit and delete your own reviews
- View all reviews for each book
- Real-time average rating calculation

✅ **User Interface**
- Clean and responsive design
- Easy navigation between pages
- User-friendly forms and layouts

## Tech Stack

**Frontend:**
- React.js
- React Router
- Axios for API calls
- CSS for styling

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Project Structure

BookReviewPlatform/
├── Backend/              # Node.js + Express + MongoDB (API)
│   ├── controllers/      # All controller files
│   ├── middleware/       # Auth, error handlers, etc.
│   ├── models/           # Mongoose Schemas
│   ├── routes/           # Route handlers (book, review, auth)
│   ├── server.js
│   └── .env.example
├── client/               # React frontend app
│   ├── public/
│   ├── src/
│   │   ├── components/   # All React components (BookList, BookDetail, ReviewForm, etc.)
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── package.json
│   └── README.md
├── package.json          # (Root, for workspace tools/scripts if any)
├── package-lock.json
└── README.md             # Project documentation

## Setup Instructions

### Backend Setup
1. Open the `Backend` folder: `cd Backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

4. Start backend: `npm run dev`

### Frontend Setup
1. Open the `client` folder: `cd client`
2. Install dependencies: `npm install`
3. Start React app: `npm start`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

**Auth Routes:**
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

**Book Routes:**
- GET `/api/books` - Get all books
- POST `/api/books` - Add new book
- GET `/api/books/:id` - Get book by ID
- PUT `/api/books/:id` - Update book
- DELETE `/api/books/:id` - Delete book

**Review Routes:**
- GET `/api/reviews/:bookId` - Get reviews for a book
- POST `/api/reviews/:bookId` - Add new review
- PUT `/api/reviews/:id` - Update review
- DELETE `/api/reviews/:id` - Delete review

## Demo Video

Project working video:  
[Google Drive Video Link](https://drive.google.com/file/d/1s3y-qK0RecG_SdEE6SgebxIQU7m3B5yp/view?usp=sharing)

## Author

**Dev Vashishth**  
GitHub: [@devVashishth](https://github.com/devVashishth)

## Assignment

This project was developed as part of a Full Stack MERN assignment demonstrating:
- Complete CRUD operations
- User authentication and authorization
- RESTful API design
- React frontend with routing
- MongoDB database integration





import React, { useEffect, useState } from 'react';
import AddBook from './AddBook';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(res => setBooks(res.data))
      .catch(() => setBooks([]));
  }, []);

  const handleAdd = (newBook) => {
    setBooks(prev => [...prev, newBook]);
  };

  return (
    <div style={{maxWidth:900, margin:"40px auto"}}>
      <h2 style={{textAlign:"center"}}>Book List</h2>
      <AddBook onAdd={handleAdd} />
      <div style={{display:"flex", flexWrap:"wrap", gap:24, justifyContent:"center"}}>
        {books.length === 0 && (
          <p>No books found.</p>
        )}
        {books.map(book => (
          <div key={book._id} style={{border:"1px solid #eee", borderRadius:10, padding:20, width:240, boxShadow:"0 2px 8px #eee"}}>
            <h3>{book.title}</h3>
            <p><b>Author:</b> {book.author}</p>
            <p><b>Genre:</b> {book.genre}</p>
            <Link to={`/books/${book._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BookList;

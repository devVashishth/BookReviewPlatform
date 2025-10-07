import React, { useEffect, useState } from 'react';
import AddBook from './AddBook';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = 'https://bookreviewplatform-3-5ccu.onrender.com';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/api/books`)
      .then(res => setBooks(res.data))
      .catch(() => setBooks([]));
  }, []);

  const handleAdd = (newBook) => {
    setBooks(prev => [...prev, newBook]);
  };

  // -->> यह नया function add करो
  const handleDelete = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/api/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(prev => prev.filter(b => b._id !== bookId));
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed");
    }
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
            {/* === Delete Button यहाँ Add करो === */}
            <button
              style={{
                marginTop: 12,
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: 5,
                padding: '6px 14px',
                cursor: 'pointer',
                marginLeft: 10,
              }}
              onClick={() => handleDelete(book._id)}
            >Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;

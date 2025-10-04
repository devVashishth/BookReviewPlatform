import React, { useState } from 'react';
import axios from 'axios';

function AddBook({ onAdd }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    year: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/books',
        {
          ...form,
          year: parseInt(form.year)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Book added!');
      setForm({ title: '', author: '', genre: '', description: '', year: '' });
      if (onAdd) onAdd(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Add failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{margin:'24px auto', maxWidth:350, display:'flex', flexDirection:'column', gap:10}}>
      <h3>Add New Book</h3>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
      <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required rows="3" />
      <input name="year" type="number" placeholder="Year" value={form.year} onChange={handleChange} required />
      <button type="submit">Add Book</button>
      {success && <div style={{color:'green'}}>{success}</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}
export default AddBook;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, reviewText: '' });
  const [editForm, setEditForm] = useState({ rating: 5, reviewText: '' });
  const [editReviewId, setEditReviewId] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(res.data);
      setLoading(false);
    } catch (err) {
      setError('Book not found');
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  // ADD Review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/api/reviews/${id}`,
        { rating: reviewForm.rating, reviewText: reviewForm.reviewText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Review added!');
      setReviewForm({ rating: 5, reviewText: '' });
      setReviews(prev => [res.data, ...prev]);
    } catch (err) {
      setError(err.response?.data?.msg || 'Review submission failed');
    }
  };

  // DELETE Review
  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(prev => prev.filter(r => r._id !== reviewId));
      setSuccess('Review deleted!');
    } catch (err) {
      setError(err.response?.data?.msg || 'Delete failed');
    }
  };

  // EDIT Review - Populate edit form
  const handleEditInit = (review) => {
    setEditReviewId(review._id);
    setEditForm({ rating: review.rating, reviewText: review.reviewText });
    setSuccess('');
    setError('');
  };

  // EDIT Review - Send update
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5000/api/reviews/${editReviewId}`,
        { rating: editForm.rating, reviewText: editForm.reviewText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Review updated!');
      setEditReviewId('');
      setEditForm({ rating: 5, reviewText: '' });
      setReviews(prev => prev.map(r => r._id === editReviewId ? res.data : r));
    } catch (err) {
      setError(err.response?.data?.msg || 'Update failed');
    }
  };

  if (loading) return <div style={{textAlign:'center', margin:40}}>Loading...</div>;
  if (error && !book) return <div style={{textAlign:'center', margin:40, color:'red'}}>{error}</div>;

  const currentUser = JSON.parse(localStorage.getItem('token') ? atob(localStorage.getItem('token').split('.')[1]) : '{}');
  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 'No ratings';

  return (
    <div style={{maxWidth:800, margin:'40px auto', padding:20}}>
      <Link to="/books" style={{color:'#007', textDecoration:'none', marginBottom:20, display:'inline-block'}}>
        ← Back to Books
      </Link>
      {book && (
        <div style={{marginBottom:40}}>
          <h1>{book.title}</h1>
          <div style={{display:'flex', gap:20, marginBottom:20}}>
            <div style={{flex:1}}>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Year:</strong> {book.year}</p>
              <p><strong>Average Rating:</strong> ⭐ {avgRating} ({reviews.length} reviews)</p>
            </div>
          </div>
          <div style={{marginBottom:30}}>
            <h3>Description:</h3>
            <p style={{lineHeight:1.6}}>{book.description}</p>
          </div>
        </div>
      )}

      <div style={{marginBottom:40, padding:20, border:'1px solid #eee', borderRadius:8}}>
        <h3>Add Your Review</h3>
        <form onSubmit={handleReviewSubmit} style={{display:'flex', flexDirection:'column', gap:15}}>
          <div>
            <label>Rating: </label>
            <select 
              value={reviewForm.rating} 
              onChange={e => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})}
              style={{marginLeft:10, padding:5}}
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>
          </div>
          <textarea
            placeholder="Write your review..."
            value={reviewForm.reviewText}
            onChange={e => setReviewForm({...reviewForm, reviewText: e.target.value})}
            rows="4"
            required
            style={{padding:10, border:'1px solid #ddd', borderRadius:4}}
          />
          <button type="submit" style={{padding:'10px 20px', background:'#007', color:'white', border:'none', borderRadius:4}}>
            Submit Review
          </button>
        </form>
        {success && <div style={{color:'green', marginTop:10}}>{success}</div>}
        {error && <div style={{color:'red', marginTop:10}}>{error}</div>}
      </div>

      <div>
        <h3>Reviews ({reviews.length})</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map(review => (
            <div key={review._id} style={{marginBottom:20, padding:15, border:'1px solid #eee', borderRadius:8}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                <div>
                  <strong>{review.userId?.name || 'Anonymous'}</strong>
                  <span style={{marginLeft:10, color:'gold'}}>
                    {'⭐'.repeat(review.rating)}
                  </span>
                </div>
                {review.userId?._id === currentUser.userId && (
                  <>
                    <button 
                      onClick={() => handleDeleteReview(review._id)}
                      style={{color:'red', background:'none', border:'1px solid red', padding:'5px 10px', borderRadius:4, cursor:'pointer', marginRight:10}}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditInit(review)}
                      style={{background:'#007', color:'white', border:'none', padding:'5px 10px', borderRadius:4, cursor:'pointer'}}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
              {editReviewId === review._id ? (
                <form onSubmit={handleEditSubmit} style={{marginTop:10}}>
                  <div>
                    <label>Rating: </label>
                    <select 
                      value={editForm.rating} 
                      onChange={e => setEditForm({...editForm, rating: parseInt(e.target.value)})}
                      style={{marginLeft:10, padding:5}}
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                      <option value={4}>⭐⭐⭐⭐ (4)</option>
                      <option value={3}>⭐⭐⭐ (3)</option>
                      <option value={2}>⭐⭐ (2)</option>
                      <option value={1}>⭐ (1)</option>
                    </select>
                  </div>
                  <textarea
                    value={editForm.reviewText}
                    onChange={e => setEditForm({...editForm, reviewText: e.target.value})}
                    rows="3"
                    required
                    style={{marginTop:8, padding:8, border:'1px solid #ccc', borderRadius:4}}
                  />
                  <button type="submit" style={{marginTop:10, background:'#007', color:'white', border:'none', padding:'5px 20px', borderRadius:4}}>
                    Save
                  </button>
                  <button type="button" style={{marginLeft:10, background:'gray', color:'white', border:'none', padding:'5px 20px', borderRadius:4}}
                    onClick={()=>setEditReviewId('')}>Cancel</button>
                </form>
              ) : (
                <>
                  <p style={{lineHeight:1.5}}>{review.reviewText}</p>
                  <small style={{color:'#666'}}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </small>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookDetail;

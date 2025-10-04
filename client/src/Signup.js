import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      setSuccess('Signup successful! Please login.');
      setTimeout(() => {
        navigate('/login'); // Redirect to Login page
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Try again.');
    }
  };

  return (
    <div style={{
      maxWidth: 350, margin: "60px auto", padding: 24, border: "1px solid #eee", borderRadius: 8, background: "#fff", boxShadow: "0 2px 8px #eee"
    }}>
      <h2 style={{textAlign:"center"}}>Sign Up</h2>
      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:12}}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} autoComplete="off" required style={{padding:8, borderRadius:4, border:"1px solid #ccc"}} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} autoComplete="off" required style={{padding:8, borderRadius:4, border:"1px solid #ccc"}} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{padding:8, borderRadius:4, border:"1px solid #ccc"}} />
        <button type="submit" style={{padding:8, borderRadius:4, background:"#333", color:"white", fontWeight:600}}>Sign Up</button>
      </form>
      {error && <div style={{color: 'red', marginTop:16}}>{error}</div>}
      {success && <div style={{color: 'green', marginTop:16}}>{success}</div>}
    </div>
  );
}

export default Signup;

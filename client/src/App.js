import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from './BookList';
import BookDetail from './BookDetail';
import axios from 'axios';

function App() {
  const [view, setView] = useState('signup');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Login/Signup handlers (same as before)...
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      setSuccess("Signup successful! Please login.");
      setTimeout(() => setView('login'), 1000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed. Try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      let res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setSuccess("Login successful!");
      setTimeout(() => setView('books'), 1000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Try again.');
    }
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    setView('login');
  };

  return (
    <div>
      {/* Show Auth Forms if not logged in */}
      {view !== 'books' && (
        <>
          {/* SIGNUP FORM */}
          {view === 'signup' && (
            <div style={{maxWidth: 350, margin: "60px auto", padding: 24, border: "1px solid #eee", borderRadius: 8, background: "#fff", boxShadow: "0 2px 8px #eee"}}>
              <h2 style={{textAlign:"center"}}>Sign Up</h2>
              <form onSubmit={handleSignup} style={{display:"flex", flexDirection:"column", gap:12}}>
                <input name="name" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
                <input name="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
                <button type="submit">Sign Up</button>
              </form>
              {error && <div style={{color: 'red', marginTop:16}}>{error}</div>}
              {success && <div style={{color: 'green', marginTop:16}}>{success}</div>}
              <div style={{marginTop:16, textAlign:"center"}}>
                <button onClick={()=>setView('login')} style={{background:"none", border:"none", color:"#007", textDecoration:"underline", cursor:"pointer"}}>Already have an account? Log In</button>
              </div>
            </div>
          )}

          {/* LOGIN FORM */}
          {view === 'login' && (
            <div style={{maxWidth: 350, margin: "60px auto", padding: 24, border: "1px solid #eee", borderRadius: 8, background: "#fff", boxShadow: "0 2px 8px #eee"}}>
              <h2 style={{textAlign:"center"}}>Login</h2>
              <form onSubmit={handleLogin} style={{display:"flex", flexDirection:"column", gap:12}}>
                <input name="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
                <button type="submit">Login</button>
              </form>
              {error && <div style={{color: 'red', marginTop:16}}>{error}</div>}
              {success && <div style={{color: 'green', marginTop:16}}>{success}</div>}
              <div style={{marginTop:16, textAlign:"center"}}>
                <button onClick={()=>setView('signup')} style={{background:"none", border:"none", color:"#007", textDecoration:"underline", cursor:"pointer"}}>Don't have an account? Sign Up</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Show App Routes if logged in */}
      {view === 'books' && token && (
        <div>
          <div style={{textAlign: 'center', margin:20}}>
            <button onClick={logout} style={{margin:"0 12px"}}>Logout</button>
          </div>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetail />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import style from '../page.module.css';
import { postData } from '../../../../lib/apiServices';
import Spinner from '@/app/admin/helpers/Spinner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    setLoading(true); // Show loader
    try {
      const res = await postData('/api/auth', { username: email, password });
      console.log(res);

      // Redirect to the desired page if login is successful
      if (res.user) {
        router.push('/admin'); // Change '/dashboard' to your target route
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Failed to login. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center text-start">
      <div className="card p-4 bg-black" style={{ width: "20rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Login</h5>
          {loading ? (
            <Spinner />
          ) : (
            <form onSubmit={handleSubmit}>
               {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white-50">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-white-50">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
             
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

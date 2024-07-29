"use client";
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address:'',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container mt-5">
      <div className="row text-white-50">
        <div className="col-sm-7">
        <form onSubmit={handleSubmit} className='row text-start'>
        <div className="col-md-6 mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="col-3">
        <button type="submit" className="btn btn-custom-green">Submit</button>
        </div>
      </form>
        </div>
        <div className="col-sm-5 ">
            <div className="card bg-transparent text-white-50 text-start ps-5">
            {/* <h2>Contact Information</h2> */}
          <p>
          <span className='fs-3 fw-bold text-custom-green'><i class="bi bi-envelope-at"></i> </span>
            <strong>Email:</strong> <br />
             contact@example.com</p>
          <p>
          <span className='fs-3 fw-bold text-custom-green'><i class="bi bi-telephone"></i> </span>
            <strong>Phone:</strong> <br />
             +123 456 7890</p>
          <p>
            <span className='fs-3 fw-bold text-custom-green'><i class="bi bi-geo-alt "></i> </span>
            <strong>Address:</strong> <br />
           123 Street, City, Country</p>

           <p>
            <span className='fs-3 fw-bold text-custom-green'><i class="bi bi-linkedin"></i> </span>
            <strong>LinkedIn:</strong> <br />
           aman1804</p>
            </div>
        </div>
      </div>
      
    </div>
  );
};

export default ContactForm;

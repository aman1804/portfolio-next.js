import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto text-white-50">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <p className="mb-0">
          &copy; {year} Your Company. All rights reserved.
        </p>
        <div>
          <a href="https://github.com/your-github-username" className="text-white mx-2" aria-label="GitHub">
            <i className="bi bi-github" style={{ fontSize: '20px' }}></i>
          </a>
          <a href="https://www.linkedin.com/in/your-linkedin-username/" className="text-white mx-2" aria-label="LinkedIn">
            <i className="bi bi-linkedin" style={{ fontSize: '20px' }}></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

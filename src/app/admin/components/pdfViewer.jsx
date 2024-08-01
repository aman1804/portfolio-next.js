"use client";
import React from 'react';

const PdfViewer = ({ pdfUrl }) => {
  return (
    <div className='border rounded'>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          style={{ width: '100%', height: '100vh' }}
          frameBorder="0"
        ></iframe>
      ) : (
        <p>No PDF available to display</p>
      )}
    </div>
  );
};

export default PdfViewer;

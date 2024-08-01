"use client";
import { useState } from 'react';
import PdfViewer from './pdfViewer';
import Spinner from '../helpers/Spinner';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('/uploads/my-resume.pdf');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return; // Do nothing if no file is selected

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const res = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const { fileUrl } = await res.json();
        const timestamp = new Date().getTime();
        setPdfUrl(`${fileUrl}?t=${timestamp}`);
        console.log('File uploaded successfully');
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className='row justify-content-end mb-3' onSubmit={handleSubmit}>
        <div className="col-6">
            <h4>Upload Resume</h4>
        </div>
        <div className="col-6 w-50 input-group">
          <input 
            type="file" 
            className="form-control" 
            id="inputGroupFile04" 
            aria-describedby="inputGroupFileAddon04" 
            aria-label="Upload"
            onChange={handleFileChange}
          />
          <button 
            className="btn btn-custom-green" 
            type="submit" 
            id="inputGroupFileAddon04" 
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload PDF'}
          </button>
        </div>
      </form>

      {loading ? (
        <Spinner/>
      ) : (
        <PdfViewer pdfUrl={pdfUrl} />
      )}
    </>
  );
}

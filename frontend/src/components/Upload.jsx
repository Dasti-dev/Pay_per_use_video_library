import React, { useState, useCallback, Suspense } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Upload.css';

function Upload() {
  const token = useSelector(state => state.token);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    authorId: useSelector(state => state.id),
    thumbnail: null,
    video: null,
    premium: false,
    amount: 0
  });

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const { name, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files[0]
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await axios.post('http://localhost:5000/video/upload', formDataToSend, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setLoading(false);
      setFormData({
        title: '',
        description: '',
        authorId: useSelector(state => state.id),
        thumbnail: null,
        video: null,
        premium: false,
        amount: 0
      });
      alert('Video Uploaded');
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert('Failed to upload video');
    }
  };

  return (
    <div className='Upload'>
      <div className="uploadSide">
        <h2>UPLOAD THUMBNAIL AND VIDEO</h2>
        <div className="uploader">
          <div className="thumbnailUploader">
            <input className="field" type="file" name="thumbnail" onChange={handleFileChange} required />
          </div>
          <div className="videoUploader">
            <div>
              <input className="field" type="file" name="video" onChange={handleFileChange} />
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Form
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </Suspense>
    </div>
  );
}

function Form({ formData, handleChange, handleSubmit, loading }) {
  return (
    <div className="formSide">
      <div className="formhandle">
        <form className="form" onSubmit={handleSubmit}>
          <div className="labeldiv">
            <label>Title:</label>
            <input className="field" type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="labeldiv">
            <label>Description:</label>
            <textarea className="field" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="labeldiv checkdiv">
            <label>Premium:</label>
            <input className="field check" type="checkbox" name="premium" checked={formData.premium} onChange={handleChange} />
          </div>
          {formData.premium && (
            <div className="labeldiv ">
              <label>Amount:</label>
              <input className="field" type="number" name="amount" value={formData.amount} onChange={handleChange} required />
            </div>
          )}
          {loading ? <button type="submit" className='uploadButton' disabled>Submitting...</button> : <button type="submit" className='uploadButton'>Submit</button>}
        </form>
      </div>
    </div>
  );
}

export default Upload;

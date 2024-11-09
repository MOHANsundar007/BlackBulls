
import React, { useState } from 'react';
import './Imgcap.css';

function Imgcap() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://127.0.0.1:5000/caption', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setCaption(data.caption);
        setTags(data.tags);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="imgcontainer">
      <h1>Image Captioning</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*" 
        />
        {imagePreview && (
          <div>
            <h3>Image Preview:</h3>
            <img src={imagePreview} alt="ak" className="image" />
          </div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Generate Caption'}
        </button>
      </form>

      {caption && (
        <div>
          <h2>Generated Caption:</h2>
          <p>{caption}</p>
          <h3>Tags:</h3>
          <p>{tags}</p>
        </div>
      )}
    </div>
  );
}

export default Imgcap;
import React, { useState } from 'react';
import './Card.css';

function Card({ video, onClick }) {
  const [loading, setLoading] = useState(false);

  const handleOnClick = () => {
    setLoading(true);
    onClick(video);
  };

  return (
    <div className='card' onClick={handleOnClick}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <img className="thumbnail" src={""} alt="Thumbnail" />
          <div className="title">{video.title}</div>
          <div className="description">{video.description}</div>
          <div className="author">By {video.authorId}</div>
        </>
      )}
    </div>
  );
}

export default Card;

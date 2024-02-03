import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Card from './Card';
import './Video.css';

function Video() {
  const token = useSelector(state => state.token);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'Authorization': `${token}`
        };
        const response = await axios.get('http://localhost:5000/video/data', { headers });
        setVideo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      setVideo([]);
    };
  }, []);

  return (
    <div className="video">
      {video.map((videoItem, index) => (
        <Card key={index} video={videoItem} />
      ))}
    </div>
  );
}

export default Video;

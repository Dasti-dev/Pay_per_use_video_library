import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import Card from './Card';
import Like from '../assets/like.png';
import Dislike from '../assets/dislike.png';
import Download from '../assets/download.png';
import Caption from '../assets/caption.png';
import Money from '../assets/money.png';
import './Video.css';

const optnTray = [
  {
    name: "Like",
    icon: Like,
    api: "",
  },
  {
    name: "Dislike",
    icon: Dislike,
    api: "",
  },
  {
    name: "Download",
    icon: Download,
    api: "",
  },
  {
    name: "Transcode",
    icon: Caption,
    api: "",
  },
  {
    name: "Pay",
    icon: Money,
    api: "",
  },
];

function Video() {
  const token = useSelector(state => state.token);
  const [video, setVideo] = useState([]);
  const [play, setPlay] = useState('');
  const [page, setPage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'Authorization': `${token}`
        };
        console.log('is here')
        const response = await axios.get('http://localhost:5000/video/data', { headers });
        console.log('is here also')
        console.log(response.data);
        setVideo(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  const handleDirect = useCallback((videoItem) => {
    setPage(true);
    setPlay(videoItem);
  }, []);

  const handleBackbutton = useCallback(() => {
    setPage(false);
    setPlay('');
  }, []);

  return (
    <div className="video">
      {loading && <div>Loading...</div>}
      {!page && !loading && (
        <div className='video'>
          {video.map((videoItem, index) => (
            <Card key={index} video={videoItem} onClick={() => handleDirect(videoItem)} />
          ))}
        </div>
      )}
      {page && (
        <div className='page'>
          <div className="left-player">
            <div className="playbox">
              <div className="side"></div>
              <ReactPlayer
                url={play.link}
                controls
                width="70%"
                height="95%"
                autoPlay
                className="player"
              />
            </div>
            <div className="optnbtns">
              {optnTray.map((item, index) => (
                <div className="menu" key={index}>
                  <img src={item.icon} alt="" className='icon' />
                  {item.name}
                </div>
              ))}
            </div>
            <div className="blankspace">Wow !!! So quiet</div>
          </div>
          <div className="right-player">
            <button onClick={handleBackbutton} className='back'>Back</button>
            <div className="recommendation">Recommendation</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Video;

import React from 'react';
// import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';// Assuming VideoPlayer component is defined in a separate file

function Player() {
//   const { videoId } = useParams();
//   const [videoUrl, setVideoUrl] = useState('');

//   useEffect(() => {
//     // Fetch video URL using videoId (from your backend API)
//     const fetchVideoUrl = async () => {
//       try {
//         // Make API call to fetch video URL using videoId
//         const response = await fetch(`http://localhost:5000/video/data`);
//         const data = await response.json();
//         setVideoUrl(data.videoUrl.url);
//       } catch (error) {
//         console.error('Error fetching video:', error);
//       }
//     };

//     fetchVideoUrl();
//   }, [videoId]);

    const video = useSelector(state => state.videoContent)

  return (
    <div>
      <ReactPlayer
        url={video.url}
        controls // Enable player controls (play, pause, seek, volume)
        width="50vw"
        height="50vh"
      />
    </div>
  );
}

export default Player;

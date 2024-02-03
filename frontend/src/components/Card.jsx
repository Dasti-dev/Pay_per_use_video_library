import React from 'react'
import './Card.css'

function Card({video}) {
  return (
    <div className='card'>
      <img className="thumbnail" src={video.thumbnailUrl} alt="Thumbnail" />
      <div className="title">{video.title}</div>
      <div className="description">{video.description}</div>
      <div className="author">By {video.author}</div>
    </div>
  )
}

export default Card

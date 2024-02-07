const express = require('express');
const cloudinary = require('cloudinary').v2;
const Video = require('../model/video')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

const generateRandomVideo = () => {
  const titles = ['Video 1', 'Video 2', 'Video 3', 'Video 4', 'Video 5'];
  const descriptions = ['Description 1', 'Description 2', 'Description 3', 'Description 4', 'Description 5'];
  const authors = ['Author 1', 'Author 2', 'Author 3', 'Author 4', 'Author 5'];
  const links = ['https://www.youtube.com/watch?v=XgLctgRh_7g', 'https://www.youtube.com/watch?v=XgLctgRh_7g', 'https://www.youtube.com/watch?v=XgLctgRh_7g', 'https://www.youtube.com/watch?v=XgLctgRh_7g', 'https://www.youtube.com/watch?v=XgLctgRh_7g'];
  const premiums = [true, false];
  const amounts = [100, 200, 300, 400, 500];

  const randomIndex = Math.floor(Math.random() * titles.length);

  return {
      title: titles[randomIndex],
      description: descriptions[randomIndex],
      authorId: authors[randomIndex],
      link: links[randomIndex],
      premium: premiums[Math.floor(Math.random() * premiums.length)],
      amount: amounts[Math.floor(Math.random() * amounts.length)]
  };
};

router.get('/data', (req, res) => {
  const data = [];
  for (let i = 0; i < 50; i++) {
      data.push(generateRandomVideo());
  }
  res.json(data)
})

router.post('/upload',upload.single('thumbnail'), async (req, res) => {
    try {
        // Validate incoming data
        const { title, description, authorId, link, premium, amount } = req.body;
        if (!title || !description || !authorId ) {
          return res.status(400).json({ error: 'Title, description, authorId, and link are required' });
        }
    
        // Upload thumbnail to Cloudinary
        const thumbnailResult = await cloudinary.uploader.upload(req.file.path);
    
        // Create new video object
        const newVideo = new Video({
          title,
          description,
          author: authorId,
          thumbnail: thumbnailResult.secure_url,
          link: link || 'https://www.youtube.com/watch?v=k1RI5locZE4',
          like: 0,
          dislike: 0,
          premium: premium || false,
          amount: premium ? amount : null
        });
    
        // Save video to database
        await newVideo.save();
    
        // Return success response
        return res.status(201).json({ message: 'Video uploaded successfully' });

    } catch (error) {
        console.error('Error uploading video:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;

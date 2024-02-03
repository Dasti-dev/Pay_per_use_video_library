const express = require('express');
// const path = require('path');
const nanoid = require("nanoid")
const router = express.Router();

const generateData = () => {
    const data = [];

    for (let i = 0; i < 50; i++) {
      const thumbnail = `../Assets/thumbnail.jpg`; 
      const title = `Video ${i + 1}`;
      const description = `Description for Video ${i + 1}`;
      const author = `Author ${i + 1}`;
      const id = nanoid();
      data.push({ thumbnail, title, description, author, id });
    }
    return data;
};

router.get('/data', (req, res) => {
    const data = generateData(); 
    res.json(data); 
}) 

module.exports = router;

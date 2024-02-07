const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connected")
});

cloudinary.config({ 
  cloud_name: 'dhdq87pzk', 
  api_key: '161715978996754', 
  api_secret: '-b9cwKT8kY5lLaat_ZvZh4DYOvg' 
})

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const transacRoutes = require('./routes/transaction');
const getUsers = require('./routes/user');
const getVideo = require('./routes/video');
const authMiddleware = require('./middleware/authMiddleware');

app.use('/auth', authRoutes);
app.use('/wallet', authMiddleware.verifyToken ,transacRoutes);
app.use('/list', authMiddleware.verifyToken ,getUsers);
app.use('/list', authMiddleware.verifyToken ,getUsers);
app.use('/video', authMiddleware.verifyToken ,getVideo);

app.listen(PORT,() => {
    console.log(`Backend running at ${PORT}`);
})
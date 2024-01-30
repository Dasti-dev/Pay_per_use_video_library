const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connected")
});

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const transacRoutes = require('./routes/transaction');
const authMiddleware = require('./middleware/authMiddleware');

app.use('/auth', authRoutes);
app.use('/wallet', authMiddleware.verifyToken ,transacRoutes);

app.listen(PORT,() => {
    console.log(`Backend running at ${PORT}`);
})
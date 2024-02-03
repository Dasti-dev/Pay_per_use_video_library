const express = require('express');

const User = require('../model/user');
const router = express.Router();

router.get('/users', async (req,res) => {
    try {

        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {

        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });

    }
})

module.exports = router;
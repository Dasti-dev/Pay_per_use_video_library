const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../model/user');
const Account = require('../model/account');

const router = express.Router();

router.post('/signup', async (req,res) => {
    try {
        const {firstname , lastname , username , password} = req.body;
        console.log(req.body);
        if(await User.findOne({username})) {
            return res.status(400).json({error:'Name already taken'});
        } else {
            const hashedPassword = await bcrypt.hash(password,10);
            const user = new User({firstname , lastname , username , password : hashedPassword});
            await user.save();
            const account = new Account({ owner: user._id }); 
            await account.save();
            res.status(201).json({ message: 'SignUp successfull'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/login', async (req,res) => {
    try {
        const {username , password} = req.body;
        const user = await User.findOne({username}) 
        if(!user) {
            return res.status(404).json({ error: 'User not found'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid Password'})
        }

        const token = jwt.sign({ username }, 'secretkey');
        console.log({ id : user._id , token })
        res.status(200).json({ id : user._id , token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/update', async (req,res) => {
    try {
        const {firstname , lastname , username , password , email} = req.body;
        const user = await User.findOne({username})
        if(!user) {
            return res.status(404).json({ error: 'User not found'});
        }
        if (username) user.username = username;
        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (password) user.password = password;
        if (email) user.email = email;
        
        await user.save();

        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;
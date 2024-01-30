const express = require('express');
const mongoose = require('mongoose');
const Account = require('../model/account');

const router = express.Router();

router.post('/send', async (req,res) => {
    try {
        const { sender , recipient , amount } = req.body;

        const senderAccount = await Account.findOne({owner : sender}).populate('owner')
        
        
        const recipientAccount = await Account.findOne({owner : recipient}).populate('owner')
        

        if (!senderAccount || !recipientAccount) {
            return res.status(404).json({ error: 'Sender or recipient account not found' });
        }

        if (senderAccount.balance < amount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        senderAccount.balance -= amount;
        recipientAccount.balance += amount;
        await senderAccount.save({ session });
        await recipientAccount.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ message: 'Transaction successful' });

    } catch (error) {
        console.error('Error in transaction:', error);
        if(session) {
            await session.abortTransaction();
            session.endSession();
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/balance/:id', async (req,res) => {
    try {
        const sender = req.params.id;
        const senderAccount = await Account.findOne({owner : sender}).populate('owner')
        
        if(!senderAccount) {
            return res.status(404).json({ error: 'Account not found'});
        }
        const balance = senderAccount.balance;
        res.status(200).json({ balance});
    } catch (error) {
        console.error('Error in retriver: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;
const mongoose = require('mongoose')
// const User = require('./user');

const accountSchema = new mongoose.Schema({
    balance: {
        type : Number,
        min : 0,
        required : true,
        default : 5000
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
})

const Account = mongoose.model("Account",accountSchema);

module.exports = Account;
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    thumbnail: { type: String, required: true },
    link: { type: String, default: 'DEFAULT_YOUTUBE_URL' },
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
    premium: { type: Boolean, default: false },
    amount: { type: Number, required: function() { return this.premium; } }
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
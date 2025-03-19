const mongoose = require("mongoose");

const videoLinkSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps : true});

const VideoLink = mongoose.model("VideoLink", videoLinkSchema);

module.exports = VideoLink;

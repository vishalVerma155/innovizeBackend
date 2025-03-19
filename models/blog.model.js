const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default : Date.now()
    }
}, {timestamps : true});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

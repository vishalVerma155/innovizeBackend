const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps : true});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;

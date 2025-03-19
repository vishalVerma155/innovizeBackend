const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    businessName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    
}, {timestamps : true});

const ContactUs = mongoose.model("ContactUs", contactUsSchema);

module.exports = ContactUs;

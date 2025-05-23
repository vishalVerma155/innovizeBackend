const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
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
    country: {
        type: String,
        trim: true,
    },
    websiteUrl: {
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

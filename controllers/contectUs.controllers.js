const ContactUs = require('../models/contectUs.model.js');

const createContectUs = async (req, res) => {
    try {
        const { fullName, businessName, email, contactNumber, message } = req.body;

        if (!fullName || !email ||  !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newContact = new ContactUs({ fullName, businessName, email, contactNumber, message });
        await newContact.save();

        return res.status(201).json({ message: "Message sent successfully", contact: newContact });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { createContectUs };
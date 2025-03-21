const ContactUs = require('../models/contectUs.model.js');

const createContectDetail = async (req, res) => {
    try {
        const { fullName, businessName, email, contactNumber, message } = req.body;

        if (!fullName || fullName && fullName.trim() === "" || !message || message && message.trim() === "") {
            return res.status(400).json({ success: false, error: "Full name, email and message are required" });
        }

        const newContact = new ContactUs({
            fullName,
            businessName: businessName ? businessName : 'undefined',
            email: email ? email : 'undefined',
            contactNumber: contactNumber ? contactNumber : 'undefined',
            message
        });
        await newContact.save();

        if (!newContact) {
            return res.status(400).json({ success: false, error: "Contect deatails not saved." });
        }

        return res.status(201).json({ success: true, message: "Message sent successfully", contactDetails: newContact });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const getAllContectDetails = async (req, res) => {
    try {
        const contacts = await ContactUs.find().sort({ createdAt: -1 }); // Latest messages first

        return res.status(201).json({ success: true, message: "all contect fetched successfully", allcontact: contacts });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const getContectDetailById = async (req, res) => {
    try {
        const contact = await ContactUs.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ success: false, error: "Contect detail not found" });
        }

        return res.status(201).json({ success: true, message: " contect  detail fetched successfully", contact });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const deleteContectDetail = async (req, res) => {
    try {
        const contact = await ContactUs.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({ success: false, error: "Contect detail not found" });
        }

        return res.status(201).json({ success: true, message: " contect  detail deleted  successfully", deletedcontact : contact});
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {  createContectDetail, getAllContectDetails, getContectDetailById, deleteContectDetail };
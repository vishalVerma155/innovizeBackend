const Feedback = require('../models/feedback.model.js');

const createFeedback = async (req, res) => {
    try {
        const { title, description, userName } = req.body;

        if (title && title.trim() === "" || description && description.trim() === "" || userName && userName.trim() === "") {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const newFeedback = new Feedback({ title, description, userName });
        await newFeedback.save();

        if (!newFeedback) {
            return res.status(500).json({ success: false, error: "Feedback is not saved" });
        }

        return res.status(201).json({ success: true, message: "Feedback submitted successfully", feedback: newFeedback });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const getAllFeedback = async(req, res) =>{
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Latest feedbacks first

        return res.status(201).json({ success: true, message: "Feedbacks fetched successfully", feedback: feedbacks });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const getFeedbackById = async(req, res) =>{
    try {
        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        return res.status(201).json({ success: true, message: "Feedbacks fetched successfully", feedback });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const deleteFeedback = async(req, res) =>{
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        return res.status(201).json({ success: true, message: "Feedbacks deleted successfully",deletedfeedback : feedback });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { createFeedback, getAllFeedback, getFeedbackById, deleteFeedback };
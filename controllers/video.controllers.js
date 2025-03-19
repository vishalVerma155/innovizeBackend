const Video = require('../models/video.model.js');

const createVideo = async (req, res) => {
    try {
        const { link } = req.body;

        if (link && link.trim() === "") {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const newVideo = new Video({ link });
        await newVideo.save();

        if (!newVideo) {
            return res.status(500).json({ success: false, error: "Video is not saved" });
        }

        return res.status(201).json({ success: true, message: "Video submitted successfully", Video: newVideo });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const getAllVideo = async(req, res) =>{
    try {
        const Videos = await Video.find().sort({ createdAt: -1 }); // Latest video link first

        return res.status(201).json({ success: true, message: "Videos fetched successfully", Videos });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const getVideoById = async(req, res) =>{
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({success: false, message: "Video not found" });
        }

        return res.status(201).json({ success: true, message: "Video fetched successfully", video });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const updateVideoLink = async(req, res) =>{
    try {
        const videoId = req.params.id;
        const {link} = req.body;

        const updatedVideoLink = await Video.findByIdAndUpdate(videoId, {link}, {new : true});

        if (!updatedVideoLink) {
            return res.status(404).json({success: false, message: "Video not found" });
        }
        return res.status(201).json({ success: true, message: "Video link updated successfully", updatedVideoLink });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const deleteVideo = async(req, res) =>{
    try {
        const video = await Video.findByIdAndDelete(req.params.id);

        if (!video) {
            return res.status(404).json({success: false, message: "Video not found" });
        }
        return res.status(201).json({ success: true, message: "Video deleted successfully", deletedVideo : video });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { createVideo, deleteVideo, getAllVideo, getVideoById, updateVideoLink };
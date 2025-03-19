const Blog = require('../models/blog.model.js');

const createBlog = async (req, res) => {
    try {
        const { title, description, userName } = req.body;

        if (title && title.trim() === "" || description && description.trim() === "" || userName && userName.trim() === "") {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const newBlog = new Blog({ title, description, userName });
        await newBlog.save();

        if (!newBlog) {
            return res.status(500).json({ success: false, error: "Blog is not saved" });
        }

        return res.status(201).json({ success: true, message: "Blog submitted successfully", Blog: newBlog });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const getAllBlog = async(req, res) =>{
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // Latest feedbacks first

        return res.status(201).json({ success: true, message: "Blogs fetched successfully", blogs });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const getBlogById = async(req, res) =>{
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({success: false, message: "Blog not found" });
        }

        return res.status(201).json({ success: true, message: "Blog fetched successfully", blog });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const deleteBlog = async(req, res) =>{
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({success: false, message: "Blog not found" });
        }
        return res.status(201).json({ success: true, message: "Blog deleted successfully", deletedBlog : blog });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { createBlog, deleteBlog, getAllBlog, getBlogById };
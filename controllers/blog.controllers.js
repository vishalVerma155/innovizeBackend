const Blog = require('../models/blog.model.js');

const createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;

        const image = req.file?.path || undefined;
        console.log(image);

        if (!title || title && title.trim() === "" || !description || description && description.trim() === "") {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const newBlog = new Blog({ title, description, image });
        await newBlog.save();

        if (!newBlog) {
            return res.status(500).json({ success: false, error: "Blog is not saved" });
        }

        return res.status(201).json({ success: true, message: "Blog submitted successfully", Blog: newBlog });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const getAllBlog = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // Latest feedbacks first

        return res.status(201).json({ success: true, message: "Blogs fetched successfully", blogs });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        return res.status(201).json({ success: true, message: "Blog fetched successfully", blog });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}


const editBlog = async (req, res) => {
    try {
        const { id } = req.params; // Blog ID to edit
        const { title, description } = req.body;
        const image = req.file?.path || undefined;

        if (!id) {
            return res.status(404).json({ success: false, message: "Blog id not found" });
        }
        const payload = {}

        if (title && title.trim() !== "") {
            payload.title = title
        }

        if (description && description.trim() !== "") {
            payload.description = description
        }

        if (image) {
            payload.image = image
        }

        

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            payload,
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ success: false, error: "Blog not found or update failed" });
        }

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            Blog: updatedBlog
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        return res.status(201).json({ success: true, message: "Blog deleted successfully", deletedBlog: blog });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { createBlog, deleteBlog, getAllBlog, getBlogById, editBlog };
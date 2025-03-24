const Projects = require('../models/projectSection.model.js');

// Create a project section
const createProject = async (req, res) => {
    try {

        const { heading, subHeading, description } = req.body; // get project data
        const image = req.file?.path || undefined; // get image

        if (!heading || heading && heading.trim() === "") {
            return res.status(404).json({ success: false, error: "Heading not found" })
        }

        const projectSection = new Projects({
            heading,
            subHeading,
            image,
            description
        });

        await projectSection.save();

        if (!projectSection) {
            return res.status(500).json({ success: false, error: "Heading not found" })
        }

        return res.status(201).json({ success: true, message: "Project section has been created", projectSection });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

// Read all project sections
const getAllProjects = async (req, res) => {
    try {
        const projectSections = await Projects.find();
        return res.status(201).json({ success: true, message: "Project section has been fetched", projectSections });

    } catch (error) {
       return res.status(500).json({ success: false, error: error.message });
    }
};

// Read a single project section by ID
const getSingleProject = async (req, res) => {
    try {
        const projectSection = await Projects.findById(req.params.id);
        return res.status(201).json({ success: true, message: "Project section has been fetched", projectSection });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Update a project section
// const updateProject = async (req, res) => {
//     try {
//         const projectSection = await ProjectSection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//         if (!projectSection) return res.status(404).json({ error: 'Project Section not found' });
//         res.json(projectSection);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// Delete a project section
const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const projectSection = await Projects.findByIdAndDelete(projectId);
        if (!projectSection) return res.status(404).json({ error: 'Project Section not found' });
        return res.status(201).json({ success: true, message: "Project section has been deleted", deleted_projectSection : projectSection });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createProject, getAllProjects, getSingleProject, deleteProject };
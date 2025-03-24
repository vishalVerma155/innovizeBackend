const mongoose = require('mongoose');

const projectSectionSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true
  },
  subHeading: {
    type: String,
    trim: true
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true });


const Projects = mongoose.model('ProjectSection', projectSectionSchema);
module.exports = Projects;
const verifyJWT = require('../middleware/authMiddleware.js');
const express = require('express');

const {login, getAdmin} = require('../controllers/admin.controllers.js');

const {createBlog, deleteBlog, getAllBlog, getBlogById} = require("../controllers/blog.controllers.js");

const {createContectDetail, getAllContectDetails, getContectDetailById, deleteContectDetail} = require('../controllers/contectUs.controllers.js');

const {createFeedback, getAllFeedback, getFeedbackById, deleteFeedback} = require("../controllers/feedback.controllers.js");

const {createVideo, deleteVideo, getAllVideo, getVideoById, updateVideoLink} = require('../controllers/video.controllers.js');



const router = express.Router();

// login admin
router.post("/loginAdmin", login);

// get admin
router.get("/getAdmin", verifyJWT, getAdmin);



// BLOGS APIS ROUTES
// create blogs
router.post("/createBlog", createBlog);

// get all blogs
router.get("/getAllBlogs", getAllBlog);

// get blog
router.get("/getBlog/:id", getBlogById);

// delete blog
router.delete("/deleteBlog/:id", verifyJWT, deleteBlog);



// CONTECT US ROUTES
// create contect us
router.post("/createContectDetails", createContectDetail);

// get all contect details
router.get("/getAllContectsDetails",verifyJWT, getAllContectDetails);

// get contect details
router.get("/getContectDetails/:id", verifyJWT, getContectDetailById);

// delete contect details
router.delete("/deleteContectDetail/:id", verifyJWT, deleteContectDetail);



module.exports = router;
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
router.delete("/deleteBlog/:id",verifyJWT, deleteBlog);



// CONTECT US ROUTES
// create contect us
router.post("/createContectDetails", createContectDetail);

// get all contect details
router.get("/getAllContectsDetails",verifyJWT, getAllContectDetails);

// get contect details
router.get("/getContectDetails/:id", verifyJWT, getContectDetailById);

// delete contect details
router.delete("/deleteContectDetail/:id",verifyJWT, deleteContectDetail);



// FEEDBACK ROUTES
// create feedback
router.post("/createFeedback", createFeedback);

// get all feedback
router.get('/getAllFeedbacks', getAllFeedback);

// get single feedback
router.get("/getFeedback/:id", getFeedbackById);

// deletefeedback
router.delete("/deleteFeedback/:id",verifyJWT, deleteFeedback);


// VIDEO ROUTES
// create video link
router.post("/createVideoLink", createVideo);

// get video link
router.get("/getVideoLink/:id", getVideoById);

// get all video link
router.get("/getAllVideoLinks", getAllVideo);

// delete video link
router.delete("/deleteVideoLink/:id",verifyJWT, deleteVideo);

// edit video link
router.patch("/updateVideoLink/:id",verifyJWT, updateVideoLink);



module.exports = router;
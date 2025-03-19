const verifyJWT = require('../middleware/authMiddleware.js');
const express = require('express');

const {login, getAdmin} = require('../controllers/admin.controllers.js');
const {createBlog, deleteBlog, getAllBlog, getBlogById} = require("../controllers/blog.controllers.js");



const router = express.Router();

// login admin
router.post("/loginAdmin", login);

// get admin
router.get("/getAdmin", verifyJWT, getAdmin);



// blogs api
// create blogs
router.post("/createBlog", createBlog);

// get all blogs
router.get("/getAllBlogs", getAllBlog);

// get blog
router.get("/getBlog/:id", getBlogById);

// delete blog
router.delete("/deleteBlog/:id", verifyJWT, deleteBlog);



module.exports = router;
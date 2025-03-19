const verifyJWT = require('../middleware/authMiddleware.js');
const express = require('express');

const {login, getAdmin} = require('../controllers/admin.controllers.js');




const router = express.Router();

// login admin
router.post("/loginAdmin", login);

// get admin
router.get("/getAdmin", verifyJWT, getAdmin);



module.exports = router;
const verifyJWT = require('../middleware/authMiddleware.js');
const express = require('express');

const {login} = require('../controllers/admin.controllers.js');




const router = express.Router();

// login admin
router.post("/loginAdmin", login);

// // get users list
// router.get("/getUsersList",verifyJWT, getAllUsersList);

// // search user by email, name, 
// router.get("/searchUser",verifyJWT, searchUser );

// // edit admin details
// router.patch("/editAdmin",verifyJWT, editAdmin);

// // get affiliate tree
// router.get("/affiliateTree/:userId", getAffiliateTree);





module.exports = router;
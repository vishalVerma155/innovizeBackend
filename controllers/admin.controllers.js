const Admin = require('../models/admin.model.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const createAdmin = async () => {
    try {
        const userName = "admin";  // Change this
        const password = "admin123";        // Change this

        const existingAdmin = await Admin.findOne({ userName });
        if (existingAdmin) {
            console.log("Admin exists!");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ userName, password: hashedPassword });

        await newAdmin.save();
        console.log("Admin created successfully!");
    } catch (error) {
        console.log("Error creating admin:", error.message);
    }
};

const login = async(req, res) =>{
    try {
        const { userName, password } = req.body;

        if(!userName || userName && userName.trim() === "" || !password || password && password.trim() === ""){
            return res.status(404).json({ success: false , error : "user name or password not found " });
           }

        const admin = await Admin.findOne({ userName });
        if (!admin) {
            return res.status(400).json({ message: "Invalid userName or password" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid userName or password" });
        }

        
        const accessToken = jwt.sign({ _id: admin._id, userName : admin.userName }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        

        res.cookie("AccessToken", accessToken); // set jwt token in cookies


       return res.status(200).json({ message: "Login successful", token : accessToken, admin});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

}

const getAdmin = async(req, res) =>{
   
    try {
        const adminId = req.user._id;
        const admin = await Admin.findById(adminId).select("-password");

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

      return  res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {login, getAdmin};
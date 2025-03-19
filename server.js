const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');


// Load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : "*"}));

// DB connection
const dbconnect = require('./config/database.js');

// routes
const router = require('./routes/routes.js');

app.use("/innovize", router);


// Start the server
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
    dbconnect(); // call database
});

// Default route
app.get('/', (req, res) => {
    res.send("Default Route");
});
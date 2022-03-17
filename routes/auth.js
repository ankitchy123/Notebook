const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fetchuser = require('../middleware/fetchUser')

// ROUTE 1: Create a user using : POST "/api/auth/createuser". No login required
router.post('/createuser', async (req, res) => {
    try {
        // Check whether the user with this email exists already
        let success = false
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({ success, error: "Please enter a unique username" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            username: req.body.username,
            password: secPass
        })

        const data = {
            user: {
                id: user._id,
                name: user.name
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.status(200).json({ success, authToken });
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2: Authenticate a user using: POST "/api/auth/login"
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        let success = false;
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success, "error": "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, "error": "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;

        res.json({ success, authToken });
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

// ROUTE 3: Get logged in user details: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

module.exports = router;
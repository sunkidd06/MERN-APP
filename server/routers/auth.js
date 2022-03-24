const express = require('express');
const router = express.Router();
const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');

// @route GET api/auth
// @desc Check if user is logged in
// @acces Public 

router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: 'User is not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.log("user not found");
    }

})
// @router POST api/auth/register
// @desc Register user 
// @acess Public
// because communicate with database so we use async function

router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    // Simple validation 
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing username or password' });
    }
    try {
        // check for existing user 
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ success: false, message: 'Username already in use' });
        }
        // after check all, we will hash  password by argon2
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        // RETURN token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            message: 'user created successfully',
            accessToken
        })
    } catch (error) {
        console.log("Server is not responding");
        res.status(500).json({ success: false, message: error.message });
    }
})
// @router POST api/auth/register
// @desc LOGIN user 
// @access Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing username or password' });
    }
    try {
        // Check for existing username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(500).json({ success: false, message: 'Incorrect username or password' });
        }
        // User found
        const passwordVerified = await argon2.verify(user.password, password);
        if (!passwordVerified) {
            return res.status(400).json({ success: false, message: 'Incorrect username or password' })
        }
        // RETURN token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            message: 'user logged successfully',
            accessToken
        })
    } catch (error) {
        console.log("Server is not responding");
        res.status(500).json({ success: false, message: error.message });
    }
})
module.exports = router;
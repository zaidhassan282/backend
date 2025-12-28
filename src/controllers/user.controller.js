import {User} from "../models/user.model.js"

const registerUser = async (req, res) => { 
    try {
        const {username, email, password} = req.body;

        // basic validation
        if (!username || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        // check for existing user
        const existingUser = await User.findOne({email: email.toLowerCase()});
        if (existingUser) {
            return res.status(400).json({message: "Email already in use"});
        }

        //create new user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
            });
        res.status(201).json({message: "User registered successfully", user:{ id: user._id, email: user.email, username: user.username}});
    } catch (error) {
        res.status(500).json({message: "Error registering user", error: error.message});
    }   
}

const loginUser = async (req, res) => {
    // Login logic to be implemented
    try {
        //checking if the user exists and password matches
        const {email, password} = req.body;

        const user = await User.findOne({email: email.toLowerCase()});
        if (!user) return res.status(400).json({message: "User not found"});

        //compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({message: "Invalid email or password"});
        
        
        res.status(200).json({message: "Login successful", user: {id: user._id, email: user.email, username: user.username}});
    } catch (error) {
        res.status(500).json({message: "Error logging in user", error: error.message});
    }
}


const logoutUser = async (req, res) => {
    // Logout logic to be implemented
    try {
        const {email} = req.body;

        const user = await User.findOne({email: email.toLowerCase()});
        if (!user) return res.status(400).json({message: "User not found"});

        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        res.status(500).json({message: "Error logging out user", error: error.message});
    }
}

export {registerUser, loginUser, logoutUser};
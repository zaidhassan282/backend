import {Post} from "../models/post.model.js";


const createPost = async (req, res) => {
    try {
        const {name, description, age} = req.body;

        // basic validation
        if (!name || !description || !age) {
            return res.status(400).json({message: "All fields are required"});
        }
        //create new post
        const post = await Post.create({
            name,
            description,
            age,
        });
        res.status(201).json({message: "Post created successfully", post});
    }
    catch (error) {
        res.status(500).json({message: "Error creating post", error: error.message});
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({posts});
    } catch (error) {
        res.status(500).json({message: "Error fetching posts", error: error.message});
    }
}


const updatePost = async (req, res) => {
    try {
        //basic validation to check
        if(Object.keys(req.body).length===0){
            return res.status(400).json({message: "No data provided to update"});
        }
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});

            if(!post){
                return res.status(404).json({message: "Post not found"});
            }
        res.status(200).json({message: "Post updated successfully", post});
    }catch (error) {
        res.status(500).json({message: "Error creating post", error: error.message});
    }
}

const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json({message: "Post deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error deleting post", error: error.message});
    }
}

export {createPost, getPosts, updatePost, deletePost};
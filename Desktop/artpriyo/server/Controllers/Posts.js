const Post = require("../model/Posts");
const User = require("../model/User");

exports.createPost = async (req, res) => {
    try {
        const userId = req.registeredUser.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User id required"
            })
        }
        const reqBody = req.body;
        const { description, media } = reqBody;
        if (!description || !media) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        const newPost = new Post({
            description: description,
            media: media
        })
        const savedPost = await newPost.save();
        const updateUser = await User.findByIdAndUpdate(userId, { $push: { posts: savedPost._id } },{new:true}).populate("posts")
        return res.status(201).json({
            success: true,
            message: "Post created Successfully",
            post: savedPost,
            user: updateUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

exports.fetchAllPosts = async (req, res) => {
    try {
        const userId = req.registeredUser.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id required"
            })
        }
        const posts = await Post.find({ isBlocked: false });
        return res.status(200).json({
            success: true,
            totalPosts:posts.length,
            posts: posts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

exports.deletePost = async(req,res) =>{
    try {
        const userId = req.registeredUser.id;
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User id required"
            })
        }
        const reqBody = req.body;
        const {postId} = reqBody;
        if(!postId){
            return res.status(400).json({
                success: false,
                message: "For Deletion Post id required"
            })
        }
        const post = await Post.findById(postId);
        if(!post){
            return res.status(400).json({
                success: false,
                message: "Post is not found"
            })
        }
        await Post.findByIdAndDelete(postId);
        await User.findByIdAndUpdate(userId,{$pull:{post:postId}},{new:true}).populate("posts");
        return res.status(200).json({
            success: false,
            message: "Post is deleted succesfully"
        })
    } catch (error) {
          return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

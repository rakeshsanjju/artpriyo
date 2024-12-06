const Post = require("../model/Posts");

exports.postLike = async (req, res) => {
    try {
        const userId = req.registeredUser.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id required"
            })
        }
        const reqBody = req.body;
        const { postId } = reqBody;
        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post Id is required"
            })
        }
        const post = await Post.findById(postId);
        const alreadyLiked = post.likes.includes(userId);
        if (alreadyLiked) {
            return res.status(400).json({
                success: false,
                message: "You have already liked this post"
            });
        }
        const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true });
        return res.status(200).json({
            success: true,
            message: "Post liked successfully",
            likes: updatedPost.likes.length
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

exports.removeLike = async (req, res) => {
    try {
        const userId = req.registeredUser.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id required"
            })
        }
        const reqBody = req.body;
        const { postId } = reqBody;
        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post Id is required"
            })
        }
        const post = await Post.findById(postId);
        const alreadyLiked = post.likes.includes(userId);
        if (!alreadyLiked) {
            return res.status(400).json({
                success: false,
                message: "You have already disliked this post"
            });
        }
        const updatedPost = await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true });
        return res.status(200).json({ 
            success: true,
            message: "Post disliked successfully",
            likes: updatedPost.likes.length
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

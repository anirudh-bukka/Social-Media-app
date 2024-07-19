import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE A POST
    //  This is going to handle the function creted in index.js file, which will have an image pass throught the middleware.
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        });
        await newPost.save(); // to save it to MongoDB --> The frontend has updated data now.
        const post = await Post.find(); // after saving the post, we make sure to grab ALL THE POSTS, then we can return 
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

// READ
    // GET EVERYONE'S POSTS
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

// UPDATE
export const likePost = async (req, res) => {
    try {
        const { id } = req.params; // `id` comes from the query string. 
        const { userId } = req.body; // `userId` comes from the body of the request.
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked) {
            post.likes.delete(userId); // if the post is liked, it is deleted
        } else {
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes : post.likes },
            { new: true }
        );
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(404).json({ msg: error });
    }
}

// export default { createPost, getFeedPosts, getUserPosts, likePost };
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts); // grabs the posts from the store/store-list.
    const token = useSelector((state) => state.token);

    /* we will make 2 different API calls here, because - 
        1. PostsWidget will grab all the posts to homepage from anybody (regarding `getFeedPosts` in "/routes/posts.js").
        2. The other API will get posts only of a particular user (when clicked on) - `getUserPosts` in "/routes/posts.js".
    */

    const getPosts = async() => {
        const response = await fetch(`http://localhose:3001/posts`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.json();
        dispatch(setPosts({ posts: data })); // set the posts/values inside the store.
    }

    const getUserPosts = async() => {
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts}`, 
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.json();
        dispatch(setPosts({ posts: data }));
    }

    useEffect(() => {
        if(isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps 

    return (
        <>
            {posts.map(
                ({ _id, userId, firstName, lastName, description, location, picturePath, userPicturePath, likes, comments }) => (
                    <PostWidget
                        _id = {_id}
                        userId = {_id}
                        name = {`${firstName} ${lastName}`}
                        description = {description}
                        location = {location}
                        picturePath = {picturePath}
                        userPicturePath = {userPicturePath}
                        likes = {likes}
                        comments = {comments}
                    />
                )
            )}
        </>
    )

};

export default PostsWidget;
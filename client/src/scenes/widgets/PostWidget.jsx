import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;















// import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
// import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
// import FlexBetween from "components/FlexBetween";
// import Friend from "components/Friend";
// import WidgetWrapper from "components/WidgetWrapper";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPost } from "state";

// const PostWidget =({ postId, postUserId, name, description, location, picturePath, userPicturePath, likes, comments }) => {
//     const dispatch = useDispatch();
//     const token = useSelector((state) => state.token);
    
//     const { palette } = useTheme();
//     const main = palette.neutral.main;
//     const primary = palette.primary.main;

//     const[isComments, setIsComments] = useState(false); // comments bar is closed initially
//     const loggedInUserId = useSelector((state) => state.user._id);
//     const isLiked = Boolean(likes[loggedInUserId]); /* in backend (in "models/User.js", we have set "likes" to the type of map and 'of' of Boolean) 
//                                                         what this means is that, we have "likes" as an object that looks like:- likes={"userid1":true, "userid2":true}*/

//     // You have to keep a track of "WHO" liked post(s), and not just keep a count of likes because you won't know if a particular person liked the post or not
//     const likeCount = Object.keys(likes).length; // keys are unique, they won't be repeated. Count keys = correct number of likes.

//     const patchLike = async() => {
//         const response = await fetch(`http://localhost:3001/posts/${postId}/like`,
//         {
//             method: "PATCH",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ userId: loggedInUserId })
//         });

//         const updatedPost = await response.json();
//         dispatch(setPost({ post: updatedPost }));   
//     };

//     return (

//         <WidgetWrapper m="2rem 0">
//       <Friend
//         friendId={postUserId}
//         name={name}
//         subtitle={location}
//         userPicturePath={userPicturePath}
//       />
//       <Typography color={main} sx={{ mt: "1rem" }}>
//         {description}
//       </Typography>
//       {picturePath && (
//         <img
//           width="100%"
//           height="auto"
//           alt="post"
//           style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
//           src={`http://localhost:3001/assets/${picturePath}`}
//         />
//       )}
//       <FlexBetween mt="0.25rem">
//         <FlexBetween gap="1rem">
//           <FlexBetween gap="0.3rem">
//             <IconButton onClick={patchLike}>
//               {isLiked ? (
//                 <FavoriteOutlined sx={{ color: primary }} />
//               ) : (
//                 <FavoriteBorderOutlined />
//               )}
//             </IconButton>
//             <Typography>{likeCount}</Typography>
//           </FlexBetween>

//           <FlexBetween gap="0.3rem">
//             <IconButton onClick={() => setIsComments(!isComments)}>
//               <ChatBubbleOutlineOutlined />
//             </IconButton>
//             <Typography>{comments.length}</Typography>
//           </FlexBetween>
//         </FlexBetween>

//         <IconButton>
//           <ShareOutlined />
//         </IconButton>
//       </FlexBetween>
//       {isComments && (
//         <Box mt="0.5rem">
//           {comments.map((comment, i) => (
//             <Box key={`${name}-${i}`}>
//               <Divider />
//               <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
//                 {comment}
//               </Typography>
//             </Box>
//           ))}
//           <Divider />
//         </Box>
//       )}
//     </WidgetWrapper>



//         // <WidgetWrapper m="2rem 0">
//         //     <Friend 
//         //         friendId={postId}
//         //         name={name}
//         //         subtitle={location}
//         //         userPicturePath={userPicturePath}
//         //     />
//         //     <Typography color={main} sx={{ mt: "1rem" }}>{description}</Typography>
//         //     {picturePath && (
//         //         <img
//         //             width="100%"
//         //             height="auto"
//         //             alt="post"
//         //             style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
//         //             src={`http://localhost:3001/assets/${picturePath}`}
//         //         />
//         //     )}
//         //     <FlexBetween mt="0.25rem">
//         //         <FlexBetween gap="1rem">
//         //             <FlexBetween gap="0.3rem">
//         //                 <IconButton onClick={patchLike}>
//         //                     {isLiked ? (
//         //                         <FavoriteOutlined sx={{ color: primary }} />
//         //                     ) : (
//         //                         <FavoriteBorderOutlined />
//         //                     )}
//         //                 </IconButton>
//         //                 <Typography>{likeCount}</Typography>
//         //             </FlexBetween>
//         //             <FlexBetween gap="0.3rem">
//         //                 <IconButton onClick={() => setIsComments(!isComments)}>
//         //                     <ChatBubbleOutlineOutlined />
//         //                 </IconButton>
//         //                 <Typography>{comments.length}</Typography>
//         //             </FlexBetween>
//         //         </FlexBetween>

//         //         <IconButton>
//         //             <ShareOutlined />
//         //         </IconButton>
//         //     </FlexBetween>
//         //     {isComments && (
//         //         <Box mt="0.5rem">
//         //             {comments.map((comment, i) => (
//         //                 <Box key={`${name}-${i}`}> {/*We do this to make this unique, as many people can have same name. */}
//         //                     <Divider />
//         //                     <Typography sx={{color: main, m: "0.5rem 0", pl: "1rem"}}>
//         //                         {comment}
//         //                     </Typography>
//         //                 </Box>
//         //             ))}
//         //             <Divider />
//         //         </Box>
//         //     )}
//         // </WidgetWrapper>
//     );
// };

// export default PostWidget;
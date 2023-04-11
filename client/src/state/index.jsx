import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;












// import { createSlice } from "@reduxjs/toolkit";

// const initialState = { // this data will be accessible throughout entire app --> we don't have to explicitly pass in state and components
//     mode: "light",
//     user: null, 
//     token: null,
//     posts: [] // include all the posts.
// }

// export const authSlice = createSlice ({
//     name: "auth", // to represent the auth workflow
//     initialState, // we are passing initial state into initial state
//     reducers: { //functions/actions that involve modifying the global state.
//         setMode: (state) => {
//             state.mode = state.mode === "light" ? "dark" : "light";
//         },
//         setLogin: (state, action) => { 
//             state.user = action.payload.user;
//             state.token = action.payload.token;
//         }, 
//         setLogout: (state) => {
//             state.user = null;
//             state.token = null;
//         }, 
//         setFriends: (state, action) => { // we need to set this in local state, because we need to keep this information.
//             if(state.user) { // if the user already exists:
//                 state.user.friends = action.payload.friends;
//             } else {
//                 console.error("User friends non-existent.");
//             }
//         },
//         setPosts: (state, action) => {
//             state.posts = action.payload.posts;
//         }, 
//         setPost: (state, action) => { // updating a post
//             const updatedPosts = state.posts.map((post) => {
//                 if(post._id === action.payload.post._id)
//                     return action.payload.post;
//                 return post;
//             });
//             state.posts = updatedPosts;
//         }
//     }
// })

// export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
// export default authSlice.reducer;
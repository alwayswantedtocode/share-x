import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
  error: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    setupdatePosts: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setPostLikes(state, action) {
      const { post_id, likes } = action.payload;
      const post = state.posts.find((post) => post._id === post_id);
      if (post) {
        post.Likes = likes;
      }
      state.loading = false;
    },
    setPostcomments: (state, action) => {
      const { post_id, comments } = action.payload;
      const post = state.posts.find((post) => post._id === post_id);
      if (post) {
        post.Comments = comments; // Replace comments array with updated data
      }
      state.loading = false;
    },
      setCommentLikes: (state, action) => {
         const { post_id, comment_id, likes } = action.payload;
         const post = state.posts.find((post) => post._id === post_id);
         if (post) {
           const comment = post.comments.find(
             (comment) => comment._id === comment_id
           );
           if (comment) {
             comment.likes = likes; 
           }
         }
         state.loading = false;
    },
    // setupdateComments: (state, action) => {
    //   const updatedComments = state.comments.map((comment) => {
    //     if (comment._id === action.payload.comment_id)
    //       return action.payload.post;
    //     return comment;
    //   });
    //   state.comments = updatedComments;
    // },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload && action.payload.length === 0;
    },
    removePost: (state) => {
      state.posts = [];
      state.loading = false;
      state.error = false;
    },
  },
});
export const {
  setLoading,
  setPost,
  setPosts,
  setupdatePosts,
  setPostLikes,
  setPostcomments,
  setCommentLikes,
  setError,
  removePost,
} = postSlice.actions;

export default postSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   posts: [],
//   comments: [],
//   loading: false,
//   error: false,
// };

// export const postSlice = createSlice({
//   name: "post",
//   initialState,
//   reducers: {
//     setLoading: (state) => {
//       state.loading = true;
//     },
//     setPosts: (state, action) => {
//       state.posts = action.payload;
//     },

//     setupdatePosts: (state, action) => {
//       const updatedPosts = state.posts.map((post) => {
//         if (post._id === action.payload.post_id) return action.payload.post;
//         return post;
//       });
//       state.posts = updatedPosts;
//     },
//     setLikes(state, action) {
//       const { post_id, likes } = action.payload;
//       const post = state.posts.find((post) => post._id === post_id);
//       if (post) {
//         post.Likes = likes; // Update the likes for the specific post
//       }
//       state.loading = false;
//     },
//     setComments: (state, action) => {
//        const { post_id, comments } = action.payload;
//       const post = state.posts.find((post) => post._id === post_id);
      
//      if(post){
//       post.Comments=comments

//       }
//       state.loading = false;
//     },
//       setCommentLikes: (state, action) => {
//        const { comment_id, commentLikes } = action.payload;
//       const post = state.posts.find((post) => post._id === post_id);
      
//        const comments =state.post.Comments.find((comment)=>comment._id===comment_id)
//       if(comments){
// comments.Likes =commentLikes
//       }
//       state.loading = false;
//     },
//     setupdateComments: (state, action) => {
//       const updatedComments = state.comments.map((comment) => {
//         if (comment._id === action.payload.comment_id)
//           return action.payload.post;
//         return comment;
//       });
//       state.comments = updatedComments;
//     },
//     setError: (state, action) => {
//       state.loading = false;
//       state.error = action.payload && action.payload.length === 0;
//     },
//     removePost: (state) => {
//       state.posts = [];
//       state.comments = [];
//       state.likes = false;
//       state.loading = false;
//       state.error = false;
//     },
//   },
// });
// export const {
//   setLoading,
//   setPost,
//   setPosts,
//   setupdatePosts,
//   setComments,
//   setupdateComments,
//   setLikes,
//   setError,
//   removePost,
// } = postSlice.actions;

// export default postSlice.reducer;
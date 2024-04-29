import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  comments: [],
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
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setupdateComments: (state, action) => {
      const updatedComments = state.comments.map((comment) => {
        if (comment._id === action.payload.comment_id)
          return action.payload.post;
        return comment;
      });
      state.comments = updatedComments;
    },
    setError: (state, action) => {
       state.loading = false;
       state.error = action.payload && action.payload.length === 0;
    },
    removePost: (state) => {
      state.posts = [];
      state.comments = [];
      state.likes = false;
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
  setComments,
  setupdateComments,
  setLikes,
  setError,
  removePost,
} = postSlice.actions;

export default postSlice.reducer;

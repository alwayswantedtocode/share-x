import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  // feedsId: {},
  // likes: false,
  comments: [],
  // token: null,
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
    // setLikes: (state, action) => {
    //   state.likes = true;
    // },
    removePost: (state) => {
      state.posts = [];
      state.likes = false;
      state.loading = false;
      state.error = false;
    },
  },
});
export const {setLoading, setPost, setPosts, setLikes, removePost } =
  postSlice.actions;

export default postSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  usersPosts: [],
  token: null,
  loading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },

    setUsers: (state, action) => {
      state.users = action.payload;
      state.token = action.payload.token;
    },
    setUsersPost: (state, action) => {
      state.usersPosts = action.payload;
    },
    removeUsers: (state) => {
      state.users = null;
      state.usersPosts = [];
      state.follow = [];
      state.token = null;
      state.loading = false;
      state.error = false;
    },
  },
});
export const {
  setLoading,
  setUsers,
  setUsersPost,
  removeUsers,
} = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token: null,
  loading: false,
  error: false,
  follow: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.token = action.payload.token;
    },

    setUsers: (state, action) => {
      state.currentUser = action.payload;
      state.token = action.payload.token;
    },

    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    followUser: (state, action) => {
      state.follow.push(action.payload);
      //  if (state.currentUser.followers.includes(action.payload)) {
      //    state.currentUser.followers.splice(
      //      state.currentUser.followers.findIndex(
      //        (userId) => userId === action.payload
      //      ),
      //      1
      //    );
      //  } else {
      //    state.currentUser.followers.push(action.payload);
      //  }
    },
    unfollowUser: (state, action) => {
      state.follow = state.follow.filter((user) => user !== action.payload);
    },
    setError: (state) => {
      state.loading = false;
      state.error = true;
    },

    setLogout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.followedUsers = [];
      state.loading = false;
      state.error = false;
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  setUsers,
  loginFailure,
  setError,
  setLogout,
  followUser,
  unfollowUser,
} = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  friendUser: null,
  token: null,
  loading: false,
  error: false,
  follow: [],
  unreadNotice: [],
  readNotice:[]
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
    // followUser: (state, action) => {
    //   state.follow.push(action.payload);

    // },
    // unfollowUser: (state, action) => {
    //   state.follow = state.follow.filter((user) => user !== action.payload);
    // },

    followUser: (state, action) => {
      const { updatedCounts } = action.payload;

      // Update current user's following count
      if (state.currentUser?._id === updatedCounts.currentUser._id) {
        state.currentUser.followingsCount =
          updatedCounts.currentUser.followingsCount;
      }

      // Update friend's followers count
      if (state.friendUser?._id === updatedCounts.friendUser._id) {
        state.friendUser.followersCount =
          updatedCounts.friendUser.followersCount;
      }
    },

    // Unfollow user
    unfollowUser: (state, action) => {
      const { updatedCounts } = action.payload;

      // Update current user's following count
      if (state.currentUser?._id === updatedCounts.currentUser._id) {
        state.currentUser.followingsCount =
          updatedCounts.currentUser.followingsCount;
      }

      // Update friend's followers count
      if (state.friendUser?._id === updatedCounts.friendUser._id) {
        state.friendUser.followersCount =
          updatedCounts.friendUser.followersCount;
      }
    },

    // Set the friendUser in the Redux state
    setFriendUser: (state, action) => {
      state.friendUser = action.payload;
    },

    setUnreadNotice: (state, action) => {
      state.unreadNotice = action.payload;
    },
    setreadNotice: (state, action) => {
      state.readNotice = action.payload;
    },
    // setUpdateNotification:(state,action)=>{
    // const updateNotification = state.notification.map((alert)=>{
    // if(alert._id=== action.payload.alert_id) return action.payload.alert;
    // return post;
    // }
    // state.notification= updateNotification;
    // }

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
  setFriendUser,
  unreadNotice,
  readNotice,
  setUnreadNotice,
  setreadNotice,
  loginFailure,
  setError,
  setLogout,
  followUser,
  unfollowUser,
} = authSlice.actions;

export default authSlice.reducer;

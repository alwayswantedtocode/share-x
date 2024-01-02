export const postActions = {
  SUBMIT_POST: "SUBMIT_POST",
  FETCH_POST: "FETCH_POST",
  HANDLE_ERROR: "HANDLE_ERROR",
  ADD_LIKES: "ADD_LIKES",
  ADD_COMMENTS: "ADD_COMMENTS",
};

export const initialPostState = {
  error: false,
  posts: [],
  likes: [],
  comments: [],
};

export const postReducer = (state, action) => {
  switch (action.type) {
    case postActions.SUBMIT_POST:
      return {
        ...state,
        error: false,
        posts: action.posts,
      };
    case postActions.FETCH_POST:
      return {
        ...state,
        error: false,
        posts: action.posts,
      };
    case postActions.HANDLE_ERROR:
      return {
        ...state,
        error: true,
        posts: [],
      };
    case postActions.ADD_LIKES:
      return {
        ...state,
        error: false,
        likes: action.likes,
      };
    case postActions.ADD_COMMENTS:
      return {
        ...state,
        error: false,
        comments: action.comments,
      };
    default:
      return state;
  }
};

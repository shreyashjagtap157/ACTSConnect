import { userApi } from "../../config/api";
import { showToast } from "../../config/toast";
import { CREATE_POST_FAILUER, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILUER, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILUER, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILUER, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, SAVE_POST_FAILUER, SAVE_POST_REQUEST, SAVE_POST_SUCCESS } from "./post.actionType";

// Create Post
export const createPost = (postData) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });
  try {
    const { data } = await userApi.createPost(postData);
    if (data.success) {
      dispatch({ type: CREATE_POST_SUCCESS, payload: data.data });
      showToast("Post created successfully!", "success");
    } else {
      dispatch({ type: CREATE_POST_FAILUER, payload: data.message || "Failed to create post" });
      showToast(data.message || "Failed to create post", "error");
    }
  } catch (error) {
    dispatch({ type: CREATE_POST_FAILUER, payload: error.message || "Network error" });
    showToast(error.message || "Network error", "error");
  }
};

// Get All Posts
export const getAllPost = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });
  try {
    const { data } = await userApi.getPosts();
    if (data.success) {
      dispatch({ type: GET_ALL_POST_SUCCESS, payload: data.data.posts });
    } else {
      dispatch({ type: GET_ALL_POST_FAILUER, payload: data.message || "Failed to fetch posts" });
      showToast(data.message || "Failed to fetch posts", "error");
    }
  } catch (error) {
    dispatch({ type: GET_ALL_POST_FAILUER, payload: error.message || "Network error" });
    showToast(error.message || "Network error", "error");
  }
};

// Get User's Posts (if needed)
export const getUsersPost = (userId) => async (dispatch) => {
  dispatch({ type: GET_USERS_POST_REQUEST });
  try {
    // Not implemented in backend, placeholder
    dispatch({ type: GET_USERS_POST_SUCCESS, payload: [] });
  } catch (error) {
    dispatch({ type: GET_USERS_POST_FAILUER, payload: error.message || "Network error" });
  }
};

// Like Post (not implemented in backend, placeholder)

export const likePost = (postId) => async (dispatch) => {
  dispatch({ type: LIKE_POST_REQUEST });
  try {
    const { data } = await userApi.likePost(postId);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data.data || { id: postId } });
  } catch (error) {
    dispatch({ type: LIKE_POST_FAILUER, payload: error.message || "Network error" });
  }
};


// Save Post (not implemented in backend, placeholder)
export const savePost = (postId) => async (dispatch) => {
  dispatch({ type: SAVE_POST_REQUEST });
  try {
    // Placeholder: implement when backend supports
    dispatch({ type: SAVE_POST_SUCCESS, payload: { id: postId } });
  } catch (error) {
    dispatch({ type: SAVE_POST_FAILUER, payload: error.message || "Network error" });
  }
};
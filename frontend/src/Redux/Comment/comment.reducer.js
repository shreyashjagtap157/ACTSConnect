// reducer.js
import {
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAILURE,
    LIKE_COMMENT_REQUEST,
    LIKE_COMMENT_SUCCESS,
    LIKE_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
  } from './comment.actionType';
  
  const initialState = {
    create: false,

    likingComment: false,

    deletingComment: false,
    error: null,
    loading:false
  };
  
  const commentReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_COMMENT_REQUEST:
        return {
          ...state,
          create: false,
          error: null,
          loading:true
        };
      case CREATE_COMMENT_SUCCESS:
        return {
          ...state,
          create: true,
          error: null,
          loading:false
        };
      case CREATE_COMMENT_FAILURE:
        return {
          ...state,
          create: false,
          error: action.payload,
          loading:false
        };
      case LIKE_COMMENT_REQUEST:
      case DELETE_COMMENT_REQUEST:
        return {
          ...state,
          error: null,
          loading: true,
          likingComment: action.type === LIKE_COMMENT_REQUEST,
          deletingComment: action.type === DELETE_COMMENT_REQUEST,
        };
      case LIKE_COMMENT_SUCCESS:
        return {
          ...state,
          error: null,
          loading: false,
          likingComment: false,
        };
      case DELETE_COMMENT_SUCCESS:
        return {
          ...state,
          error: null,
          loading: false,
          deletingComment: false,
        };
      case LIKE_COMMENT_FAILURE:
      case DELETE_COMMENT_FAILURE:
        return {
          ...state,
          error: action.payload,
          loading: false,
          likingComment: false,
          deletingComment: false,
        };
      default:
        return state;
    }
  };
  
  export default commentReducer;
  
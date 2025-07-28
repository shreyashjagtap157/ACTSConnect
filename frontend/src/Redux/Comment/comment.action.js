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
import { userApi } from '../../config/api';
import { showToast } from '../../config/toast';

const createCommentRequest = () => ({ type: CREATE_COMMENT_REQUEST });
const createCommentSuccess = (comment) => ({ type: CREATE_COMMENT_SUCCESS, payload: comment });
const createCommentFailure = (error) => ({ type: CREATE_COMMENT_FAILURE, payload: error });

export const createComment = (reqData) => async (dispatch) => {
  dispatch(createCommentRequest());
  try {
    const { data } = await userApi.createComment(reqData);
    if (data.success) {
      dispatch(createCommentSuccess(data.data));
      showToast('Comment created!', 'success');
    } else {
      dispatch(createCommentFailure(data.message || 'Failed to create comment'));
      showToast(data.message || 'Failed to create comment', 'error');
    }
  } catch (error) {
    dispatch(createCommentFailure(error.message || 'Network error'));
    showToast(error.message || 'Network error', 'error');
  }
};

export const likeComment = (commentId) => async (dispatch) => {
    dispatch({type:CREATE_COMMENT_REQUEST});
  
    try {
      const {data} = await api.post(`/api/comments/${commentId}`);
      dispatch({type:CREATE_COMMENT_SUCCESS, payload:data});
    } catch (error) {
      dispatch({type:CREATE_COMMENT_FAILURE,payload:error});
    }
  };

// Similarly, create action creators for LIKE_COMMENT and DELETE_COMMENT

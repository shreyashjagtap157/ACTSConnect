import axios from "axios";
export const API_BASE_URL = 'http://localhost:5454';

// Axios instance without Authorization header
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to get latest JWT token
export function getAuthHeaders() {
  const jwtToken = localStorage.getItem("jwt");
  return jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
}

// User-related API calls matching backend endpoints
export const userApi = {
  getPosts: () => api.get('/api/user/posts', { headers: getAuthHeaders() }),
  createPost: (data) => api.post('/api/user/post/create', data, { headers: getAuthHeaders() }),
  editPost: (postId, data) => api.post(`/api/user/post/edit/${postId}`, data, { headers: getAuthHeaders() }),
  deletePost: (postId) => api.delete(`/api/user/post/delete/${postId}`, { headers: getAuthHeaders() }),
  followUser: (userId) => api.post(`/api/user/follow/${userId}`, {}, { headers: getAuthHeaders() }),
  unfollowUser: (userId) => api.post(`/api/user/unfollow/${userId}`, {}, { headers: getAuthHeaders() }),
  createComment: (data) => api.post('/api/user/comment/create', data, { headers: getAuthHeaders() }),
  likeComment: (commentId) => api.put(`/api/user/comment/like/${commentId}`, {}, { headers: getAuthHeaders() }),
  deleteComment: (commentId) => api.delete(`/api/user/comment/delete/${commentId}`, { headers: getAuthHeaders() }),
  searchUsers: (searchData) => api.post('/api/user/search', searchData, { headers: getAuthHeaders() }),
  getUser: (id) => api.get(`/api/user/${id}`, { headers: getAuthHeaders() }),
};
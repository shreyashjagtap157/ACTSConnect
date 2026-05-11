import axios from "axios";
export const API_BASE_URL = 'http://localhost:5454';

// Axios instance configured to send cookies
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User-related API calls matching backend endpoints
export const userApi = {
  getPosts: () => api.get('/api/user/posts'),
  createPost: (data) => api.post('/api/user/post/create', data),
  editPost: (postId, data) => api.post(`/api/user/post/edit/${postId}`, data),
  deletePost: (postId) => api.delete(`/api/user/post/delete/${postId}`),
  followUser: (userId) => api.post(`/api/user/follow/${userId}`, {}),
  unfollowUser: (userId) => api.post(`/api/user/unfollow/${userId}`, {}),
  createComment: (data) => api.post('/api/user/comment/create', data),
  searchUsers: (searchData) => api.post('/api/user/search', searchData),
  getUser: (id) => api.get(`/api/user/${id}`),
};

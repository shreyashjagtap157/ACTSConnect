import axios from 'axios';
import { registerUser } from './auth.action';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './auth.actionType';
import { API_BASE_URL } from '../../config/api';

jest.mock('axios');

describe('Auth Actions - registerUser', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    jest.clearAllMocks();

    // Mock localStorage using Storage prototype
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  afterEach(() => {
    // Restore the mocks
    jest.restoreAllMocks();
  });

  it('dispatches REGISTER_REQUEST immediately', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    const userData = { email: 'test@example.com', password: 'password123' };
    const thunk = registerUser(userData);

    // We start the thunk but don't await it yet to check initial dispatch
    thunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: REGISTER_REQUEST });
  });

  it('dispatches REGISTER_SUCCESS and sets localStorage when API returns user with jwt', async () => {
    const mockUser = { id: 1, email: 'test@example.com', jwt: 'fake-jwt-token' };
    axios.post.mockResolvedValueOnce({ data: mockUser });

    const userData = { email: 'test@example.com', password: 'password123' };

    await registerUser(userData)(dispatch);

    // Check axios call
    expect(axios.post).toHaveBeenCalledWith(`${API_BASE_URL}/auth/signup`, userData);

    // Check localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('jwt', 'fake-jwt-token');

    // Check final dispatch
    expect(dispatch).toHaveBeenCalledWith({
      type: REGISTER_SUCCESS,
      payload: mockUser
    });
  });

  it('dispatches REGISTER_SUCCESS but does not set localStorage when API returns user without jwt', async () => {
    const mockUser = { id: 1, email: 'test@example.com' };
    axios.post.mockResolvedValueOnce({ data: mockUser });

    const userData = { email: 'test@example.com', password: 'password123' };

    await registerUser(userData)(dispatch);

    // Check axios call
    expect(axios.post).toHaveBeenCalledWith(`${API_BASE_URL}/auth/signup`, userData);

    // Check localStorage is NOT called
    expect(localStorage.setItem).not.toHaveBeenCalled();

    // Check final dispatch
    expect(dispatch).toHaveBeenCalledWith({
      type: REGISTER_SUCCESS,
      payload: mockUser
    });
  });

  it('dispatches REGISTER_FAILURE when API call fails', async () => {
    const errorMessage = 'Network Error';
    axios.post.mockRejectedValueOnce(new Error(errorMessage));

    const userData = { email: 'test@example.com', password: 'password123' };

    await registerUser(userData)(dispatch);

    // Check axios call
    expect(axios.post).toHaveBeenCalledWith(`${API_BASE_URL}/auth/signup`, userData);

    // Check final dispatch
    expect(dispatch).toHaveBeenCalledWith({
      type: REGISTER_FAILURE,
      payload: errorMessage
    });
  });
});

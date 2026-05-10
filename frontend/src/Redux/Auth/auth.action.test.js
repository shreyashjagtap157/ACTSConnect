import axios from 'axios';
import { loginUser } from './auth.action';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './auth.actionType';
import { API_BASE_URL } from '../../config/api';

jest.mock('axios');

describe('loginUser action', () => {
  let dispatch;
  let mockLocalStorage;

  beforeEach(() => {
    dispatch = jest.fn();
    mockLocalStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch LOGIN_REQUEST and LOGIN_SUCCESS, set token, and navigate on successful login', async () => {
    const mockUser = { jwt: 'fake-jwt-token', id: 1, name: 'Test User' };
    axios.post.mockResolvedValueOnce({ data: mockUser });

    const loginData = {
      data: { email: 'test@example.com', password: 'password123' },
      navigate: jest.fn()
    };

    const thunk = loginUser(loginData);
    await thunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: LOGIN_REQUEST });
    expect(axios.post).toHaveBeenCalledWith(`${API_BASE_URL}/auth/signin`, loginData.data);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('jwt', mockUser.jwt);
    expect(loginData.navigate).toHaveBeenCalledWith('/');
    expect(dispatch).toHaveBeenCalledWith({ type: LOGIN_SUCCESS, payload: mockUser });
  });

  it('should dispatch LOGIN_SUCCESS but not set token or navigate if jwt is missing', async () => {
    const mockUser = { id: 1, name: 'Test User' }; // No jwt
    axios.post.mockResolvedValueOnce({ data: mockUser });

    const loginData = {
      data: { email: 'test@example.com', password: 'password123' },
      navigate: jest.fn()
    };

    const thunk = loginUser(loginData);
    await thunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: LOGIN_REQUEST });
    expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    expect(loginData.navigate).not.toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({ type: LOGIN_SUCCESS, payload: mockUser });
  });

  it('should dispatch LOGIN_FAILURE on error', async () => {
    const errorMessage = 'Network Error';
    axios.post.mockRejectedValueOnce(new Error(errorMessage));

    const loginData = {
      data: { email: 'test@example.com', password: 'password123' },
      navigate: jest.fn()
    };

    const thunk = loginUser(loginData);
    await thunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: LOGIN_REQUEST });
    expect(dispatch).toHaveBeenCalledWith({ type: LOGIN_FAILURE, payload: errorMessage });
  });
});

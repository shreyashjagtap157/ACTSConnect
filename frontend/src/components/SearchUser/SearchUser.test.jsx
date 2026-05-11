import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch, useSelector } from 'react-redux';
import SearchUser from './SearchUser';
import { searchUser } from '../../Redux/Auth/auth.action';

// Mock Redux hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock the action creator
jest.mock('../../Redux/Auth/auth.action', () => ({
  searchUser: jest.fn(),
}));

describe('SearchUser Component', () => {
  const mockDispatch = jest.fn();
  const mockHandleClick = jest.fn();

  const defaultAuthState = {
    loading: false,
    error: null,
    searchResult: [],
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((selector) => selector({ auth: defaultAuthState }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the search input', () => {
    render(<SearchUser handleClick={mockHandleClick} />);
    const inputElement = screen.getByPlaceholderText(/search user.../i);
    expect(inputElement).toBeInTheDocument();
  });

  test('shows validation error when input is less than 2 characters', () => {
    render(<SearchUser handleClick={mockHandleClick} />);
    const inputElement = screen.getByPlaceholderText(/search user.../i);

    act(() => {
      userEvent.type(inputElement, 'a');
    });

    const errorElement = screen.getByText('Enter at least 2 characters to search.');
    expect(errorElement).toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('dispatches searchUser action and clears validation error on valid input', () => {
    searchUser.mockReturnValue({ type: 'SEARCH_USER_MOCK' });
    render(<SearchUser handleClick={mockHandleClick} />);
    const inputElement = screen.getByPlaceholderText(/search user.../i);

    // Type 'a' first to trigger the validation error
    act(() => {
      userEvent.type(inputElement, 'a');
    });
    expect(screen.getByText('Enter at least 2 characters to search.')).toBeInTheDocument();

    // Type more characters to make it valid
    act(() => {
      userEvent.type(inputElement, 'bc');
    });

    // The error should disappear
    expect(screen.queryByText('Enter at least 2 characters to search.')).not.toBeInTheDocument();

    // The dispatch should have been called
    expect(mockDispatch).toHaveBeenCalled();
    // It's called three times during typing: 'a' (no dispatch), 'ab' (dispatch), 'abc' (dispatch)
    expect(searchUser).toHaveBeenCalledWith('ab');
    expect(searchUser).toHaveBeenCalledWith('abc');
  });

  test('displays loading state correctly', () => {
    useSelector.mockImplementation((selector) => selector({
      auth: { ...defaultAuthState, loading: true }
    }));

    render(<SearchUser handleClick={mockHandleClick} />);

    const loadingElement = screen.getByText('Searching...');
    expect(loadingElement).toBeInTheDocument();
  });

  test('displays error state correctly', () => {
    const errorMessage = 'Network error occurred';
    useSelector.mockImplementation((selector) => selector({
      auth: { ...defaultAuthState, error: errorMessage }
    }));

    render(<SearchUser handleClick={mockHandleClick} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  test('displays search results when available', () => {
    const mockUsers = [
      { id: 1, firstName: 'John', lastName: 'Doe', image: 'avatar1.jpg' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', image: 'avatar2.jpg' },
    ];

    useSelector.mockImplementation((selector) => selector({
      auth: { ...defaultAuthState, searchResult: mockUsers }
    }));

    render(<SearchUser handleClick={mockHandleClick} />);
    const inputElement = screen.getByPlaceholderText(/search user.../i);

    // Type to set username and trigger the results rendering condition
    act(() => {
      userEvent.type(inputElement, 'test');
    });

    const user1Element = screen.getByText('John Doe');
    const user2Element = screen.getByText('Jane Smith');

    expect(user1Element).toBeInTheDocument();
    expect(user2Element).toBeInTheDocument();

    const username1Element = screen.getByText('@john_doe');
    expect(username1Element).toBeInTheDocument();
  });

  test('calls handleClick and clears username on clicking a search result', () => {
    const mockUsers = [
      { id: 1, firstName: 'John', lastName: 'Doe', image: 'avatar1.jpg' }
    ];

    useSelector.mockImplementation((selector) => selector({
      auth: { ...defaultAuthState, searchResult: mockUsers }
    }));

    render(<SearchUser handleClick={mockHandleClick} />);
    const inputElement = screen.getByPlaceholderText(/search user.../i);

    // Type to set username and show results
    act(() => {
      userEvent.type(inputElement, 'test');
    });

    const userResult = screen.getByText('John Doe');

    // Click the result
    act(() => {
      fireEvent.click(userResult);
    });

    // Verify handleClick is called with the user ID
    expect(mockHandleClick).toHaveBeenCalledWith(1);

    // Verify results are hidden (username state is cleared)
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });
});

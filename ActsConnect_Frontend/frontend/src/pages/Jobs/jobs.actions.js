import { createAsyncThunk } from '@reduxjs/toolkit';

// Define async thunk
export const createJobPosting = createAsyncThunk(
  'jobs/createJobPosting',
  async (jobData, { rejectWithValue }) => {
    try {
      // Replace this with your actual API call
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });
      if (!response.ok) {
        throw new Error('Failed to create job posting');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getJobPostings = createAsyncThunk(
  'jobs/getJobPostings',
  async (_, { rejectWithValue }) => {
    try {
      // Replace this with your actual API call
      const response = await fetch('/api/jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch job postings');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

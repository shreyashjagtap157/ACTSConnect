import { createReducer } from '@reduxjs/toolkit';
import { createJobPosting, getJobPostings } from './jobs.actions';

const initialState = {
  jobPostings: [],
  isLoading: false,
  error: null,
};

const jobsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getJobPostings.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getJobPostings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobPostings = action.payload;
    })
    .addCase(getJobPostings.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(createJobPosting.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createJobPosting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobPostings.push(action.payload);
    })
    .addCase(createJobPosting.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});

export default jobsReducer;

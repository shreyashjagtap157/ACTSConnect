import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="flex justify-center items-center py-10">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-3"></div>
    <span className="text-lg text-blue-600">{message}</span>
  </div>
);

export default LoadingSpinner;

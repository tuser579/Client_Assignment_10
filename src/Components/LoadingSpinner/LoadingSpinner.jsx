import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center space-y-4 min-w-[200px]">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
        <p className="text-gray-700 font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
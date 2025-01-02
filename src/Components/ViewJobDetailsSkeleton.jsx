import React from 'react';

export const ViewJobDetailsSkeleton = () => {
  return (
    <div className="container mx-auto max-w-5xl pb-15 min-h-screen mt-5">
      {/* Apply Buttons Skeleton */}
      <div className="border shadow-lg p-4 rounded-lg flex flex-col bg-white animate-pulse">
        {/* Buttons */}
        <div className="flex flex-wrap justify-end gap-2 mb-4">
          <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
          <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
        </div>

        {/* Job Details Header Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-center mb-4">
          <div className="flex items-center">
            <div className="h-32 w-32 bg-gray-300 rounded-lg border-2 border-gray-200"></div>
            <div className="text-start ml-4">
              <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
        </div>

        {/* Pay and Job Type Skeleton */}
        <div className="px-2 space-y-4">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-40"></div>
        </div>

        {/* Job Description, Qualification, Responsibilities, Instructions */}
        <div className="grid grid-cols-1 space-y-6 mt-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="px-2 pt-2 border-t text-xl animate-pulse"
            >
              <div className="h-5 bg-gray-300 rounded w-40 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-2/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';

export const ViewProfileSkeleton = () => {
    return (
        <div className="mt-6 animate-pulse">
            <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Profile Picture Skeleton */}
                <div className="h-32 w-32 bg-gray-300 rounded-lg"></div>

                {/* Employer Details Skeleton */}
                <div className="text-center sm:text-left space-y-2">
                    <div className="h-4 bg-gray-300 w-24 mx-auto sm:mx-0"></div>
                    <div className="h-6 bg-gray-300 w-40 mx-auto sm:mx-0"></div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-10 mt-6">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                        <div className="h-4 bg-gray-300 w-32"></div>
                    </div>
                ))}
            </div>

            {/* Description Section Skeleton */}
            <div className="mt-6 border-t pt-4">
                <label className="block font-semibold text-gray-800">
                    <div className="h-4 bg-gray-300 w-24"></div>
                </label>
                <div className="mt-2 space-y-2">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="h-4 bg-gray-300 w-full"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

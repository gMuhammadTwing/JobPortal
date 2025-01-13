import React from 'react';

export const EditProfileSkeleton = () => {
    return (
        <div className="mt-6 animate-pulse">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Company Name Skeleton */}
                <div className="sm:col-span-1">
                    <div className="h-4 bg-gray-300 w-28 mb-2"></div>
                    <div className="h-10 bg-gray-300 rounded-md"></div>
                </div>

                {/* Industry Skeleton */}
                <div>
                    <div className="h-4 bg-gray-300 w-20 mb-2"></div>
                    <div className="h-10 bg-gray-300 rounded-md"></div>
                </div>

                {/* Location Skeleton */}
                <div>
                    <div className="h-4 bg-gray-300 w-24 mb-2"></div>
                    <div className="h-10 bg-gray-300 rounded-md"></div>
                </div>

                {/* Contact Person Name Skeleton */}
                <div>
                    <div className="h-4 bg-gray-300 w-36 mb-2"></div>
                    <div className="h-10 bg-gray-300 rounded-md"></div>
                </div>

                {/* Phone Number Skeleton */}
                <div>
                    <div className="h-4 bg-gray-300 w-28 mb-2"></div>
                    <div className="h-10 bg-gray-300 rounded-md"></div>
                </div>

                {/* Email Skeleton */}
                <div>
                    <div className="h-4 bg-gray-300 w-20 mb-2"></div>
                    <div className="h-10 bg-gray-300 rounded-md"></div>
                </div>

                {/* Logo Skeleton */}
                <div>
                    <div className="h-4 bg-gray-300 w-36 mb-2"></div>
                    <div className="h-10 bg-gray-300 rounded-md"></div>
                </div>

                {/* Description Skeleton */}
                <div className="col-span-full">
                    <div className="h-4 bg-gray-300 w-32 mb-2"></div>
                    <div className="h-40 bg-gray-300 rounded-md"></div>
                </div>
            </div>

            {/* Buttons Skeleton */}
            <div className="flex justify-center gap-4 mt-10">
                <div className="h-10 bg-gray-300 rounded-md w-24"></div>
                <div className="h-10 bg-gray-300 rounded-md w-24"></div>
            </div>
        </div>
    );
};

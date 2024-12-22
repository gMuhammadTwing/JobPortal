import React from 'react';

export const BlogDetailsSkeleton = () => {
    return (
        <div className="bg-white min-h-screen p-4">
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
                        <div
                            className="border rounded p-6 flex flex-col col-span-full animate-pulse"
                        >
                            {/* Image Skeleton */}
                            <div className="flex justify-center mb-4">
                                <div className="relative pb-[56.25%] w-full overflow-hidden rounded-lg bg-gray-300"></div>
                            </div>

                            {/* Title Skeleton */}
                            <div className="text-center sm:text-left mb-4">
                                <div className="h-6 bg-gray-300 rounded-md w-3/4 mx-auto sm:mx-0"></div>
                            </div>

                            {/* Details Skeleton */}
                            <div className="flex flex-wrap mt-3 gap-4">
                                <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
                                <div className="h-4 bg-gray-300 rounded-md w-1/3"></div>
                                <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
                            </div>

                            {/* Description Skeleton */}
                            <div className="border-t border-gray-300 mt-4 pt-4">
                                <div className="h-4 bg-gray-300 rounded-md w-full mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

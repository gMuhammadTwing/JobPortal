import { useEffect, useState } from 'react';
import '../../App.css'
import bannerImage from './../../assets/banner3.png'
import axiosInstance, { handleError } from '../../axiosInstance';
export default function Company() {
    return (
        <div className="p-2 sm:p-8 md:p-16 lg:p-20"
            style={{
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="mx-auto p-3 lg:px-20 grid grid-cols-1 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                <div className="col-span-2 items-center rounded-lg border border-gray-300 bg-white px-6 py-5 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div className="text-[#ff0000] font-medium">
                        With the world's #1 Jobs Marketplace
                    </div>
                </div>

                <div className="col-span-full py-3 font-medium text-4xl sm:text-5xl md:text-6xl">
                    Get the perfect
                </div>

                <div className="col-span-full py-3 font-medium text-4xl sm:text-5xl md:text-6xl">
                    Jobs & Projects
                </div>

                <div className="col-span-3">
                    <li className="flex">
                        <div className="bg-[#ff0000] flex w-20 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white">
                            Projects
                        </div>
                        <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                            <div className="flex-1 px-4 py-4">
                                <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <input
                                    id="search-field"
                                    name="search"
                                    type="search"
                                    placeholder="Search Projects..."
                                    className="block w-full border-0 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                />
                            </div>
                        </div>
                    </li>
                </div>
            </div>

            <div className="py-3 lg:px-20 grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-5">

                <div className="col-span-1 px-3">
                    <div className="font-medium text-2xl">9,207</div>
                    <div className="text-gray-600">Freelance Jobs</div>
                </div>

                <div className="col-span-1 px-3">
                    <div className="font-medium text-2xl">6000+</div>
                    <div className="text-gray-600">Jobs Added</div>
                </div>

                <div className="col-span-1 px-3">
                    <div className="font-medium text-2xl">9,207</div>
                    <div className="text-gray-600">Completed Jobs</div>
                </div>
            </div>
        </div>
    )
}
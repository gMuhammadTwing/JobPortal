import { useEffect, useState } from 'react';
import '../../App.css'
import bannerImage from './../../assets/banner3.png'
import axiosInstance, { handleError } from '../../axiosInstance';
export default function Company() {
    return (
        <div className="p-2 sm:p-8 md:p-16 lg:p-20 "
            style={{
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className='mx-auto max-w-[85rem]'>
                <div className="mx-auto max-w-[85rem] p-3 lg:px-20 grid grid-cols-1 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <div className="col-span-2 ">
                        <div className=" font-medium ">
                            <span className='items-center rounded-full bg-white px-4 py-2'>With the world's #1 Jobs Marketplace</span>
                        </div>
                    </div>

                    <div className="col-span-full py-3 font-bold text-4xl sm:text-4xl md:text-5xl mt-2">
                        Get the perfect Jobs
                        <div>and Projects</div>
                    </div>
                    <div className="col-span-2 py-2 px-2">
                        <p>A job description is a written document that outlines the responsibilities and requirements for a position</p>
                    </div>
                    <div className='col-span-4'></div>
                    <div className="col-span-2 mt-2">
                        <li className="flex">

                            <div className="flex flex-1 items-center justify-between truncate rounded-l-md bg-white">
                                <div className="flex-1 px-4 py-3">
                                    <label htmlFor="search-field" className="sr-only">
                                        Search
                                    </label>
                                    <input
                                        id="search-field"
                                        name="search"
                                        type="search"
                                        placeholder="Search Jobs"
                                        className="block w-full border-0 text-gray-900 placeholder:text-gray-900 placeholder:font-semibold focus:outline-none"
                                    />

                                </div>

                            </div>
                            <div className="px-16 bg-[#ff0000] flex w-20 shrink-0 items-center justify-center rounded-r-md text-md font-medium text-white">
                                Search
                            </div>
                        </li>
                    </div>
                </div>

                {/* <div className="py-3 lg:px-20 grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-5">

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
                </div> */}
            </div>
        </div>
    )
}
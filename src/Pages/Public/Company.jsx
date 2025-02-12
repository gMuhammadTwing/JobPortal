import { useState } from 'react';
import '../../App.css';
import bannerImage from './../../assets/banner4.jpeg';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function Company() {
    const [search, setSearch] = useState("");

    return (
        <div
            className="p-4 sm:p-8 lg:p-16 bg-white"
            style={{
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingBottom: '120px',
                paddingTop: '120px'
            }}
        >
            <div className="mx-auto max-w-[75rem]">
                <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-y-3 lg:gap-x-8">
                    {/* Left Section */}
                    <div className="lg:col-span-2">
                        <div className="font-medium text-sm">
                            <span className="inline-block items-center rounded-full bg-white px-4 py-2">
                                Kenya #1 Jobs Marketplace
                            </span>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="lg:col-span-5 text-left max-w-2xl">
                        <h1 className="font-bold text-3xl sm:text-4xl lg:text-[34px] leading-tight">
                            Your Gateway to Opportunity and Growth
                        </h1>
                    </div>


                    {/* Right Section */}
                    <div className="lg:col-span-3 text-gray-800 max-w-2xl">
                        <p className="text-[17px] text-justify">
                            Discover your next career move with Veritas Jobs. Connect with top employers, explore
                            diverse opportunities, and take the next step toward your future. Your journey starts
                            here!
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-start">
                        <div className="flex w-full max-w-[33rem] items-center justify-between truncate rounded-l-md bg-white">
                            <div className="flex-1 px-4 py-3">
                                <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <input
                                    id="search-field"
                                    name="search"
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search jobs...."
                                    className="block w-full border-0 text-gray-900 placeholder:text-gray-500 focus:outline-none"
                                />
                            </div>
                        </div>
                        {localStorage?.token ? (
                            (localStorage.payment == 'true' || localStorage.role_id == 1 || localStorage.role_id == 3) ?
                                <Link
                                    to={`/jobs/${search}`}
                                    className="px-12 bg-[#ff0000] flex shrink-0 items-center justify-center rounded-r-md text-md font-medium text-white"
                                >
                                    Search
                                </Link> :
                                (
                                    localStorage.payment == 'false' ?
                                        <Link
                                            to={`/home`}
                                            onClick={() => toast.info("Cannot search untill payment approval pending")}
                                            className="px-16 bg-[#ff0000] flex shrink-0 items-center justify-center rounded-r-md text-md font-medium text-white"
                                        >
                                            Search
                                        </Link>
                                        :
                                        <Link
                                            to={`/payment-alert`}
                                            onClick={() => toast.info("Cannot search untill payment approval pending")}
                                            className="px-16 bg-[#ff0000] flex shrink-0 items-center justify-center rounded-r-md text-md font-medium text-white"
                                        >
                                            Search
                                        </Link>
                                )
                        ) : (
                            <Link
                                to={`/login`}
                                onClick={() => toast.info("Please login first")}
                                className="px-16 bg-[#ff0000] flex shrink-0 items-center justify-center rounded-r-md text-md font-medium text-white"
                            >
                                Search
                            </Link>
                        )}
                    </div>

                </div>
            </div>
        </div >
    );
}

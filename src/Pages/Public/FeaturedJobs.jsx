import { ArrowDownOnSquareIcon, ArrowDownRightIcon, CalendarDateRangeIcon, CurrencyDollarIcon, EyeIcon, MapPinIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import app_vars from "../../config";
import { Link } from "react-router-dom";
import axiosInstance, { handleError } from "../../axiosInstance";
import { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination";
import { BlogSkeleton } from "../../Components/BlogSkeleton";
import { toast } from "sonner";

export default function FeaturedJobs() {
    const [data, setData] = useState();
    const [tableLoader, setTableLoader] = useState(false);

    const fetchData = async (pageNum) => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`/api/job_list?is_featured=1&page=${pageNum}`);
            if (response) {
                setData(response?.data);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false);
        }
    };

    const parser = new DOMParser();
    const pageNumber = async (pageNum) => {
        fetchData(pageNum)
    };

    useEffect(() => {
        fetchData(1);
    }, []);
    return (
        <div className='bg-gradient-to-t to-[#F8ECF8] from-[#FFF3EA] p-2 sm:p-8 md:p-16 pt-10'>
            <div className=''>
                <div className='font-medium text-4xl sm:text-5xl md:text-6x text-center '>Featured Jobs <span className='text-[#ff0000]'>For You</span></div>
                <div className='text-center mt-2 text-gray-600 font-semibold'>Ready to get hired?  Search latest Veritas Jobs </div>
            </div>
            {tableLoader ? <BlogSkeleton /> :
                <>
                    <ul role="list" className="mx-auto max-w-[75rem] grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
                        {data?.data &&
                            data.data.slice(0, 4).map((item) => (
                                <div key={item.id} className="border shadow-lg p-4 rounded-lg flex flex-col bg-white">
                                    <div className="flex flex-col items-start text-center mb-4">
                                        <h1 className="font-semibold text-lg md:text-xl">
                                            <span className="block md:hidden">{item?.job_title}</span>
                                            <span className="hidden md:block">
                                                {item?.job_title?.length > 20 ? item.job_title.slice(0, 20) + "..." : item?.job_title}
                                            </span>
                                        </h1>

                                        {/* <span className="inline-flex items-center rounded-lg bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"> */}
                                        {item?.company_id?.company_name}
                                        {/* </span> */}
                                    </div>

                                    {/* Details Section */}
                                    <div className="flex flex-wrap gap-4">
                                        <p className="group relative flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                            <span>Posted on: {" "}</span>
                                            {new Date(item?.created_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                            })}
                                            {/* Tooltip */}
                                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300">
                                                Posted on
                                            </span>
                                        </p>

                                        {/* Location */}
                                        <p className="group relative flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                            <MapPinIcon className="w-5 h-5" />
                                            {item?.location}
                                            {/* Tooltip */}
                                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300">
                                                Job location
                                            </span>
                                        </p>

                                        {/* Deadline */}
                                        <p className="group relative flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                            <CalendarDateRangeIcon className="w-5 h-5" />
                                            <span>Deadline: {" "}</span>
                                            {new Date(item?.job_end_date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                            })}
                                            {/* Tooltip */}
                                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300">
                                                Deadline
                                            </span>
                                        </p>
                                    </div>

                                    {/* Description Section */}
                                    {/* <div className=" mt-2 pt-2">
                                        <label htmlFor="description" className="block font-semibold mb-2">
                                            Job Description
                                        </label>
                                        <div className="text-sm text-gray-600 line-clamp-3 h-20">
                                            {parser.parseFromString(item?.job_description || "", "text/html").body.textContent.trim()}
                                        </div>
                                    </div> */}

                                    <div className="border-t mt-4 pt-4">
                                        <div className="flex justify-center -mt-px divide-x divide-gray-300">
                                            <div className="flex items-center justify-center w-1/2 space-x-2">
                                                {(localStorage?.token) ? (
                                                    (localStorage.payment == 'true' || localStorage.role_id == 1 || localStorage.role_id == 5 || localStorage.role_id == 3) ?
                                                        <Link to={`/view-job-details/${item?.id}`}>
                                                            <button
                                                                className="bg-green-50 text-[#008600] px-4 py-2 rounded-lg hover:bg-[#008600] hover:text-white transition duration-200 ease-in-out"
                                                            >
                                                                View Details
                                                            </button>
                                                        </Link>
                                                        :
                                                        (
                                                            localStorage.payment == 'false' ?
                                                                < Link to={`/home`}>
                                                                    <button
                                                                        onClick={() => toast.info("Payment Approval Pending")}
                                                                        className="bg-green-50 text-[#008600] px-4 py-2 rounded-lg hover:bg-[#008600] hover:text-white transition duration-200 ease-in-out"
                                                                    >
                                                                        View Details
                                                                    </button>
                                                                </Link>
                                                                :
                                                                < Link to={`/payment-alert`}>
                                                                    <button
                                                                        onClick={() => toast.info("Payment Approval Pending")}
                                                                        className="bg-green-50 text-[#008600] px-4 py-2 rounded-lg hover:bg-[#008600] hover:text-white transition duration-200 ease-in-out"
                                                                    >
                                                                        View Details
                                                                    </button>
                                                                </Link>
                                                        )
                                                ) : (
                                                    <Link to={`/login`}
                                                        onClick={() => toast.info("Please login first")}
                                                    >
                                                        <button
                                                            className="bg-green-50 text-[#008600] px-4 py-2 rounded-lg hover:bg-[#008600] hover:text-white transition duration-200 ease-in-out"
                                                        >
                                                            View Details
                                                        </button>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                    </ul>
                    <div className="mt-10 flex justify-center cursor-pointer">
                        {localStorage?.token ? (
                            (localStorage.payment == 'true' || localStorage.role_id == 1 || localStorage.role_id == 5 || localStorage.role_id == 3) ?
                                <Link
                                    to={"/jobs"}
                                >
                                    <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                        Show more jobs</span>
                                </Link> :
                                (
                                    localStorage.payment == 'false' ?
                                        <Link
                                            onClick={() => toast.info("Payment Approval Pending")}
                                            to={"/home"}
                                        >
                                            <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                                Show more jobs</span>
                                        </Link>
                                        :
                                        <Link
                                            onClick={() => toast.info("Payment Approval Pending")}
                                            to={"/payment-alert"}
                                        >
                                            <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                                Show more jobs</span>
                                        </Link>
                                )
                        ) : (
                            <Link
                                onClick={() => toast.info("Please login first")}
                                to={"/login"}
                            >
                                <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                    Show more jobs</span>
                            </Link>
                        )}
                    </div>
                </>
            }
        </div >
    )
}
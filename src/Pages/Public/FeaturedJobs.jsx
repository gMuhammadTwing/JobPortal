import { ArrowDownOnSquareIcon, ArrowDownRightIcon, CalendarDateRangeIcon, CurrencyDollarIcon, EyeIcon, MapPinIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import app_vars from "../../config";
import { Link } from "react-router-dom";
import axiosInstance, { handleError } from "../../axiosInstance";
import { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination";
import { BlogSkeleton } from "../../Components/BlogSkeleton";

export default function FeaturedJobs() {
    const [data, setData] = useState();
    const [tableLoader, setTableLoader] = useState(false);

    const fetchData = async (pageNum) => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`/api/job_list?page=${pageNum}`);
            if (response) {
                setData(response?.data);
                console.log("data: ", response?.data);
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
        <div className='bg-gradient-to-t to-[#F8ECF8] from-[#FFF3EA] p-2 sm:p-8 md:p-16'>
            <div className=''>
                <div className='font-medium text-4xl sm:text-5xl md:text-6x text-center '>Featured Jobs <span className='text-[#ff0000]'>For You</span></div>
                <div className='text-center mt-2 text-gray-600 font-semibold'>We have over 2000+ Projects waiting for you</div>
            </div>
            {tableLoader ? <BlogSkeleton /> :
                <>
                    <ul role="list" className="mx-auto max-w-[75rem] grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
                        {data && data?.data.map((item) => (
                            <div key={item.id} className="border shadow-lg p-4 rounded-lg flex flex-col bg-white">
                                {/* Image Section */}
                                {/* <div className="relative pb-[56.25%] mb-4 w-full overflow-hidden rounded-lg">
                            <img
                                src={`${app_vars?.domain?.fileURL}${item?.company_id?.logo}`}
                                alt={item?.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div> */}
                                <div className="flex flex-col items-start text-center mb-4">
                                    <h1 className="font-semibold text-lg md:text-xl">{item?.job_title}</h1>
                                    {/* <span className="inline-flex items-center rounded-lg bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"> */}
                                    {item?.company_id?.company_name}
                                    {/* </span> */}
                                </div>

                                {/* Details Section */}
                                <div className="flex flex-wrap gap-4">
                                    <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                        <CalendarDateRangeIcon className="w-5 h-5" />
                                        {new Date(item?.created_at).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                        })}
                                    </p>
                                    <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                        <CurrencyDollarIcon className="w-5 h-5" />
                                        {item?.expected_salary}
                                    </p>
                                    <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                        <MapPinIcon className="w-5 h-5" />
                                        {item?.location}
                                    </p>
                                </div>

                                {/* Description Section */}
                                <div className=" mt-2 pt-2">
                                    <label htmlFor="description" className="block font-semibold mb-2">
                                        Job Description
                                    </label>
                                    <div className="text-sm text-gray-600 line-clamp-3 h-20">
                                        {parser.parseFromString(item?.job_description || "", "text/html").body.textContent.trim()}
                                    </div>
                                </div>

                                <div className="border-t mt-4 pt-4">
                                    <div className="flex justify-center -mt-px divide-x divide-gray-300">
                                        <div className="flex items-center justify-center w-1/2 space-x-2">
                                            <ArrowDownOnSquareIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                                            <Link to={"/jobs"}><span>View</span></Link>
                                        </div>
                                        <div className="flex items-center justify-center w-1/2 space-x-2">
                                            <ArrowDownRightIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                                            <Link to={"/jobs"}><span>Apply</span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </ul>
                    <div className="mt-10 flex justify-center cursor-pointer">
                        <Link
                            to={"/jobs"}
                        >
                            <span className="bg-white p-3 rounded-lg">Show more jobs</span>
                        </Link></div>
                </>
            }
        </div>
    )
}
import { CalendarDateRangeIcon, EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Pagination from "../../Components/Pagination";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../axiosInstance";
import app_vars from "../../config";
import { LoaderTable } from "../../Components/LoaderTable";
import { BlogSkeleton } from "../../Components/BlogSkeleton";
import GreatAboutUs from "./Components/GreatAboutUs";
import Testimonials from "./Components/Testimonials";

export default function Blogs() {
    const [data, setData] = useState();
    const [tableLoader, setTableLoader] = useState(false);

    const fetchData = async (pageNum) => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`/api/blogs_list?page=${pageNum}`);
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
        <div className="bg-white min-h-screen">
            <div className=' text-center bg-[#FFF5F3] p-20'>
                <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Blogs</h1>
                <p>Discover Insights and Stories that Spark Your Curiosity</p>
            </div>
            {tableLoader ? <BlogSkeleton /> :
                <div className=" mx-auto max-w-[75rem] p-4 mt-10 mb-10">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
                        {data?.data.length > 0 ? (
                            data?.data && data?.data?.map((item) => (
                                <div key={item.id} className="border shadow-lg p-4 rounded-lg flex flex-col">
                                    {/* Image Section */}
                                    <Link to={`/blog/blog_details/${item?.id}`}>
                                        <div className="relative pb-[56.25%] mb-4 w-full overflow-hidden rounded-lg">
                                            <img
                                                src={`${app_vars?.domain?.fileURL}/${item?.thumbnail}`}
                                                alt={item?.title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Title Section */}
                                        <div className="text-center sm:text-left mb-4">
                                            <h1 className="font-semibold text-lg md:text-xl">{item?.title}</h1>
                                        </div>

                                        {/* Details Section */}
                                        <div className="flex flex-wrap mt-3 gap-4">
                                            <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                                <CalendarDateRangeIcon className="w-5 h-5" />
                                                {new Date(item?.published_at).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "2-digit",
                                                })}
                                            </p>
                                            <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                                <EyeIcon className="w-5 h-5" />
                                                15 Views
                                            </p>
                                            {/* <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                                <PencilSquareIcon className="w-5 h-5" />
                                                {item?.proposals} Proposals
                                            </p> */}
                                        </div>

                                        {/* Description Section */}
                                        <div className="border-t border-gray-300 mt-4 pt-4">
                                            <label htmlFor="description" className="block font-semibold mb-2">
                                                Content
                                            </label>
                                            <div className="text-sm text-gray-600 line-clamp-3 h-20">
                                                {parser.parseFromString(item?.content || "", "text/html").body.textContent.trim()}
                                            </div>
                                            {/* <div className="mt-2 text-sm text-[#ff0000] underline cursor-pointer bottom-0">
                                            <Link to={`/blog/blog_details/${item?.id}`}>Read More</Link>
                                        </div> */}
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center mt-10">
                                <span className="inline-flex text-lg md:text-xl items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    No Blog Found
                                </span>
                            </div>
                        )}
                    </div>
                    {data?.data?.length > 0 && (
                        <Pagination
                            page={pageNumber}
                            total={data?.total}
                            page_size={data?.per_page}
                        />
                    )}
                </div>
            }

            <GreatAboutUs />
            {/* <Testimonials /> */}
        </div>
    );
}

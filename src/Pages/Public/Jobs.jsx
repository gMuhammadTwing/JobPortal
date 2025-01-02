import { ArrowDownCircleIcon, ArrowDownOnSquareIcon, ArrowDownRightIcon, CalendarDateRangeIcon, CurrencyDollarIcon, MapPinIcon, ViewColumnsIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { LoaderTable } from "../../Components/LoaderTable";
import axiosInstance, { handleError } from "../../axiosInstance";
import Pagination from "../../Components/Pagination";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import { useDropdownContext } from "../../DropdownProvider";
import { Skeleton } from "../../Components/Skeleton";
import ApplyModal from "../JobSeeker/ViewJobs/ApplyModal";
import ApplyInstructionsModal from "../JobSeeker/ViewJobs/ApplyInstructionsModal";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import GreatAboutUs from "./Components/GreatAboutUs";
import Testimonials from "./Components/Testimonials";
import Select from 'react-select'
import FooterHeader from "./Components/FooterHeader";
export default function Jobs() {
    const dropDownValues = useDropdownContext(); 
    const [tableLoader, setTableLoader] = useState(false);
    const parser = new DOMParser();
    const [data, setData] = useState();
    const user_id = localStorage?.user_id || "";
    const [applyModal, setApplyModal] = useState(false);
    const [filters, setFilters] = useState({
        job_title: "",
        job_type: "",
        location: "",
        job_status: "",
    })
    const formik = useFormik({
        initialValues: {
            job_title: "",
            job_type: "",
            location: "",
            job_status: "",
        },
        onSubmit: async (values) => {
            setFilters(values);
            fetchData(1, values);

        },
    });

    const fetchData = async (page, filters) => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`api/job_list?user_id=${user_id}&job_title=${filters?.job_title}&job_type=${filters?.job_type}&location=${filters?.location}&job_status=${filters?.job_status}&page=${page}`);
            if (response) {
                setData(response.data)
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
        }
    }
    useEffect(() => {
        fetchData(1, filters);
    }, []);

    const pageNumber = (pageNum) => {
        fetchData(pageNum, filters);
    };
    const [applyData, setApplyData] = useState();
    const applyHandler = (job) => {
        setApplyData(job);
        setApplyModal(true);
    }
    const closeApplyModal = () => {
        setApplyModal(false);
        fetchData(1, filters)
    }

    const [applyInstructionsModal, setApplyInstructionsModal] = useState(false);
    const [applyInstructionsData, setApplyInstructionsData] = useState();
    const applyInstructionsHandler = (job) => {
        setApplyInstructionsData(job);
        setApplyInstructionsModal(true);
    }
    const closeApplyInstructionsModal = () => {
        setApplyInstructionsModal(false);
        fetchData(1, filters)
    }
    const clearFilter = () => {
        formik.resetForm();
        setFilters({
            job_title: "",
            job_type: "",
            location: "",
            job_status: "",
        })
        fetchData(1, {
            job_title: "",
            job_type: "",
            location: "",
            job_status: "",
        })
    }
    return (
        <div className="bg-white">
            <div className=' text-center bg-[#FFF5F3] p-20'>
                <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Jobs</h1>
                <p>Ready to get hired?  Search latest Veritas Jobs                </p>
            </div>
            <div className="container mx-auto max-w-5xl pb-15 min-h-screen mt-5">
                <ApplyModal data={applyData} onClose={closeApplyModal} isOpen={applyModal} />
                <ApplyInstructionsModal data={applyInstructionsData} onClose={closeApplyInstructionsModal} isOpen={applyInstructionsModal} />
                {/* {!viewDetails ? ( */}
                <div className="px-6 lg:px-8 ">
                    <div className="mt-4 p-2 border relative border-gray-200 rounded-md  bg-white mb-2  shadow">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="py-2 px-1 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        name="job_title"
                                        onChange={formik.handleChange}
                                        value={formik.values.job_title}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                </div>

                                {/* Job Type */}
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Job Type
                                    </label>
                                    <Select
                                        options={dropDownValues?.job_family.map((value) => ({
                                            value: value.id,
                                            label: value.job_family,
                                        }))}
                                        isClearable={true}
                                        isSearchable={true}
                                        className=" text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        onChange={(selectedOption) => {
                                            formik.setFieldValue(
                                                "job_type",
                                                selectedOption ? selectedOption.value : ""
                                            );
                                        }}
                                    />
                                    {/* <select
                                        name="job_type"
                                        onChange={formik.handleChange}
                                        value={formik.values.job_type}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    >
                                        <option value="">Select</option>
                                        {dropDownValues?.job_family?.map((item) => {
                                            return (
                                                <option key={item.id} value={item?.id}>
                                                    {item?.job_family}
                                                </option>
                                            );
                                        })} */}
                                    {/* </select> */}
                                </div>

                                {/* Location */}
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        onChange={formik.handleChange}
                                        value={formik.values.location}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                </div>
                                <div className="sm:col-span-2 mt-2 flex gap-2">
                                    <button
                                        onClick={clearFilter}
                                        type="button"
                                        className="flex mt-5 border border-gray-300 p-[5px] px-5 rounded-lg hover:bg-[#ff0000] hover:text-white"
                                    >
                                        Clear Filter
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex mt-5 border bg-[#ff0000] p-[5px] px-5 rounded-lg hover:border-[#ff0000] text-white"
                                    >
                                        Apply Filter
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <section className="lg:col-span-4">
                        {tableLoader ? (
                            <div className="mt-10"><Skeleton /></div>
                        ) : (
                            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 mt-6 mb-4">
                                {data && data?.data.map((item) => (
                                    <div key={item.id} className="border shadow-lg p-4 rounded-lg flex flex-col bg-white">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-center mb-4">
                                            <div className="text-start">
                                                <h1 className="font-semibold text-lg md:text-xl">{item?.job_title}</h1>
                                                <span className="inline-flex items-center rounded-lg bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    {item?.job_type?.job_family}
                                                </span>
                                            </div>
                                            {!item?.has_applied ? (
                                                <div className="flex flex-wrap gap-2">
                                                    <span
                                                        // onClick={() => {
                                                        //     setViewDetails(true);
                                                        //     setViewData(item);
                                                        // }}
                                                        className="bg-red-50 text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out"
                                                    >
                                                        <Link to={`/view-job-details/${item?.id}`}> View Details </Link>
                                                    </span>
                                                    {(item?.veritas_to_short_list === 0 || item?.veritas_to_short_list === null) && (
                                                        <button onClick={() => applyInstructionsHandler(item)} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out">
                                                            Instruction to Apply
                                                        </button>
                                                    )}
                                                    {item?.veritas_to_short_list === 1 && (
                                                        (localStorage.token && localStorage.token != 'undefined') ? (
                                                            <>

                                                                <button
                                                                    onClick={() => applyHandler(item)}
                                                                    className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition duration-200 ease-in-out"
                                                                >
                                                                    Apply for Job
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <Link
                                                                onClick={() => toast.info("Please login first to apply")}
                                                                to={"/login"}
                                                                className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition duration-200 ease-in-out"
                                                            >
                                                                Apply for Job
                                                            </Link>
                                                        )

                                                    )}
                                                </div>
                                            ) :
                                                (
                                                    <div className="flex flex-wrap gap-2">
                                                        <span
                                                            // onClick={() => {
                                                            //     setViewDetails(true);
                                                            //     setViewData(item);
                                                            // }}
                                                            className="bg-red-50 text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out"
                                                        >
                                                            <Link to={`/view-job-details/${item?.id}`}> View Details </Link>
                                                        </span>
                                                        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white">Alreay Applied</div>
                                                    </div>
                                                )}
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
                                            <div className="text-sm text-gray-600 line-clamp-3">
                                                {parser.parseFromString(item?.job_description || "", "text/html").body.textContent.trim()}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </ul>
                        )}
                    </section>

                    <Pagination
                        page={pageNumber}
                        total={data?.total}
                        page_size={data?.per_page}
                    />
                </div>
                {/* // ) :
                //     (
                //         <JobDetails data={viewData} />
                //     )} */}
            </div>
            <FooterHeader/>
            {/* <GreatAboutUs /> */}
            {/* <Testimonials/> */}
        </div>
    );
}

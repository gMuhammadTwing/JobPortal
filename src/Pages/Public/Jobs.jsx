import { ArrowDownCircleIcon, ArrowDownOnSquareIcon, ArrowDownRightIcon, CalendarDateRangeIcon, CurrencyDollarIcon, MapPinIcon, ViewColumnsIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { LoaderTable } from "../../Components/LoaderTable";
import axiosInstance, { handleError } from "../../axiosInstance";
import Pagination from "../../Components/Pagination";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import { useDropdownContext } from "../../DropdownProvider";
import { BlogSkeleton } from "../../Components/BlogSkeleton";
import { Skeleton } from "../../Components/Skeleton";

export default function Jobs() {
    const dropDownValues = useDropdownContext();
    const [tableLoader, setTableLoader] = useState(false);
    const parser = new DOMParser();
    const [data, setData] = useState();
    const [viewDetails, setViewDetails] = useState(false);
    const [viewData, setViewData] = useState();
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
            const response = await axiosInstance.get(`api/job_list?job_title=${filters?.job_title}&job_type=${filters?.job_type}&location=${filters?.location}&job_status=${filters?.job_status}&page=${page}`);
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
            <div className="font-medium text-4xl text-center bg-[#FFF5F3] p-10">
                <h2 className="text-4xl font-semibold tracking-tight text-[#ff0000] sm:text-5xl">Jobs</h2>
                <p className="mt-2 text-lg text-gray-600">Find your dream job among these opportunities.</p>
            </div>
            <div className="container mx-auto max-w-6xl pb-15 min-h-screen mt-5">
                {/* <ApplyModal data={applyData} onClose={closeApplyModal} isOpen={applyModal} /> */}
                {!viewDetails ? (
                    <div className="px-6 lg:px-8 ">
                        <div className="mt-4 p-2 border relative border-gray-200 rounded-md  bg-white mb-2  shadow">
                            {/* <label className="block text-sm font-medium text-gray-900">
                            Apply Filter
                        </label> */}
                            <form onSubmit={formik.handleSubmit}>
                                <div className="py-2 px-1 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                                    <div className="sm:col-span-2">
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
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-900">
                                            Job Type
                                        </label>
                                        <select
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
                                            })}
                                        </select>
                                    </div>

                                    {/* Location */}
                                    <div className="sm:col-span-2">
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

                                    {/* Job Status */}
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-900">
                                            Job Status
                                        </label>
                                        <select
                                            name="job_status"
                                            onChange={formik.handleChange}
                                            value={formik.values.job_status}
                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        >
                                            <option value="">Select</option>
                                            <option value={1}>Open</option>
                                            <option value={0}>Closed</option>
                                        </select>
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
                                <Skeleton />
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
                                                <div className="flex gap-2 mt-2 sm:mt-0">
                                                    <button
                                                        onClick={() => {
                                                            setViewDetails(true);
                                                            setViewData(item);
                                                        }}
                                                        className="text-xs bg-red-50 text-[#ff0000] px-2 py-1 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out"
                                                    >
                                                        View Details
                                                    </button>
                                                    <button
                                                        onClick={() => applyHandler(item)}
                                                        className="text-xs bg-green-50 text-[#008604] px-2 py-1 rounded-lg hover:bg-[#008604] hover:text-white transition duration-200 ease-in-out"
                                                    >
                                                        Apply for Job
                                                    </button>
                                                </div>
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
                ) :
                    (
                        <ul role="list">
                            <div className="mb-4">
                                <button
                                    type="button"
                                    onClick={() => setViewDetails(false)}
                                    className="border rounded-lg px-4 py-2 text-sm bg-white hover:rounded-full transition duration-200 ease-in-out"
                                >
                                    Back
                                </button>
                            </div>
                            <div className="border shadow-lg p-4 rounded-lg flex flex-col bg-white">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-center mb-4">
                                    <div className="text-start">
                                        <h1 className="font-semibold text-lg md:text-xl">{viewData?.job_title}</h1>
                                        <div className="font-semibold text-md md:text-md">
                                            {viewData?.company_id?.company_name}
                                        </div>
                                        <span className="inline-flex items-center rounded-lg bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            {viewData?.job_type?.job_family}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">

                                        {(viewData?.veritas_to_short_list === 0 || viewData?.veritas_to_short_list === null) && (
                                            <button onClick={() => applyInstructionHandler(viewData)} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out">
                                                View Job Instruction to Apply
                                            </button>
                                        )}
                                        {viewData?.veritas_to_short_list === 1 && (
                                            <button
                                                onClick={() => applyHandler(viewData)}
                                                className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition duration-200 ease-in-out"
                                            >
                                                Apply for Job
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="flex flex-wrap gap-4">
                                    <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                        <CalendarDateRangeIcon className="w-5 h-5" />
                                        {new Date(viewData?.created_at).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                        })}
                                    </p>
                                    <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                        <CurrencyDollarIcon className="w-5 h-5" />
                                        {viewData?.expected_salary}
                                    </p>
                                    <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                        <MapPinIcon className="w-5 h-5" />
                                        {viewData?.location}
                                    </p>
                                </div>

                                {/* Description Section */}
                                <div className="mt-2 pt-2">
                                    <label htmlFor="description" className="block font-semibold mb-2">
                                        Job Description
                                    </label>
                                    <ReactQuill
                                        id="job_description"
                                        theme="bubble"
                                        value={viewData?.job_description}
                                        readOnly={true}
                                        // onChange={(value) => formik.setFieldValue("job_description", value)}
                                        style={{
                                            height: "350px",
                                        }}
                                        modules={{
                                            toolbar: [
                                                ["bold", "italic", "underline", "strike"],
                                                [{ header: [1, 2, 3, false] }],
                                                [{ list: "ordered" }, { list: "bullet" }],
                                                ["clean"],
                                            ],
                                        }}
                                        formats={[
                                            "header",
                                            "bold",
                                            "italic",
                                            "underline",
                                            "strike",
                                            "list",
                                            "bullet",
                                        ]}
                                        placeholder="Write something"
                                    />
                                </div>
                                <div className="mt-2 pt-2">
                                    <label htmlFor="" className="block font-semibold mb-2">
                                        Job Qualification
                                    </label>
                                    <ReactQuill
                                        id=""
                                        theme="bubble"
                                        value={viewData?.job_qualification}
                                        readOnly={true}
                                        // onChange={(value) => formik.setFieldValue("job_description", value)}
                                        style={{
                                            height: "350px",
                                        }}
                                        modules={{
                                            toolbar: [
                                                ["bold", "italic", "underline", "strike"],
                                                [{ header: [1, 2, 3, false] }],
                                                [{ list: "ordered" }, { list: "bullet" }],
                                                ["clean"],
                                            ],
                                        }}
                                        formats={[
                                            "header",
                                            "bold",
                                            "italic",
                                            "underline",
                                            "strike",
                                            "list",
                                            "bullet",
                                        ]}
                                        placeholder="Write something"
                                    />
                                </div>
                                <div className="mt-2 pt-2">
                                    <label htmlFor="" className="block font-semibold mb-2">
                                        Job Responsibilities
                                    </label>
                                    <ReactQuill
                                        id=""
                                        theme="bubble"
                                        value={viewData?.job_responsibilities}
                                        readOnly={true}
                                        // onChange={(value) => formik.setFieldValue("job_description", value)}
                                        style={{
                                            height: "350px",
                                        }}
                                        modules={{
                                            toolbar: [
                                                ["bold", "italic", "underline", "strike"],
                                                [{ header: [1, 2, 3, false] }],
                                                [{ list: "ordered" }, { list: "bullet" }],
                                                ["clean"],
                                            ],
                                        }}
                                        formats={[
                                            "header",
                                            "bold",
                                            "italic",
                                            "underline",
                                            "strike",
                                            "list",
                                            "bullet",
                                        ]}
                                        placeholder="Write something"
                                    />
                                </div>
                                <div className="mt-2 pt-2">
                                    <label htmlFor="" className="block font-semibold mb-2">
                                        Instruction to Apply
                                    </label>
                                    <ReactQuill
                                        id=""
                                        theme="bubble"
                                        value={viewData?.job_instructions_to_apply}
                                        readOnly={true}
                                        // onChange={(value) => formik.setFieldValue("job_description", value)}
                                        style={{
                                            height: "350px",
                                        }}
                                        modules={{
                                            toolbar: [
                                                ["bold", "italic", "underline", "strike"],
                                                [{ header: [1, 2, 3, false] }],
                                                [{ list: "ordered" }, { list: "bullet" }],
                                                ["clean"],
                                            ],
                                        }}
                                        formats={[
                                            "header",
                                            "bold",
                                            "italic",
                                            "underline",
                                            "strike",
                                            "list",
                                            "bullet",
                                        ]}
                                        placeholder="Write something"
                                    />
                                </div>
                            </div>
                        </ul>
                    )}
            </div>

        </div>
    );
}

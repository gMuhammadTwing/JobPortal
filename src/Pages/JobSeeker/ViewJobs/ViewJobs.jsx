import { ArrowDownCircleIcon, ViewColumnsIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Button } from "../../../Components/Button";
import { LoaderTable } from "../../../Components/LoaderTable";
import axiosInstance, { handleError } from "../../../axiosInstance";
import Pagination from "../../../Components/Pagination";
import app_vars from "../../../config";
import ReactQuill from "react-quill";
import ApplyModal from "./ApplyModal";
import { useDropdownContext } from "../../../DropdownProvider";
import { useFormik } from "formik";

export default function ViewJobs() {
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
        <div className="container mx-auto max-w-5xl pb-15 min-h-screen">
            <ApplyModal data={applyData} onClose={closeApplyModal} isOpen={applyModal} />
            {!viewDetails ? (
                <div className="px-6 lg:px-8 ">
                    <h2 className="text-4xl font-semibold tracking-tight text-orange-500 sm:text-5xl">Jobs</h2>
                    <p className="mt-2 text-lg text-gray-600">Find your dream job among these opportunities.</p>
                    <div className="mt-4 p-2 border relative border-gray-200 rounded-md  bg-white mb-2  ">
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
                                        {dropDownValues?.job_status?.map((item) => {
                                            return (
                                                <option key={item.id} value={item?.id}>
                                                    {item?.job_status}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="sm:col-span-2 mt-2 flex gap-2">
                                    <button
                                        onClick={clearFilter}
                                        type="button"
                                        className="flex mt-5 border border-gray-300 p-[5px] px-5 rounded-lg hover:bg-orange-600 hover:text-white"
                                    >
                                        Clear Filter
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex mt-5 border bg-orange-600 p-[5px] px-5 rounded-lg hover:border-orange-600 text-white"
                                    >
                                        Apply Filter
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <section className="lg:col-span-4 ">
                        {tableLoader ? <LoaderTable /> :
                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-1 lg:grid-cols-1">
                                {data?.data?.length > 0 ? (
                                    data?.data?.map((item) => (
                                        <>
                                            <article className="border rounded-lg p-4 shadow bg-white">
                                                <div className="flex flex-wrap items-center justify-between text-xs sm:gap-x-4">
                                                    {/* <span
                                                        className={`relative z-10 rounded-full px-3 py-1.5 font-medium ${item?.job_status?.id === 1
                                                            ? "bg-green-100 text-green-600 hover:bg-green-200"
                                                            : item?.job_status?.id === 2
                                                                ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                                                : item?.job_status?.id === 3
                                                                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                            }`}
                                                    >
                                                        {item?.job_status?.job_status}
                                                    </span> */}
                                                    {/* <div className="flex flex-wrap sm:flex-row gap-2">
                                                        <button onClick={() => {
                                                            setViewDetails(true);
                                                            setViewData(item)
                                                        }
                                                        } className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition duration-200 ease-in-out">
                                                            View Details
                                                        </button>
                                                        {(item?.veritas_to_short_list == 0 || item?.veritas_to_short_list == null) && (
                                                            <button
                                                                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out"
                                                            >
                                                                View Job Instruction to Apply
                                                            </button>
                                                        )}
                                                        {item?.veritas_to_short_list == 1 && (
                                                            <button onClick={() => applyHandler(item)}
                                                                className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition duration-200 ease-in-out"
                                                            >
                                                                Apply for Job
                                                            </button>
                                                        )}

                                                    </div> */}
                                                </div>
                                                <div className="p-3">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                        <h3 className="text-xl font-semibold text-gray-900 sm:mb-0">
                                                            Job Title: {item?.job_title} ({item?.expected_salary})
                                                        </h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            <button
                                                                onClick={() => {
                                                                    setViewDetails(true);
                                                                    setViewData(item);
                                                                }}
                                                                className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition duration-200 ease-in-out"
                                                            >
                                                                View Details
                                                            </button>
                                                            {(item?.veritas_to_short_list === 0 || item?.veritas_to_short_list === null) && (
                                                                <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out">
                                                                    View Job Instruction to Apply
                                                                </button>
                                                            )}
                                                            {item?.veritas_to_short_list === 1 && (
                                                                <button
                                                                    onClick={() => applyHandler(item)}
                                                                    className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition duration-200 ease-in-out"
                                                                >
                                                                    Apply for Job
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* <h3 className="text-xl font-semibold text-gray-900 items-start text-start">Job Title: {item?.job_title} ({item?.expected_salary})</h3> */}
                                                    <p className=''> {item?.company_id?.company_name} , {item?.location}</p>
                                                    <p className='mt-2'>Description: </p>
                                                    <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                                                        {parser.parseFromString(item?.job_description || "", "text/html").body.textContent.trim()}
                                                    </p>
                                                </div>
                                            </article>
                                        </>
                                    ))
                                ) : (
                                    <table className="min-w-full divide-y divide-gray-300 border bg-white">
                                        <tr>
                                            <td colSpan="5" className="text-center py-4">
                                                <span className="inline-flex text-xl items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                    No Record Found
                                                </span>
                                            </td>
                                        </tr>
                                    </table>

                                )}
                                <Pagination
                                    page={pageNumber}
                                    total={data?.total}
                                    page_size={data?.per_page}
                                />
                            </div>
                        }
                    </section>
                </div>
            ) :
                (
                    <form className='border p-4 bg-white rounded-lg'>
                        <button
                            type="button"
                            onClick={() => {
                                setViewDetails(false);
                            }
                            }
                            className='border rounded-full p-1 px-4'
                        >
                            Back
                        </button>
                        <h1
                            className=" font-semibold leading-6 text-gray-900 text-center text-2xl pb-5"
                        >
                            View Job
                        </h1>
                        <div className=" grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            {/* Job Title */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    name="job_title"
                                    // onChange={formik.handleChange}
                                    value={viewData?.job_title}
                                    disabled={true}
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
                                    // onChange={formik.handleChange}
                                    disabled={true}
                                    value={viewData?.job_type}
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                >
                                    <option value="">Select</option>
                                    <option value="1">Full-Time</option>
                                    <option value="2">Part-Time</option>
                                </select>
                            </div>
                            {/* Salary Range */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">
                                    Salary Range
                                </label>
                                <input
                                    type="text"
                                    name="expected_salary"
                                    // onChange={formik.handleChange}
                                    value={viewData?.expected_salary}
                                    disabled={true}
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                />
                            </div>

                            {/* Location */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    // onChange={formik.handleChange}
                                    value={viewData?.location}
                                    disabled={true}
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
                                    // onChange={formik.handleChange}
                                    value={viewData?.job_status}
                                    disabled={true}
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                >
                                    <option value="">Select</option>
                                    <option value="1">Active</option>
                                    <option value="2">Closed</option>
                                </select>
                            </div>


                            {/* Veritas To Shortlist */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">
                                    Veritas To Shortlist
                                </label>
                                <select
                                    name="veritas_to_short_list"
                                    // onChange={formik.handleChange}
                                    disabled={true}
                                    value={viewData?.veritas_to_short_list}
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                >
                                    <option value="">Select</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            {/* Job Description */}
                            <div className="sm:col-span-full">
                                <label className="block text-sm font-medium text-gray-900">
                                    Job Description
                                </label>
                                <ReactQuill
                                    id="job_description"
                                    theme="snow"
                                    value={viewData?.job_description}
                                    readOnly={true}
                                    // onChange={(value) => formik.setFieldValue("job_description", value)}
                                    style={{
                                        height: "150px",
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

                            {/* Job_qualification */}
                            <div className="sm:col-span-full mt-7">
                                <label className="block text-sm font-medium text-gray-900">
                                    Job Qualification
                                </label>
                                <ReactQuill
                                    id="job_qualification"
                                    readOnly={true}
                                    theme="snow"
                                    value={viewData?.job_qualification}
                                    // onChange={(value) => formik.setFieldValue("job_qualification", value)}
                                    style={{
                                        height: "150px",
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
                            <div className="sm:col-span-full mt-7">
                                <label className="block text-sm font-medium text-gray-900">
                                    Job Responsibilities
                                </label>
                                <ReactQuill
                                    id="job_responsibilities"
                                    theme="snow"
                                    readOnly={true}
                                    value={viewData?.job_responsibilities}
                                    // onChange={(value) => formik.setFieldValue("job_responsibilities", value)}
                                    style={{
                                        height: "150px",
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

                            {/* Instruction to Apply */}
                            <div className="sm:col-span-full mt-7 mb-14">
                                <label className="block text-sm font-medium text-gray-900">
                                    Instruction to Apply
                                </label>
                                <ReactQuill
                                    id="job_instructions_to_apply"
                                    theme="snow"
                                    readOnly={true}
                                    value={viewData.job_instructions_to_apply}
                                    // onChange={(value) => formik.setFieldValue("job_instructions_to_apply", value)}
                                    style={{
                                        height: "150px",
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
                    </form>
                )}
        </div>
    );
}

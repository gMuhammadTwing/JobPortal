import { ArrowDownCircleIcon, CalendarDateRangeIcon, CurrencyDollarIcon, MapPinIcon, ViewColumnsIcon, XCircleIcon } from "@heroicons/react/24/outline";
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
import ApplyInstructionsModal from "./ApplyInstructionsModal";
import Select from "react-select";
export default function ViewJobs() {
    const dropDownValues = useDropdownContext();
    const [tableLoader, setTableLoader] = useState(false);
    const parser = new DOMParser();
    const [data, setData] = useState();
    const [viewDetails, setViewDetails] = useState(false);
    const [viewData, setViewData] = useState();
    const [applyModal, setApplyModal] = useState(false);
    const user_id = localStorage?.user_id
    const [applyInstructionModal, setApplyInstructionModal] = useState(false);
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
    const applyInstructionHandler = (job) => {
        setApplyData(job);
        setApplyInstructionModal(true);
    }
    const closeApplyInstructionModal = () => {
        setApplyInstructionModal(false);
        fetchData(1, filters)
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
        <div className="container mx-auto max-w-5xl pb-15 min-h-screen mt-3">
            <ApplyModal data={applyData} onClose={closeApplyModal} isOpen={applyModal} />
            <ApplyInstructionsModal data={applyData} onClose={closeApplyInstructionModal} isOpen={applyInstructionModal} />
            {!viewDetails ? (
                <div className="py-5 lg:px-8 bg-white rounded-lg">
                    <h2 className="text-4xl font-semibold tracking-tight text-[#ff0000] sm:text-5xl">Search Jobs</h2>
                    <p className="mt-2 text-lg text-gray-600">Ready to get hired?  Search latest Veritas Jobs </p>
                    <div className="mt-4 p-2 border relative border-gray-200 rounded-md  bg-white mb-2  ">
                        {/* <label className="block text-sm font-medium text-gray-900">
                            Apply Filter
                        </label> */}
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
                                        })}
                                    </select> */}
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
                                                        } className="bg-orange-50 text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
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
                                                        {!item?.has_applied ? (
                                                            <div className="flex flex-wrap gap-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setViewDetails(true);
                                                                        setViewData(item);
                                                                    }}
                                                                    className="bg-red-50 text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out"
                                                                >
                                                                    View Details
                                                                </button>
                                                                {(item?.veritas_to_short_list === 0 || item?.veritas_to_short_list === null) && (
                                                                    <button onClick={() => applyInstructionHandler(item)} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out">
                                                                        Instruction to Apply
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
                                                        ) :
                                                            (
                                                                <div className="flex flex-wrap gap-2">
                                                                    <button
                                                                        onClick={() => {
                                                                            setViewDetails(true);
                                                                            setViewData(item);
                                                                        }}
                                                                        className="bg-red-50 text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out"
                                                                    >
                                                                        View Details
                                                                    </button>
                                                                    <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white">Alreay Applied</div>
                                                                </div>
                                                            )}
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
                    <ul role="list">
                        {/* <div className="mb-4">
                            <button
                                type="button"
                                onClick={() => setViewDetails(false)}
                                className="border rounded-lg px-4 py-2 text-sm bg-white hover:rounded-full transition duration-200 ease-in-out"
                            >
                                Back
                            </button>
                        </div> */}
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

                                    {!viewData?.has_applied ? (
                                        <>
                                            {(viewData?.veritas_to_short_list === 0 || viewData?.veritas_to_short_list === null) && (
                                                <button onClick={() => applyInstructionHandler(viewData)} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out">
                                                    Instruction to Apply
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
                                        </>
                                    ) :
                                        (
                                            <>
                                                <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white">Alreay Applied</div>
                                            </>
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
                                    style={{
                                        minHeight: "50px", // A minimum height to prevent collapsing
                                        overflow: "auto", // Scroll if the content exceeds the visible area
                                    }}
                                    modules={{
                                        toolbar: false, // Disable toolbar for read-only mode
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
                                />
                            </div>

                            <div className="mt-2 pt-2">
                                <label htmlFor="" className="block font-semibold mb-2">
                                    Job Qualification
                                </label>
                                <ReactQuill
                                    id="job_qualification"
                                    theme="bubble"
                                    value={viewData?.job_qualification}
                                    readOnly={true}
                                    style={{
                                        minHeight: "50px", // A minimum height to prevent collapsing
                                        overflow: "auto", // Scroll if the content exceeds the visible area
                                    }}
                                    modules={{
                                        toolbar: false, // Disable toolbar for read-only mode
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
                                />
                            </div>
                            <div className="mt-2 pt-2">
                                <label htmlFor="" className="block font-semibold mb-2">
                                    Job Responsibilities
                                </label>
                                <ReactQuill
                                    id="job_responsibilities"
                                    theme="bubble"
                                    value={viewData?.job_responsibilities}
                                    readOnly={true}
                                    style={{
                                        minHeight: "50px", // A minimum height to prevent collapsing
                                        overflow: "auto", // Scroll if the content exceeds the visible area
                                    }}
                                    modules={{
                                        toolbar: false, // Disable toolbar for read-only mode
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
                                />
                            </div>
                            <div className="mt-2 pt-2">
                                <label htmlFor="" className="block font-semibold mb-2">
                                    Instruction to Apply
                                </label>
                                <ReactQuill
                                    id="job_instructions_to_apply"
                                    theme="bubble"
                                    value={viewData?.job_instructions_to_apply}
                                    readOnly={true}
                                    style={{
                                        minHeight: "50px", // A minimum height to prevent collapsing
                                        overflow: "auto", // Scroll if the content exceeds the visible area
                                    }}
                                    modules={{
                                        toolbar: false, // Disable toolbar for read-only mode
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
                                />
                            </div>
                        </div>
                    </ul>
                )}
        </div>
    );
}

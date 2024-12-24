import { CalendarDateRangeIcon, CurrencyDollarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom"
import ApplyModal from "../JobSeeker/ViewJobs/ApplyModal";
import ApplyInstructionsModal from "../JobSeeker/ViewJobs/ApplyInstructionsModal";
import app_vars from "../../config";

export default function JobDetails({ data }) {
    const id = useParams();
    console.log(data);

    const [viewData, setViewData] = useState(data);
    const [applyModal, setApplyModal] = useState(false);
    const [applyData, setApplyData] = useState();
    const parser = new DOMParser();
    // const [data, setData] = useState();

    const applyHandler = (job) => {
        setApplyData(job);
        setApplyModal(true);
    }
    const closeApplyModal = () => {
        setApplyModal(false);
    }

    const [applyInstructionsModal, setApplyInstructionsModal] = useState(false);
    const [applyInstructionsData, setApplyInstructionsData] = useState();
    const applyInstructionsHandler = (job) => {
        setApplyInstructionsData(job);
        setApplyInstructionsModal(true);
    }
    const closeApplyInstructionsModal = () => {
        setApplyInstructionsModal(false);
    }
    return (
        <div>
            <ApplyModal data={applyData} onClose={closeApplyModal} isOpen={applyModal} />
            <ApplyInstructionsModal data={applyInstructionsData} onClose={closeApplyInstructionsModal} isOpen={applyInstructionsModal} />
            <ul role="list">
                <div className="mb-4">
                </div>
                <div className="border shadow-lg p-4 rounded-lg flex flex-col bg-white">
                    <div className="flex flex-wrap justify-end gap-2">
                        {!viewData?.has_applied ? (
                            <>
                                {(viewData?.veritas_to_short_list === 0 || viewData?.veritas_to_short_list === null) && (
                                    <button
                                        onClick={() => applyInstructionsHandler(viewData)}
                                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out"
                                    >
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
                            </>
                        ) : (
                            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg">
                                Already Applied
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between text-center mb-4">
                        {/* Left Section: Image and Text */}
                        <div className="flex items-center">
                            <img
                                src={
                                    app_vars?.domain?.fileURL + localStorage?.user_image
                                }

                                // src={
                                //     app_vars?.domain?.fileURL + viewData?.company_id?.logo
                                // }
                                alt="User Profile"
                                className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-2 border-white"
                            />
                            <div className="text-start ml-4">
                                <h1 className="font-semibold text-lg md:text-xl">{viewData?.job_title}</h1>
                                <div className="font-semibold text-md md:text-md">
                                    {viewData?.company_id?.company_name}
                                </div>
                                <span className="inline-flex items-center rounded-lg bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    {viewData?.job_type?.job_family}
                                </span>
                            </div>
                        </div>

                        {/* Right Section: Buttons */}

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
        </div>
    )
}
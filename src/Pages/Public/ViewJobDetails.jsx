import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Link, useParams } from "react-router-dom"
import ApplyModal from "../JobSeeker/ViewJobs/ApplyModal";
import ApplyInstructionsModal from "../JobSeeker/ViewJobs/ApplyInstructionsModal";
import app_vars from "../../config";
import axiosInstance, { handleError } from "../../axiosInstance";
import { toast } from "sonner";
import { Skeleton } from "../../Components/Skeleton";
import { ViewJobDetailsSkeleton } from "../../Components/ViewJobDetailsSkeleton";
import GreatAboutUs from "./Components/GreatAboutUs";

export default function ViewJobDetails() {
    const [data, setData] = useState(null)
    const [loader, setLoader] = useState(false);
    const id = useParams();
    const fetchData = async () => {
        setLoader(true);
        try {
            const response = await axiosInstance.get(`api/job/view/${id?.id}`);
            if (response) {
                console.log(response);
                setData(response.data[0])
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoader(false)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const [applyModal, setApplyModal] = useState(false);
    const [applyData, setApplyData] = useState();

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
        <div className="bg-white">
            <div className=' text-center bg-[#FFF5F3] p-20'>
                <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Job Details</h1>
                <p>Find your dream job among these opportunities.</p>
            </div>
            {loader ? <ViewJobDetailsSkeleton /> :
                (
                    <div className="container mx-auto max-w-5xl pb-15 min-h-screen mt-5">
                        <ApplyModal data={applyData} onClose={closeApplyModal} isOpen={applyModal} />
                        <ApplyInstructionsModal data={applyInstructionsData} onClose={closeApplyInstructionsModal} isOpen={applyInstructionsModal} />
                        <ul role="list">
                            <div className="mb-4">
                            </div>
                            <div className="border shadow-lg p-4 rounded-lg flex flex-col bg-white">
                                <div className="flex flex-wrap justify-end gap-2">
                                    {!data?.has_applied && (
                                        <div className="flex flex-wrap gap-2">
                                            {(data?.veritas_to_short_list === 0 || data?.veritas_to_short_list === null) && (
                                                <button onClick={() => applyInstructionsHandler(data)} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out">
                                                    Instruction to Apply
                                                </button>
                                            )}
                                            {data?.veritas_to_short_list === 1 && (
                                                (localStorage.token && localStorage.token != 'undefined') ? (
                                                    <>

                                                        <button
                                                            onClick={() => applyHandler(data)}
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
                                    )}
                                </div>
                                <div className="flex flex-col sm:flex-row items-center justify-between text-center mb-4">
                                    <div className="flex items-center">
                                        <img
                                            // src={
                                            //     app_vars?.domain?.fileURL + localStorage?.user_image
                                            // }

                                            src={
                                                app_vars?.domain?.fileURL + data?.company_id?.logo
                                            }
                                            alt="User Profile"
                                            className="h-32 w-32 rounded-lg border-2 border-white"
                                        />
                                        <div className="text-start ml-4">
                                            <h1 className="font-semibold text-lg md:text-2xl">{data?.job_title}</h1>
                                            <div className="font-semibold text-sm md:text-md">
                                                {data?.company_id?.company_name}, {data?.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-2">
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <div>
                                                <h2 className="text-lg font-semibold">Pay</h2>
                                                <p className="text-gray-700">From {data?.expected_salary} a month</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div>
                                                <h2 className="text-lg font-semibold">Job Type</h2>
                                                <p className="text-gray-700">{data?.job_type?.job_family}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1">
                                    <div className=" px-2 mt-2 pt-2 border-t text-xl">
                                        <label htmlFor="description" className="block font-semibold mb-2">
                                            Job Description
                                        </label>
                                        <ReactQuill
                                            id="job_description"
                                            theme="bubble"
                                            value={data?.job_description}
                                            readOnly={true}
                                            style={{
                                                minHeight: "50px",
                                                overflow: "auto",
                                            }}
                                            modules={{
                                                toolbar: false,
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

                                    <div className="px-2 mt-2 pt-2  border-t text-xl">
                                        <label htmlFor="" className="block font-semibold mb-2">
                                            Job Qualification
                                        </label>
                                        <ReactQuill
                                            id="job_qualification"
                                            theme="bubble"
                                            value={data?.job_qualification}
                                            readOnly={true}
                                            style={{
                                                minHeight: "50px",
                                                overflow: "auto",
                                            }}
                                            modules={{
                                                toolbar: false,
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
                                    <div className="px-2 mt-2 pt-2  border-t text-xl">
                                        <label htmlFor="" className="block font-semibold mb-2">
                                            Job Responsibilities
                                        </label>
                                        <ReactQuill
                                            id="job_responsibilities"
                                            theme="bubble"
                                            value={data?.job_responsibilities}
                                            readOnly={true}
                                            style={{
                                                minHeight: "50px",
                                                overflow: "auto",
                                            }}
                                            modules={{
                                                toolbar: false,
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
                                    <div className="px-2 mt-2 pt-2  border-t text-xl">
                                        <label htmlFor="" className="block font-semibold mb-2">
                                            Instruction to Apply
                                        </label>
                                        <ReactQuill
                                            id="job_instructions_to_apply"
                                            theme="bubble"
                                            value={data?.job_instructions_to_apply}
                                            readOnly={true}
                                            style={{
                                                minHeight: "50px",
                                                overflow: "auto",
                                            }}
                                            modules={{
                                                toolbar: false,
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
                            </div>
                        </ul>
                    </div>
                )
            }
            {/* <GreatAboutUs /> */}
        </div>
    )
}
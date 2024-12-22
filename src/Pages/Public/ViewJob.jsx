import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import axiosInstance, { handleError } from "../../axiosInstance";

export default function Jobs() {
    const [viewData, setViewData] = useState();
    const id = useParams();
    const [loader , setLoader] = useState(false);
    const fetchData = async () => {
        setLoader(true);
        try {
            const response = await axiosInstance.get(`api/job_list?job_id=${id}`);
            if (response) {
                setViewData(response.data)
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
    return (
        <div className="bg-white">
            <div className="font-medium text-4xl text-center bg-[#FFF5F3] p-10">
                <h2 className="text-4xl font-semibold tracking-tight text-orange-500 sm:text-5xl">View Job</h2>
                <p className="mt-2 text-lg text-gray-600">Find your dream job among these opportunities.</p>
            </div>
            <div className="container mx-auto max-w-6xl pb-15 min-h-screen mt-5">
                <form className='border p-4 bg-white rounded-lg'>
                    <button
                        type="button"
                        onClick={() => {
                            // setViewDetails(false);
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
            </div>
        </div>
    )
}
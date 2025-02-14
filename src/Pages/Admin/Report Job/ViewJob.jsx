import { toast, Toaster } from 'sonner';
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { InfinitySpin } from 'react-loader-spinner';
import ReactQuill from 'react-quill';
import Select from 'react-select'
import { Button } from '../../../Components/Button';
import { useDropdownContext } from '../../../DropdownProvider';
import axiosInstance, { handleError } from '../../../axiosInstance';
import { useParams } from 'react-router-dom';
export default function ViewJob() {
    const dropDownValues = useDropdownContext();
    const id = useParams();
    console.log("id: ", id);

    const company_id = localStorage?.company_id;
    const [tableLoader, setTableLoader] = useState(false);
    const parser = new DOMParser();
    const [data, setData] = useState();
    const formik = useFormik({
        initialValues: {
            job_title: data?.job_title || "",
            job_type: data?.job_type?.id || "",
            job_description: data?.job_description || "",
            job_qualification: data?.job_qualification || "",
            job_responsibilities: data?.job_responsibilities || "",
            location: data?.location || "",
            job_status: data?.job_status === "Open" ? 1 : 2,
            veritas_to_short_list: data?.veritas_to_short_list,
            job_instructions_to_apply: data?.job_instructions_to_apply || "",
            user_id: id?.id,
            company_id: company_id,
            job_end_date: data?.job_end_date || ""
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            job_title: Yup.string().required("Job title is required"),
            job_type: Yup.string().required("Job type is required"),
            // expected_salary: Yup.string().required("Salary range is required"),
            location: Yup.string().required("Location is required"),
            job_status: Yup.string().required("Job status is required"),
            // veritas_to_short_list: Yup.string().required("This field is required"),
        }),
        onSubmit: async (values) => {
            // setTableLoader(true);
            // try {
            //     const response = await axiosInstance.post(`api/employer_company_job_posting/update/${data?.id}`, values);
            //     if (response) {
            //         toast.success("Job Record updated")
            //     }
            // } catch (error) {
            //     handleError(error);
            // } finally {
            //     fetchData(1)
            //     formik.resetForm();
            // }
        },
    });

    const fetchData = async (page) => {
        if (company_id != "undefined") {
            try {
                const response = await axiosInstance.get(`api/admin_get_job/${id?.id}`);
                if (response) {
                    setData(response?.data[0])
                }
            } catch (error) {
                handleError(error);
            } finally {
                setTableLoader(true)
            }
        }
    }
    useEffect(() => {
        fetchData(1);
    }, []);


    return (
        <>
            <div className=" mx-auto bg-gray-100 lg:px-8 max-w-5xl pb-15 mb-8 min-h-screen mt-4">
                <form onSubmit={formik.handleSubmit} className='border p-4 bg-white mt-3 rounded-lg'>

                    <h1
                        className=" font-semibold leading-6 text-gray-900 text-center text-2xl pb-5 mt-5"
                    >
                        View Job Details
                    </h1>
                    {tableLoader && <>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            {/* Job Title */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    name="job_title"
                                    onChange={formik.handleChange}
                                    value={formik.values.job_title}
                                    disabled="true"
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                />
                                {formik.errors.job_title && (
                                    <p className="mt-2 text-sm text-red-600">{formik.errors.job_title}</p>
                                )}
                            </div>

                            {/* Job Type */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">
                                    Job Type
                                </label>
                                <Select
                                    options={dropDownValues?.industries.map((value) => ({
                                        value: value.id,
                                        label: value.name,
                                    }))}
                                    isDisabled={true}
                                    isClearable={true}

                                    isSearchable={true}
                                    className=" text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    onChange={(selectedOption) => {
                                        formik.setFieldValue(
                                            "job_type",
                                            selectedOption ? selectedOption.value : ""
                                        );
                                    }}
                                    defaultValue={{
                                        value: data?.job_type?.id,
                                        label: data?.job_type?.name
                                    }}
                                />

                                {formik.errors.job_type && (
                                    <p className="mt-2 text-sm text-red-600">{formik.errors.job_type}</p>
                                )}
                            </div>
                            {/* Salary Range */}
                            {/* <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">
                                    Salary Range
                                </label>
                                <input
                                    type="text"
                                    name="expected_salary"
                                    onChange={formik.handleChange}
                                    value={formik.values.expected_salary}

                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                />
                                {formik.errors.expected_salary && (
                                    <p className="mt-2 text-sm text-red-600">{formik.errors.expected_salary}</p>
                                )}
                            </div> */}

                            {/* Location */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">
                                    Location
                                </label>
                                <input
                                    disabled="true"
                                    type="text"
                                    name="location"
                                    onChange={formik.handleChange}
                                    value={formik.values.location}

                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                />
                                {formik.errors.location && (
                                    <p className="mt-2 text-sm text-red-600">{formik.errors.location}</p>
                                )}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    name="job_end_date"
                                    onChange={formik.handleChange}
                                    value={formik.values.job_end_date}
                                    disabled="true"
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                />
                                {formik.errors.job_end_date && (
                                    <p className="mt-2 text-sm text-red-600">{formik.errors.job_end_date}</p>
                                )}
                            </div>

                            {/* Job Status */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">
                                    Job Status
                                </label>
                                <select
                                    disabled="true"
                                    name="job_status"
                                    onChange={formik.handleChange}
                                    value={formik.values.job_status}

                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                >
                                    <option value="">Select</option>
                                    <option value={1}>Open</option>
                                    <option value={2}>Closed</option>
                                </select>
                                {formik.errors.job_status && (
                                    <p className="mt-2 text-sm text-red-600">{formik.errors.job_status}</p>
                                )}
                            </div>


                            {/* Veritas To Shortlist */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">
                                    Veritas To Shortlist
                                </label>
                                <select
                                    disabled="true"
                                    name="veritas_to_short_list"
                                    onChange={formik.handleChange}

                                    value={formik.values.veritas_to_short_list}
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                >
                                    <option value="">Select</option>
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
                                </select>
                                {formik.errors.veritas_to_short_list && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {formik.errors.veritas_to_short_list}
                                    </p>
                                )}
                            </div>
                            {/* Job Description */}
                            <div className="sm:col-span-full">
                                <label className="block text-sm font-medium text-gray-900">
                                    Job Description
                                </label>
                                <ReactQuill
                                    id="job_description"
                                    theme="bubble"
                                    value={formik.values.job_description}
                                    readOnly={true}
                                    onChange={(value) => formik.setFieldValue("job_description", value)}
                                    style={{
                                        height: "150px",
                                    }}
                                // modules={{
                                //     toolbar: [
                                //         ["bold", "italic", "underline", "strike"],
                                //         [{ header: [1, 2, 3, false] }],
                                //         [{ list: "ordered" }, { list: "bullet" }],
                                //         ["clean"],
                                //     ],
                                // }}
                                // formats={[
                                //     "header",
                                //     "bold",
                                //     "italic",
                                //     "underline",
                                //     "strike",
                                //     "list",
                                //     "bullet",
                                // ]}
                                // placeholder="Write something"
                                />
                                {/* {formik.errors.job_description && (
                                    <p className="mt-2 text-sm text-red-600">{formik.errors.job_description}</p>
                                )} */}
                            </div>

                            {/* Job_qualification */}
                            <div className="sm:col-span-full mt-20 sm:mt-7">
                                <label className="block text-sm font-medium text-gray-900">
                                    Job Qualification
                                </label>
                                <ReactQuill
                                    id="job_qualification"

                                    theme="bubble"
                                    value={formik.values.job_qualification}
                                    onChange={(value) => formik.setFieldValue("job_qualification", value)}
                                    style={{
                                        height: "150px",
                                    }}
                                    readOnly={true}
                                    // modules={{
                                    //     toolbar: [
                                    //         ["bold", "italic", "underline", "strike"],
                                    //         [{ header: [1, 2, 3, false] }],
                                    //         [{ list: "ordered" }, { list: "bullet" }],
                                    //         ["clean"],
                                    //     ],
                                    // }}
                                    // formats={[
                                    //     "header",
                                    //     "bold",
                                    //     "italic",
                                    //     "underline",
                                    //     "strike",
                                    //     "list",
                                    //     "bullet",
                                    // ]}
                                    // placeholder="Write something"
                                />
                                {/* {formik.errors.job_qualification && (
                                    <p className="mt-2 text-sm text-red-600">{formik.errors.job_qualification}</p>
                                )} */}
                            </div>
                            <div className="sm:col-span-full mt-20 sm:mt-7">
                                <label className="block text-sm font-medium text-gray-900">
                                    Job Responsibilities
                                </label>
                                <ReactQuill
                                    id="job_responsibilities"
                                    theme="bubble"
                                    readOnly={true}
                                    value={formik.values.job_responsibilities}
                                    onChange={(value) => formik.setFieldValue("job_responsibilities", value)}
                                    style={{
                                        height: "150px",
                                    }}
                                    // modules={{
                                    //     toolbar: [
                                    //         ["bold", "italic", "underline", "strike"],
                                    //         [{ header: [1, 2, 3, false] }],
                                    //         [{ list: "ordered" }, { list: "bullet" }],
                                    //         ["clean"],
                                    //     ],
                                    // }}
                                    // formats={[
                                    //     "header",
                                    //     "bold",
                                    //     "italic",
                                    //     "underline",
                                    //     "strike",
                                    //     "list",
                                    //     "bullet",
                                    // ]}
                                    // placeholder="Write something"
                                />
                                {/* {formik.errors.job_responsibilities && (
                                    <p className="mt-2 text-sm text-red-600">{formik.errors.job_responsibilities}</p>
                                )} */}
                            </div>

                            {/* Instruction to Apply */}
                            <div className="sm:col-span-full mt-20 sm:mt-7">
                                <label className="block text-sm font-medium text-gray-900">
                                    Instruction to Apply
                                </label>
                                <ReactQuill
                                    id="job_instructions_to_apply"
                                    theme="bubble"
                                    readOnly={true}
                                    value={formik.values.job_instructions_to_apply}
                                    onChange={(value) => formik.setFieldValue("job_instructions_to_apply", value)}
                                    style={{
                                        height: "150px",
                                    }}
                                    // modules={{
                                    //     toolbar: [
                                    //         ["bold", "italic", "underline", "strike"],
                                    //         [{ header: [1, 2, 3, false] }],
                                    //         [{ list: "ordered" }, { list: "bullet" }],
                                    //         ["clean"],
                                    //     ],
                                    // }}
                                    // formats={[
                                    //     "header",
                                    //     "bold",
                                    //     "italic",
                                    //     "underline",
                                    //     "strike",
                                    //     "list",
                                    //     "bullet",
                                    // ]}
                                    // placeholder="Write something"
                                />
                                {/* {formik.errors.job_instructions_to_apply && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {formik.errors.job_instructions_to_apply}
                                    </p>
                                )} */}
                            </div>

                        </div>


                        <div className="mt-25 sm:mt-15 sm:flex sm:flex-row-reverse">
                            {/* {
                                formik.isSubmitting ? (
                                    <InfinitySpin height={120} width={120} color="green" />
                                ) : (
                                    <>
                                        <Button type="submit" color="gradient" variant="solid">
                                            Save
                                        </Button>

                                    </>
                                )
                            } */}
                        </div>
                    </>}

                </form>
            </div>
        </>
    );
};


import { MinusIcon, PlusIcon, PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "../../../Components/Button";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { toast } from "sonner";
import { InfinitySpin } from "react-loader-spinner";
import DeleteModal from "../../../Components/DeleteModal";
import { LoaderTable } from "../../../Components/LoaderTable";
import { Skeleton } from "../../../Components/Skeleton";
export default function Experience() {
    const [exp, setExp] = useState(true);
    const [editExp, setEditExp] = useState(false);
    const handleExp = () => {
        setExp(!exp);
        if (!exp) {
            setEditExp(false);
        }
    };
    const [data, setData] = useState();
    const [tableLoader, setTableLoader] = useState(false);
    const [updateData, setUpdateData] = useState(null)
    const [loading, setLoading] = useState(false);
    const user_id = localStorage.user_id;
    const formik = useFormik({
        initialValues: {
            job_title: updateData?.job_title || "",
            company: updateData?.company || "",
            industry: updateData?.industry || "",
            // salary: updateData?.salary || "",
            location: updateData?.location || "",
            managed_team: updateData?.managed_team || true,
            start_date: updateData?.start_date || "",
            end_date: updateData?.end_date || "",
            currently_working_here: updateData?.currently_working_here || false,
            details: updateData?.details || "",
            user_id: user_id,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            job_title: Yup.string().required("Job Title is required"),
            company: Yup.string().required("Company is required"),
            industry: Yup.string().required("Industry is required"),
            // salary: Yup.string().required("Salary is required"),
            location: Yup.string().required("Location is required"),
            start_date: Yup.date().required("Start Date is required"),
            // end_date: Yup.date().when("currently_working_here", {
            //     is: (currentlyWorkingHere) => currentlyWorkingHere === false, // Ensure it's explicitly checked
            //     then: Yup.date().required("End Date is required"),
            // }),

        }),
        onSubmit: async (values) => {

            setLoading(true);
            if (updateData) {
                try {
                    const response = await axiosInstance.post(`api/job_seeker_experience/update/${updateData?.id}`, values);
                    if (response) {
                        toast.success("Experience Data Saved")
                        formik.resetForm();
                    }
                } catch (error) {
                    handleError(error);
                } finally {
                    setEditExp(false);
                    fetchData()
                    setLoading(false);
                    setUpdateData(null)
                }
            }
            else {
                try {
                    const response = await axiosInstance.post(`api/job_seeker_experience/store`, values);
                    if (response) {
                        toast.success("Experience Data Saved")
                        formik.resetForm();
                    }
                } catch (error) {
                    handleError(error);
                } finally {
                    setEditExp(false);
                    fetchData()
                    setLoading(false);
                    setUpdateData(null)
                }
            }
        },
    });
    const fetchData = async () => {
        setTableLoader(true)
        try {
            const response = await axiosInstance.get(`api/job_seeker_experience?user_id=${user_id}`);
            if (response) {
                setData(response?.data)
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
        }
    }
    const update = (item) => {
        setEditExp(true)
        setUpdateData(item)
    }
    const [isDelete, setIsDelete] = useState(false)
    const [endpoint, setEndpoint] = useState()
    const deleteHandler = (data) => {
        setEndpoint(`api/job_seeker_experience/destroy/${data?.id}`)
        setIsDelete(true)

    }
    const closeDeleteModal = () => {
        setIsDelete(false);
        fetchData();
    }
    // useEffect(() => {
    //     fetchData();
    // }, [isDelete]);
    return (
        <>
            <div className="flex justify-center sm:px-0">
                <DeleteModal
                    isOpen={isDelete}
                    onClose={closeDeleteModal}
                    name="Experience"
                    endpoint={endpoint}
                />
                <div className="p-4 w-full max-w-5xl">
                    <div className={`border rounded-md shadow-lg ${exp ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 text-[#ff0000] bg-white border-b cursor-pointer"
                            onClick={() => {
                                handleExp()
                                fetchData();
                            }}
                        >
                            <h3 className="font-bold text-xl">Experience</h3>
                            <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                                {exp ? (
                                    <PlusIcon onClick={() => {
                                        handleExp()
                                        fetchData();
                                    }}
                                        className="block h-6 w-6 text-[#008604] hover:scale-[160%] duration-300" />
                                ) : (
                                    <MinusIcon onClick={() => {
                                        handleExp()
                                    }}
                                        className="block h-6 w-6 text-[#ff0000] hover:scale-[160%] duration-300" />
                                )}
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className={`relative space-y-7 overflow-x-hidden bg-white transition-all duration-300 ease-in-out ${exp ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {/* Edit Button in Body */}
                            {tableLoader ? (
                                <Skeleton />
                            ) : (
                                <>
                                    {!editExp && !exp && (
                                        data?.length > 0 ? (
                                            data.map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className="border-b p-3 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center relative"
                                                >
                                                    {/* Action Buttons */}
                                                    <div className="flex sm:absolute sm:right-4 sm:top-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => update(item)}
                                                            className="hover:bg-gray-100 rounded-full p-2 focus:outline-none transition-colors"
                                                        >
                                                            <PencilIcon className="h-5 w-5 text-blue-500" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteHandler(item)}
                                                            className="hover:bg-gray-100 rounded-full p-2 focus:outline-none transition-colors"
                                                        >
                                                            <TrashIcon className="h-5 w-5 text-red-600" />
                                                        </button>
                                                    </div>

                                                    {/* Profile Information */}
                                                    {!editExp && (
                                                        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 sm:items-center">
                                                            {/* Job Details */}
                                                            <div>
                                                                <h4 className="font-semibold text-lg">{item?.job_title}</h4>
                                                                <p className="text-sm text-gray-600">
                                                                    {item?.company} - {item?.industry}
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    {item?.start_date} - {item?.currently_working_here ? "Present" : item?.end_date} | {item?.location}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                            ))
                                        ) : (
                                            <div>No Experiences have been added yet</div>
                                        )
                                    )}

                                    {!editExp && (
                                        <div className="mt-4 flex justify-center">
                                            <button
                                                type="button"
                                                onClick={() => setEditExp(true)}
                                                className="bg-[#ff0000] hover:bg-[#ff0000] rounded-full p-1 text-white shadow-md transition-all"
                                            >
                                                <PlusIcon className=" h-5 w-5" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Edit Profile Form */}
                            {editExp && (
                                <form className="" onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label htmlFor="job_title" className="block text-sm font-medium text-gray-900">Job Title *</label>
                                            <input
                                                type="text"
                                                id="job_title"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                value={formik.values.job_title}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.job_title && formik.errors.job_title && (
                                                <p className="text-red-500 text-sm">{formik.errors.job_title}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="company" className="block text-sm font-medium text-gray-900">Company *</label>
                                            <input
                                                type="text"
                                                id="company"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                value={formik.values.company}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.company && formik.errors.company && (
                                                <p className="text-red-500 text-sm">{formik.errors.company}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="industry" className="block text-sm font-medium text-gray-900">Industry *</label>
                                            <input
                                                type="text"
                                                id="industry"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                value={formik.values.industry}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.industry && formik.errors.industry && (
                                                <p className="text-red-500 text-sm">{formik.errors.industry}</p>
                                            )}
                                        </div>
                                        {/* <div>
                                            <label htmlFor="salary" className="block text-sm font-medium text-gray-900">Salary *</label>
                                            <input
                                                type="text"
                                                id="salary"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                value={formik.values.salary}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.salary && formik.errors.salary && (
                                                <p className="text-red-500 text-sm">{formik.errors.salary}</p>
                                            )}
                                        </div> */}

                                        <div>
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-900">Location *</label>
                                            <input
                                                type="text"
                                                id="location"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                value={formik.values.location}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.location && formik.errors.location && (
                                                <p className="text-red-500 text-sm">{formik.errors.location}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mt-2">Did you directly manage a team? *</label>
                                            <div className="flex items-center gap-4 mt-2">
                                                <label htmlFor="manageYes" className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="manageYes"
                                                        name="managed_team"
                                                        value={formik.values.managed_team}
                                                        className="mr-2"
                                                        onChange={() => formik.setFieldValue("managed_team", true)}
                                                    />
                                                    Yes
                                                </label>
                                                <label htmlFor="manageNo" className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="manageNo"
                                                        name="managed_team"
                                                        value={formik.values.managed_team}
                                                        className="mr-2"
                                                        onChange={() => formik.setFieldValue("managed_team", false)}
                                                    />
                                                    No
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="start_date" className="block text-sm font-medium text-gray-900">Start Date *</label>
                                            <input
                                                type="date"
                                                id="start_date"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                value={formik.values.start_date}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.start_date && formik.errors.start_date && (
                                                <p className="text-red-500 text-sm">{formik.errors.start_date}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="end_date" className="block text-sm font-medium text-gray-900">End Date *</label>
                                            <input
                                                type="date"
                                                id="end_date"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                value={formik.values.end_date}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled={formik.values.currently_working_here}
                                            />
                                            {formik.touched.end_date && formik.errors.end_date && (
                                                <p className="text-red-500 text-sm">{formik.errors.end_date}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-6">
                                            <input
                                                type="checkbox"
                                                id="currently_working_here"
                                                checked={formik.values.currently_working_here}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500"
                                            />
                                            <label htmlFor="currently_working_here" className="text-sm font-medium text-gray-900">Currently Working here</label>

                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="details" className="block text-sm font-medium text-gray-900">Details</label>
                                            <ReactQuill
                                                id="details"
                                                theme="snow"
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
                                                value={formik.values.details}
                                                onChange={(value) => formik.setFieldValue("details", value)}
                                            />
                                            {formik.touched.details && formik.errors.details && (
                                                <p className="text-red-500 text-sm">{formik.errors.details}</p>
                                            )}
                                        </div>

                                        {/* <div className="col-span-full">
                                            <label htmlFor="details" className="block text-sm font-medium text-gray-900">Details</label>
                                            <textarea
                                                id="details"
                                                rows={4}
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div> */}
                                    </div>

                                    <div className="flex justify-center gap-4 sm:mt-20 mt-25">
                                        {loading ? <div className="flex justify-center mr-5"><InfinitySpin width={150} color="green" /></div> :
                                            <>
                                                <Button
                                                    type="button"
                                                    color="gradient"
                                                    variant="outline"
                                                    onClick={() => (
                                                        setEditExp(false),
                                                        setUpdateData(null)
                                                    )}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    color="gradient"
                                                    variant="solid"
                                                    className="text-white"
                                                >
                                                    Save
                                                </Button>
                                            </>
                                        }
                                    </div>
                                </form>


                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
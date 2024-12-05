import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FallingLines } from "react-loader-spinner";
import { Button } from "../../Components/Button";

const AddJob = ({ isOpen, onClose, success, error }) => {
    const formik = useFormik({
        initialValues: {
            job_title: "",
            job_type: "",
            job_description: "",
            qualifications: "",
            responsibilities: "",
            salary_range: "",
            location: "",
            job_status: "",
            date_posted: "",
            expiration_date: "",
            veritasto_shortlist: "",
            instruction_to_apply: "",
        },
        validationSchema: Yup.object({
            job_title: Yup.string().required("Job title is required"),
            job_type: Yup.string().required("Job type is required"),
            job_description: Yup.string().required("Job description is required"),
            qualifications: Yup.string().required("Qualifications are required"),
            responsibilities: Yup.string().required("Responsibilities are required"),
            salary_range: Yup.string().required("Salary range is required"),
            location: Yup.string().required("Location is required"),
            job_status: Yup.string().required("Job status is required"),
            date_posted: Yup.date().required("Date posted is required"),
            expiration_date: Yup.date().required("Expiration date is required"),
            instruction_to_apply: Yup.string().required("Instructions to apply are required"),
            veritasto_shortlist: Yup.string().required("This field is required"),
        }),
        onSubmit: async (values) => {
            try {
                console.log("Form submitted:", values);
                success("Job added successfully");
                onClose(false);
            } catch (err) {
                console.error("Error submitting form:", err);
                error("Failed to add job");
            } finally {
                formik.resetForm();
            }
        },
    });

    return (
        <Dialog open={isOpen} onClose={() => onClose(false)} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-[40rem] sm:p-6">
                        <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                            <button
                                type="button"
                                onClick={() => onClose(false)}
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <DialogTitle
                                as="h3"
                                className="text-base font-semibold leading-6 text-gray-900"
                            >
                                Add Job
                            </DialogTitle>
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
                                    <select
                                        name="job_type"
                                        onChange={formik.handleChange}
                                        value={formik.values.job_type}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    >
                                        <option value="">Select</option>
                                        <option value="full-time">Full-Time</option>
                                        <option value="part-time">Part-Time</option>
                                    </select>
                                    {formik.errors.job_type && (
                                        <p className="mt-2 text-sm text-red-600">{formik.errors.job_type}</p>
                                    )}
                                </div>
                                {/* Salary Range */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Salary Range
                                    </label>
                                    <input
                                        type="text"
                                        name="salary_range"
                                        onChange={formik.handleChange}
                                        value={formik.values.salary_range}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.salary_range && (
                                        <p className="mt-2 text-sm text-red-600">{formik.errors.salary_range}</p>
                                    )}
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
                                    {formik.errors.location && (
                                        <p className="mt-2 text-sm text-red-600">{formik.errors.location}</p>
                                    )}
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
                                        <option value="active">Active</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                    {formik.errors.job_status && (
                                        <p className="mt-2 text-sm text-red-600">{formik.errors.job_status}</p>
                                    )}
                                </div>

                                {/* Date Posted */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Date Posted
                                    </label>
                                    <input
                                        type="date"
                                        name="date_posted"
                                        onChange={formik.handleChange}
                                        value={formik.values.date_posted}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.date_posted && (
                                        <p className="mt-2 text-sm text-red-600">{formik.errors.date_posted}</p>
                                    )}
                                </div>

                                {/* Expiration Date */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Expiration Date
                                    </label>
                                    <input
                                        type="date"
                                        name="expiration_date"
                                        onChange={formik.handleChange}
                                        value={formik.values.expiration_date}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.expiration_date && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.expiration_date}
                                        </p>
                                    )}
                                </div>


                                {/* Veritas To Shortlist */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Veritas To Shortlist
                                    </label>
                                    <select
                                        name="veritasto_shortlist"
                                        onChange={formik.handleChange}
                                        value={formik.values.veritasto_shortlist}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    >
                                        <option value="">Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                    {formik.errors.veritasto_shortlist && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.veritasto_shortlist}
                                        </p>
                                    )}
                                </div>
                                {/* Job Description */}
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Job Description
                                    </label>
                                    <textarea
                                        name="job_description"
                                        onChange={formik.handleChange}
                                        value={formik.values.job_description}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        rows={4}
                                    />
                                    {formik.errors.job_description && (
                                        <p className="mt-2 text-sm text-red-600">{formik.errors.job_description}</p>
                                    )}
                                </div>

                                {/* Qualifications */}
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Qualifications
                                    </label>
                                    <textarea
                                        name="qualifications"
                                        onChange={formik.handleChange}
                                        value={formik.values.qualifications}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        rows={4}
                                    />
                                    {formik.errors.qualifications && (
                                        <p className="mt-2 text-sm text-red-600">{formik.errors.qualifications}</p>
                                    )}
                                </div>

                                {/* Responsibilities */}
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Responsibilities
                                    </label>
                                    <textarea
                                        name="responsibilities"
                                        onChange={formik.handleChange}
                                        value={formik.values.responsibilities}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        rows={4}
                                    />
                                    {formik.errors.responsibilities && (
                                        <p className="mt-2 text-sm text-red-600">{formik.errors.responsibilities}</p>
                                    )}
                                </div>

                                {/* Instruction to Apply */}
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Instruction to Apply
                                    </label>
                                    <textarea
                                        name="instruction_to_apply"
                                        onChange={formik.handleChange}
                                        value={formik.values.instruction_to_apply}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        rows={4}
                                    />
                                    {formik.errors.instruction_to_apply && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.instruction_to_apply}
                                        </p>
                                    )}
                                </div>

                            </div>

                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                {formik.isSubmitting ? (
                                    <FallingLines height={40} width={40} color="purple" />
                                ) : (
                                    <Button type="submit" color="gradient" variant="solid">
                                        Save
                                    </Button>
                                )}
                                <Button
                                    type="button"
                                    onClick={() => onClose(false)}
                                    color="gradient"
                                    variant="outline"
                                    className="mr-1"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default AddJob;

import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import axiosInstance, { handleError } from "../axiosInstance";
import { Button } from "./Button";

const JobReport = ({ isOpen, onClose, id }) => {
    const formik = useFormik({
        initialValues: {
            job_id: id,
            full_name: "",
            email: "",
            mobile_number: "",
            comments: "",
        },
        validationSchema: Yup.object({
            full_name: Yup.string().required("Full Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            mobile_number: Yup.string().required("Mobile Number is required"),
            comments: Yup.string().required("Comments are required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axiosInstance.post("/api/report_job/store", values);
                if (response) {
                    toast.success("Job report submitted successfully");
                    onClose(false);
                }
            } catch (err) {
                handleError(err);
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
                    <DialogPanel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-[30rem] sm:p-6">
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
                            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                Report a Job
                            </DialogTitle>

                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium text-gray-900">Full Name</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        onChange={formik.handleChange}
                                        value={formik.values.full_name}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.full_name && <p className="text-red-600 text-sm mt-1">{formik.errors.full_name}</p>}
                                </div>

                                {/* Email */}
                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium text-gray-900">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.email && <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>}
                                </div>

                                {/* Mobile Number */}
                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium text-gray-900">Mobile Number</label>
                                    <input
                                        type="text"
                                        name="mobile_number"
                                        onChange={formik.handleChange}
                                        value={formik.values.mobile_number}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.mobile_number && <p className="text-red-600 text-sm mt-1">{formik.errors.mobile_number}</p>}
                                </div>

                                {/* Reason */}
                                {/* <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium text-gray-900">Reason</label>
                                    <select
                                        name="reason"
                                        onChange={formik.handleChange}
                                        value={formik.values.reason}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    >
                                        <option value="">Select a reason</option>
                                        <option value="Scam">Scam</option>
                                        <option value="Incorrect Information">Incorrect Information</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {formik.errors.reason && <p className="text-red-600 text-sm mt-1">{formik.errors.reason}</p>}
                                </div> */}

                                {/* Comments */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-900">Comments</label>
                                    <textarea
                                        name="comments"
                                        onChange={formik.handleChange}
                                        value={formik.values.comments}
                                        rows="4"
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    ></textarea>
                                    {formik.errors.comments && <p className="text-red-600 text-sm mt-1">{formik.errors.comments}</p>}
                                </div>
                            </div>


                            <div className="mt-6 flex justify-end space-x-2">
                                <Button type="submit" color="gradient" variant="solid">
                                    Submit
                                </Button>
                                <Button type="button" onClick={() => onClose(false)} color="gradient" variant="outline">
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

export default JobReport;

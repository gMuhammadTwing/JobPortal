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
import { useState } from "react";
import { Button } from "../Button";

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
        <Dialog
            open={isOpen}
            onClose={() => onClose(false)}
            className="relative z-10"
        >
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
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
                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-12">
                                {/* Dynamically Render Fields */}
                                {Object.keys(formik.initialValues).map((fieldName, index) => {
                                    // Special case for Instruction to Apply
                                    if (fieldName === "instruction_to_apply") {
                                        return (
                                            <div className="sm:col-span-12" key={index}>
                                                <label className="block text-sm font-medium text-gray-900">
                                                    Instruction to Apply
                                                </label>
                                                <textarea
                                                    name={fieldName}
                                                    onChange={formik.handleChange}
                                                    value={formik.values[fieldName]}
                                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                    rows={4}
                                                />
                                                {formik.errors[fieldName] && (
                                                    <p className="mt-2 text-sm text-red-600">
                                                        {formik.errors[fieldName]}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            className={`sm:col-span-6`}
                                            key={index}
                                        >
                                            <label className="block text-sm font-medium text-gray-900 capitalize">
                                                {fieldName.replace(/_/g, " ")}
                                            </label>
                                            {fieldName === "job_type" ||
                                            fieldName === "job_status" ||
                                            fieldName === "veritasto_shortlist" ? (
                                                <select
                                                    name={fieldName}
                                                    onChange={formik.handleChange}
                                                    value={formik.values[fieldName]}
                                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                >
                                                    <option value="">Select</option>
                                                    {fieldName === "job_type" && (
                                                        <>
                                                            <option value="full-time">Full-Time</option>
                                                            <option value="part-time">Part-Time</option>
                                                        </>
                                                    )}
                                                    {fieldName === "job_status" && (
                                                        <>
                                                            <option value="active">Active</option>
                                                            <option value="closed">Closed</option>
                                                        </>
                                                    )}
                                                    {fieldName === "veritasto_shortlist" && (
                                                        <>
                                                            <option value="yes">Yes</option>
                                                            <option value="no">No</option>
                                                        </>
                                                    )}
                                                </select>
                                            ) : (
                                                <input
                                                    type={fieldName.includes("date") ? "date" : "text"}
                                                    name={fieldName}
                                                    onChange={formik.handleChange}
                                                    value={formik.values[fieldName]}
                                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                />
                                            )}
                                            {formik.errors[fieldName] && (
                                                <p className="mt-2 text-sm text-red-600">
                                                    {formik.errors[fieldName]}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
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

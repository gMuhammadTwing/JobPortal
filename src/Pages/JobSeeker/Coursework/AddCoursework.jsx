import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../../../Components/Button";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { toast } from "sonner";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";

const AddCoursework = ({ isOpen, onClose, id, view, data }) => {
    const [loader, setLoader] = useState(false)
    const formik = useFormik({
        initialValues: {
            subject_name: data?.subject_name || "",
            grade_obtained: data?.grade_obtained || "",
            details: data?.details || "",
            educational_institue_id: id,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            subject_name: Yup.string().required("Course title is required"),
            grade_obtained: Yup.string().required("Grade obtained is required"),
            details: Yup.string().required("Details are required"),
        }),
        onSubmit: async (values) => {
            setLoader(true);
            if (data) {
                try {
                    const response = await axiosInstance.post(`/api/job_seeker_course_work/update/${data?.id}`, values);
                    if (response) {
                        toast.success("Course Data Saved")
                        formik.resetForm();
                    }
                } catch (error) {
                    handleError(error);
                } finally {
                    formik.resetForm();
                    onClose(false);
                    setLoader(false);
                }
            }
            else {
                try {
                    const response = await axiosInstance.post(`/api/job_seeker_course_work/store`, values);
                    if (response) {
                        toast.success("Course Data Saved")
                        formik.resetForm();
                    }
                } catch (error) {
                    handleError(error);
                } finally {
                    formik.resetForm();
                    onClose(false);
                    setLoader(false);
                }
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
            <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                <DialogPanel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:w-full sm:max-w-3xl sm:p-6">
                    {/* Close Button */}
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
                            {view ? "View Coursework" : (
                                data ? "Update Coursework" :
                                    "Add Coursework"
                            )}
                        </DialogTitle>
                        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-12 items-center">
                            {/* Course Title */}
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-900">
                                    Course Title
                                </label>
                                <input
                                    type="text"
                                    name="subject_name"
                                    onChange={formik.handleChange}
                                    value={formik.values.subject_name}
                                    disabled={view}
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                />
                                {formik.touched.subject_name && formik.errors.subject_name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {formik.errors.subject_name}
                                    </p>
                                )}
                            </div>

                            {/* Grade Obtained */}
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-900">
                                    Grade Obtained
                                </label>
                                <input
                                    type="text"
                                    name="grade_obtained"
                                    onChange={formik.handleChange}
                                    value={formik.values.grade_obtained}
                                    disabled={view}
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                />
                                {formik.touched.grade_obtained &&
                                    formik.errors.grade_obtained && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {formik.errors.grade_obtained}
                                        </p>
                                    )}
                            </div>

                            {/* Details */}
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-gray-900">
                                    Details
                                </label>
                                <textarea
                                    type="text"
                                    rows={5}
                                    name="details"
                                    disabled={view}
                                    onChange={formik.handleChange}
                                    value={formik.values.details}
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                />
                                {formik.touched.details && formik.errors.details && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {formik.errors.details}
                                    </p>
                                )}
                            </div>
                        </div>
                        {!view && (
                            <div className="mt-8 sm:flex sm:flex-row-reverse">
                                {loader ? <div className="flex justify-center mr-5"><InfinitySpin width={150} color="green" /></div> :
                                    <>
                                        <Button type="submit" color="gradient" variant="solid">
                                            Save
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => onClose(false)}
                                            color="gradient"
                                            variant="outline"
                                            className="mr-1"
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                }
                            </div>
                        )}
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default AddCoursework;

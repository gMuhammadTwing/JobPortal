import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    Switch,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FallingLines, InfinitySpin } from "react-loader-spinner";
import { useState } from "react";
import { Button } from "../../../Components/Button";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { toast } from "sonner";

const AddResume = ({ isOpen, onClose, success, error, updateData }) => {
    const user_id = localStorage.user_id;
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const formik = useFormik({
        initialValues: {
            is_current: updateData?.is_current || false,
            resume_file: updateData?.resume_file || '',
        },
        validationSchema: Yup.object({
            resume_file: Yup.mixed().required("File is required"),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("is_current", values.is_current);
            if (file) {
                formData.append("resume_file", file);
            }
            formData.append("user_id", user_id);

            if (updateData) {
                try {
                    const response = await axiosInstance.post(`api/job_seeker_resume/update/${updateData?.id}`, formData);
                    if (response) {
                        toast.success("Resume Data Saved")
                    }
                } catch (error) {
                    handleError(error);
                } finally {
                    setFile(null)
                    onClose();
                    formik.resetForm();
                }
            }
            else {
                try {
                    const response = await axiosInstance.post(`api/job_seeker_resume/store`, formData);
                    if (response) {
                        toast.success("Resume Data Saved")
                    }
                } catch (error) {
                    handleError(error);
                } finally {
                    setFile(null)
                    onClose();
                    formik.resetForm();
                }
            }
        },
    });
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    return (
        <Dialog open={isOpen} onClose={() => onClose(false)} className="relative z-10">
    <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
        <DialogPanel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl w-full max-w-md sm:max-w-xl sm:p-6">
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
                <div className="mt-3 sm:mt-0">
                    <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                        {updateData ? "Update Resume" : "Add Resume"}
                    </DialogTitle>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-4">
                        <div className="col-span-full text-gray-600">
                            <strong>Upload Options:</strong>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>Max size: 3MB</li>
                                <li>Formats: PDF, DOCX</li>
                                <li>No password protection</li>
                                <li>No macros or viruses</li>
                            </ul>
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Upload File
                            </label>
                            <input
                                type="file"
                                name="resume_file"
                                onChange={(event) => {
                                    handleFileChange(event);
                                    formik.setFieldValue("resume_file", event.target.files[0]);
                                }}
                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-blue-500 focus:border-blue-500 mt-2"
                            />
                            {formik.errors.resume_file && (
                                <div className="text-red-500 text-sm">
                                    {formik.errors.resume_file}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center sm:mt-5 sm:col-span-1">
                            <Switch
                                checked={formik.values.is_current}
                                onClick={() => formik.setFieldValue("is_current", !formik.values.is_current)}
                                className="relative inline-flex h-5 w-10 cursor-pointer items-center rounded-full focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    className={`absolute h-full w-full rounded-md transition-colors ${formik.values.is_current ? "bg-indigo-600" : "bg-gray-200"}`}
                                />
                                <span
                                    aria-hidden="true"
                                    className={`absolute left-0 inline-block h-5 w-5 transform rounded-full border bg-white shadow ring-0 transition-transform ${formik.values.is_current ? "translate-x-5" : "translate-x-0"}`}
                                />
                            </Switch>
                            <label className="ml-2 text-sm font-medium text-gray-900">
                                {formik.values.is_current ? "Active" : "Inactive"}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row sm:justify-end sm:space-x-2">
                    {formik.isSubmitting ? (
                        <InfinitySpin height={120} width={120} color="green" />
                    ) : (
                        <>
                            <Button type="submit" color="gradient" variant="solid">
                                Save
                            </Button>
                            <Button
                                type="button"
                                onClick={() => onClose(false)}
                                color="gradient"
                                variant="outline"
                                className="mt-2 sm:mt-0"
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </div>
            </form>
        </DialogPanel>
    </div>
</Dialog>

    );
};

export default AddResume;

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

const AddResume = ({ isOpen, onClose, success, error }) => {
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            upload_file: null,
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            upload_file: Yup.mixed().required("File is required"),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("upload_file", file);

            try {
                // API call to submit data
                console.log("Form submitted:", formData);
                onClose(false); // Close the dialog on success
            } catch (error) {
                console.error("Error submitting form:", error);
            } finally {
                formik.resetForm();
                setFile(null);
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
                            <div className="mt-3 sm:mt-0">
                                <DialogTitle
                                    as="h3"
                                    className="text-base font-semibold leading-6 text-gray-900"
                                >
                                    Add Resume
                                </DialogTitle>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full text-gray-600">
                                        <strong>Upload Options:</strong>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Not be larger than 3 MB in size</li>
                                            <li>Only Word Document or PDF files are allowed</li>
                                            <li>Should not be password-protected</li>
                                            <li>Should not contain any macros or viruses</li>
                                            <li>Printing rights must be granted to everyone</li>
                                        </ul>
                                    </div>
                                    {/* Title Field */}
                                    <div className="sm:col-span-6">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            onChange={formik.handleChange}
                                            value={formik.values.title}
                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        />
                                        {formik.errors.title && (
                                            <div className="text-red-500 text-sm">
                                                {formik.errors.title}
                                            </div>
                                        )}
                                    </div>

                                    {/* Upload File Field */}
                                    <div className="sm:col-span-6">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Upload File
                                        </label>
                                        <input
                                            type="file"
                                            name="upload_file"
                                            onChange={(event) => {
                                                handleFileChange(event);
                                                formik.setFieldValue("upload_file", event.target.files[0]);
                                            }}
                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        />
                                        {formik.errors.upload_file && (
                                            <div className="text-red-500 text-sm">
                                                {formik.errors.upload_file}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                {formik.isSubmitting ? (
                                    <FallingLines height={40} width={40} color="purple" />
                                ) : (
                                    <Button
                                        type="submit"
                                        color="gradient"
                                        variant="solid"
                                    >
                                        Save
                                    </Button>
                                )}
                                <Button
                                    type="button"
                                    onClick={() => onClose(false)}
                                    color="gradient"
                                    variant="outline"
                                    className={"mr-1"}
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

export default AddResume;

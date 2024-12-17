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
import { Button } from "../../../Components/Button";
import ReactQuill from "react-quill";

const AddBlogPost = ({ isOpen, onClose, success, error }) => {
    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
            author: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            content: Yup.string().required("Content is required"),
            author: Yup.string().required("Author is required"),
        }),
        onSubmit: async (values) => {
            try {
                console.log("Blog post submitted:", values);
                success("Blog post added successfully");
                onClose(false);
            } catch (err) {
                console.error("Error submitting form:", err);
                error("Failed to add blog post");
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
                                Add Blog Post
                            </DialogTitle>
                            <div className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-12">
                                {/* Title */}
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
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
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.title}
                                        </p>
                                    )}
                                </div>
                                {/* Author */}
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Author
                                    </label>
                                    <input
                                        type="text"
                                        name="author"
                                        onChange={formik.handleChange}
                                        value={formik.values.author}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.author && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.author}
                                        </p>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="sm:col-span-full">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Content
                                    </label>
                                    <ReactQuill
                                        id="content"
                                        theme="snow"
                                        value={formik.values.content}
                                        onChange={formik.handleChange}
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
                                    {/* <textarea
                                        name="content"
                                        onChange={formik.handleChange}
                                        value={formik.values.content}
                                        rows="4"
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    /> */}
                                    {formik.errors.content && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.content}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-15 sm:mt-14 sm:flex sm:flex-row-reverse">
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

export default AddBlogPost;

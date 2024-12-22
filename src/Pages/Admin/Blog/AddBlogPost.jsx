import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FallingLines, InfinitySpin } from "react-loader-spinner";
import { Button } from "../../../Components/Button";
import ReactQuill from "react-quill";
import { toast } from "sonner";
import axiosInstance, { handleError } from "../../../axiosInstance";

const AddBlogPost = ({ isOpen, onClose, data, view }) => {
    const formik = useFormik({
        initialValues: {
            title: data?.title || "",
            content: data?.content || "",
            is_published: data?.is_published ? 1 : 0,
            thumbnail: data?.thumbnail || null,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            // content: Yup.string().required("Content is required"),
            is_published: Yup.string().required("Publishing status is required"),
            thumbnail: Yup.mixed().required("Thumbnail is required"),
        }),
        onSubmit: async (values) => {
            if (data) {
                try {
                    const formData = new FormData();
                    formData.append("title", values.title);
                    formData.append("content", values.content);
                    formData.append("is_published", values.is_published);
                    formData.append("thumbnail", values.thumbnail);

                    const response = await axiosInstance.post(`/api/blogs/update/${data?.id}`, formData);
                    if (response) {
                        toast.success("Blog data saved successfully")
                        onClose(false);
                    }
                } catch (err) {
                    handleError(err);
                } finally {
                    formik.resetForm();
                }
            }
            else {
                try {
                    const formData = new FormData();
                    formData.append("title", values.title);
                    formData.append("content", values.content);
                    formData.append("is_published", values.is_published);
                    formData.append("thumbnail", values.thumbnail);

                    const response = await axiosInstance.post(`/api/blogs/store`, formData);
                    if (response) {
                        toast.success("Blog data saved successfully")
                        onClose(false);
                    }
                } catch (err) {
                    handleError(err);
                } finally {
                    formik.resetForm();
                }
            }
        },
    });

    // Handle thumbnail file selection
    const handleFileChange = (event) => {
        formik.setFieldValue("thumbnail", event.currentTarget.files[0]);
    };

    return (
        <Dialog open={isOpen} onClose={() => onClose(false)} className="relative z-10">
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
                        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                {view ? (
                                    <div>View Blog Details</div>
                                ) :
                                    (
                                        data ? (
                                            <div>Update Blog Details</div>
                                        ) :
                                            (<div> Add Blog</div>)
                                    )}
                            </DialogTitle>

                            <div className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-12">
                                {/* Title */}
                                <div className="sm:col-span-12">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                        disabled={view}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.title && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.title}
                                        </p>
                                    )}
                                </div>
                                {/* Thumbnail */}
                                <div className="sm:col-span-6 mt-4">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Thumbnail Image
                                    </label>
                                    <input
                                        type="file"
                                        name="thumbnail"
                                        onChange={handleFileChange}
                                        disabled={view}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.thumbnail && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.thumbnail}
                                        </p>
                                    )}
                                </div>

                                {/* Is Published */}
                                <div className="sm:col-span-6 mt-4">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Publish Status
                                    </label>
                                    <select
                                        name="is_published"
                                        onChange={formik.handleChange}
                                        value={formik.values.is_published}
                                        disabled={view}
                                        className="block py-2 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    >
                                        <option value="">Select</option>
                                        <option value={0}>No</option>
                                        <option value={1}>Yes</option>
                                    </select>
                                    {formik.errors.is_published && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.is_published}
                                        </p>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="sm:col-span-12">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Content
                                    </label>
                                    <ReactQuill
                                        id="content"
                                        theme="snow"
                                        value={formik.values.content}
                                        onChange={(value) => formik.setFieldValue("content", value)}
                                        style={{ height: "150px" }}
                                        readOnly={view}
                                        modules={{
                                            toolbar: [
                                                ["bold", "italic", "underline", "strike"],
                                                [{ header: [1, 2, 3, false] }],
                                                [{ list: "ordered" }, { list: "bullet" }],
                                                ["clean"],
                                            ],
                                        }}
                                        formats={["header", "bold", "italic", "underline", "strike", "list", "bullet"]}
                                        placeholder="Write something..."
                                    />
                                    {formik.errors.content && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.content}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-15 sm:flex sm:flex-row-reverse">
                                {formik.isSubmitting ? (
                                    <InfinitySpin height={100} width={100} color="green" />
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
                                    className="mr-2"
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

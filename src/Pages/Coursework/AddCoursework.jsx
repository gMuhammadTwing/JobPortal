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

const AddCoursework = ({ isOpen, onClose, success, error }) => {
    const formik = useFormik({
        initialValues: {
            degree_program: "",
            institution_name: "",
            course_title: "",
            grade: "",
            year_of_completion: "",
        },
        validationSchema: Yup.object({
            degree_program: Yup.string().required("Degree program is required"),
            institution_name: Yup.string().required("Institution name is required"),
            course_title: Yup.string().required("Course title is required"),
            grade: Yup.string().required("Grade is required"),
            year_of_completion: Yup.date().required("Year of completion is required"),
        }),
        onSubmit: async (values) => {
            try {
                console.log("Form submitted:", values);
                success("Coursework added successfully");
                onClose(false);
            } catch (err) {
                console.error("Error submitting form:", err);
                error("Failed to add coursework");
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
                                Add Coursework
                            </DialogTitle>
                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-12">
                                {/* Degree Program */}
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Degree Program
                                    </label>
                                    <input
                                        type="text"
                                        name="degree_program"
                                        onChange={formik.handleChange}
                                        value={formik.values.degree_program}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.degree_program && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.degree_program}
                                        </p>
                                    )}
                                </div>

                                {/* Institution Name */}
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Institution Name
                                    </label>
                                    <input
                                        type="text"
                                        name="institution_name"
                                        onChange={formik.handleChange}
                                        value={formik.values.institution_name}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.institution_name && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.institution_name}
                                        </p>
                                    )}
                                </div>

                                {/* Course Title */}
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Course Title
                                    </label>
                                    <input
                                        type="text"
                                        name="course_title"
                                        onChange={formik.handleChange}
                                        value={formik.values.course_title}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.course_title && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.course_title}
                                        </p>
                                    )}
                                </div>

                                {/* Grade */}
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Grade
                                    </label>
                                    <input
                                        type="text"
                                        name="grade"
                                        onChange={formik.handleChange}
                                        value={formik.values.grade}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.grade && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.grade}
                                        </p>
                                    )}
                                </div>

                                {/* Year of Completion */}
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Year of Completion
                                    </label>
                                    <input
                                        type="date"
                                        name="year_of_completion"
                                        onChange={formik.handleChange}
                                        value={formik.values.year_of_completion}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.year_of_completion && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.year_of_completion}
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

export default AddCoursework;

import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { PlusCircleIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FallingLines, InfinitySpin } from "react-loader-spinner";
import { useState } from "react";
import { Button } from "../../../Components/Button";

const AddCoursework = ({ isOpen, onClose, success, error }) => {
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            course_title: "",
            grade: "",
            year_of_completion: "",
        },
        validationSchema: Yup.object({
            // course_title: Yup.string().required("Course title is required"),
            // grade: Yup.string().required("Grade is required"),
            // year_of_completion: Yup.date().required("Year of completion is required"),
        }),
        onSubmit: async (values) => {
            try {
                console.log("Form submitted:", courses);
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


    const [courses, setCourses] = useState([
        { course_title: "", grade: "", year_of_completion: "" },
    ]);

    // Add a new course row
    const addCourse = () => {
        setCourses([
            ...courses,
            { course_title: "", grade: "", year_of_completion: "" },
        ]);
    };

    // Remove a course row
    const removeCourse = (index) => {
        setCourses(courses.filter((_, i) => i !== index));
    };

    // Handle input changes for dynamic fields
    const handleCourseChange = (index, field, value) => {
        const updatedCourses = [...courses];
        updatedCourses[index][field] = value;
        setCourses(updatedCourses);
    };

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
                            Add Coursework
                        </DialogTitle>
                        {/* Modal content */}
                        {courses.map((course, index) => (
                            <div
                                key={index}
                                className="mt-6 grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-12 items-center"
                            >
                                {/* Course Title */}
                                <div className="sm:col-span-4">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Course Title
                                    </label>
                                    <input
                                        type="text"
                                        name={`course_title_${index}`}
                                        onChange={(e) => handleCourseChange(index, "course_title", e.target.value)}
                                        value={course.course_title}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                </div>

                                {/* Grade */}
                                <div className="sm:col-span-4">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Grade
                                    </label>
                                    <input
                                        type="text"
                                        name={`grade_${index}`}
                                        onChange={(e) => handleCourseChange(index, "grade", e.target.value)}
                                        value={course.grade}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                </div>

                                {/* Year of Completion */}
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Year of Completion
                                    </label>
                                    <input
                                        type="date"
                                        name={`year_of_completion_${index}`}
                                        onChange={(e) =>
                                            handleCourseChange(index, "year_of_completion", e.target.value)
                                        }
                                        value={course.year_of_completion}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                </div>

                                {/* Trash Icon */}
                                <div className="sm:col-span-1 cursor-pointer flex mt-6">
                                    {courses.length > 1 && (
                                        <TrashIcon
                                            className="w-7 h-7 text-red-600"
                                            onClick={() => removeCourse(index)}
                                        />
                                    )}
                                    {index === courses.length - 1 && (
                                        <PlusCircleIcon
                                            className="w-7 h-7 text-blue-500 cursor-pointer"
                                            onClick={addCourse}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}


                        {/* Add Course Button */}
                        {/* <div className="flex justify-end mt-4">
                            <PlusCircleIcon
                                className="w-7 h-7 text-blue-500 cursor-pointer"
                                onClick={addCourse}
                            />
                        </div> */}

                        {loading ? (
                            <div className="mt-8 sm:mt-8 sm:flex sm:flex-row-reverse"><InfinitySpin height={150} width={150} color="green" /></div>
                        ) : (
                            <div className="mt-8 sm:mt-8 sm:flex sm:flex-row-reverse">
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
                            </div>
                        )}
                    </form>
                </DialogPanel>
            </div>

        </Dialog>
    );
};

export default AddCoursework;

import { MinusIcon, PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../../Components/Button";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Projects() {
    const [Project, setProject] = useState(false);
    const [editProject, setEditProject] = useState(false);

    const handleProject = () => {
        setProject(!Project);
        if (!Project) {
            setEditProject(false);
        }
    };
    const [value, setValue] = useState("");
    const formik = useFormik({
        initialValues: {
            projectName: "",
            projectUrl: "",
            startDate: "",
            endDate: "",
            ongoing: false,
            associatedWith: "",
            description: "",
        },
        validationSchema: Yup.object({
            projectName: Yup.string().required("Project Name is required"),
            startDate: Yup.date().required("Start Date is required"),
            // endDate: Yup.date().when("ongoing", {
            //     is: false,
            //     then: Yup.date().required("End Date is required"),
            // }),
        }),
        onSubmit: async (values) => {
            console.log("Form Data:", values)

            // Replace with actual save logic
            try {
                // Simulate API call
                console.log("Saving data...");
            } catch (error) {
                console.error("Error saving data:", error);
            } finally {
                setEditProject(false);
            }
        },
    });
    return (
        <>
            <div className="flex justify-center sm:px-0">
                <div className="p-4 w-full max-w-5xl">
                    <div className={`border rounded-md shadow-lg ${Project ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 border-b cursor-pointer text-orange-600 bg-white"
                            onClick={handleProject}
                        >
                            <h3 className="font-bold text-xl">Projects</h3>
                            <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                                {Project ? (
                                    <PlusIcon className="block h-6 w-6 text-blue-500 hover:scale-[160%] duration-300" />
                                ) : (
                                    <MinusIcon className="block h-6 w-6 text-red hover:scale-[160%] duration-300" />
                                )}
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className={`overflow-x-hidden bg-white relative transition-all duration-300 ease-in-out ${Project ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {/* Icons at Top-Right */}
                            {/* {(!editProject && !Project) && (
                                
                            )} */}

                            {/* Profile Information */}
                            {!editProject && (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="absolute top-4 right-4 flex space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => setEditProject(true)}
                                            className="hover:bg-white rounded-full p-2 focus:outline-none transition-colors"
                                        >
                                            <PencilIcon className="h-5 w-5 text-blue-500" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => console.log("Delete clicked")}
                                            className="hover:bg-white rounded-full p-2 focus:outline-none transition-colors"
                                        >
                                            <TrashIcon className="h-5 w-5 text-red-600" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-semibold text-lg">Project Name</h4>
                                            </div>
                                            <p>Project URL</p>
                                            <p>Description</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Add Project Button */}
                            {!editProject && (
                                <div className="mt-4 flex justify-center border-t py-2">
                                    <button
                                        type="button"
                                        onClick={() => setEditProject(true)}
                                        className="bg-orange-600 hover:bg-orange-600 rounded-full p-1 text-white shadow-md transition-all"
                                    >
                                        <PlusIcon className=" h-5 w-5" />
                                    </button>
                                </div>
                            )}

                            {/* Edit Profile Form */}
                            {editProject && (
                                <form onSubmit={formik.handleSubmit} className="">
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        {/* Project Name */}
                                        <div>
                                            <label htmlFor="projectName" className="block text-sm font-medium text-gray-900">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="projectName"
                                                name="projectName"
                                                value={formik.values.projectName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                            {formik.touched.projectName && formik.errors.projectName && (
                                                <div className="text-red-500 text-sm mt-1">{formik.errors.projectName}</div>
                                            )}
                                        </div>

                                        {/* Project URL */}
                                        <div>
                                            <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-900">
                                                Project URL
                                            </label>
                                            <input
                                                type="url"
                                                id="projectUrl"
                                                name="projectUrl"
                                                value={formik.values.projectUrl}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>

                                        {/* Start Date */}
                                        <div>
                                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-900">
                                                Start Date *
                                            </label>
                                            <input
                                                type="date"
                                                id="startDate"
                                                name="startDate"
                                                value={formik.values.startDate}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                            {formik.touched.startDate && formik.errors.startDate && (
                                                <div className="text-red-500 text-sm mt-1">{formik.errors.startDate}</div>
                                            )}
                                        </div>

                                        {/* End Date */}
                                        <div>
                                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-900">
                                                End Date
                                            </label>
                                            <input
                                                type="date"
                                                id="endDate"
                                                name="endDate"
                                                value={formik.values.endDate}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                            {formik.touched.endDate && formik.errors.endDate && (
                                                <div className="text-red-500 text-sm mt-1">{formik.errors.endDate}</div>
                                            )}
                                        </div>

                                        {/* Ongoing Checkbox */}
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="ongoing"
                                                name="ongoing"
                                                checked={formik.values.ongoing}
                                                onChange={formik.handleChange}
                                                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <label htmlFor="ongoing" className="ml-2 text-sm font-medium text-gray-900">
                                                Ongoing
                                            </label>
                                        </div>

                                        {/* Associated With */}
                                        <div>
                                            <label htmlFor="associatedWith" className="block text-sm font-medium text-gray-900">
                                                Associated with
                                            </label>
                                            <select
                                                id="associatedWith"
                                                name="associatedWith"
                                                value={formik.values.associatedWith}
                                                onChange={formik.handleChange}
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            >
                                                <option value="">Select an option</option>
                                                <option>Experience 1</option>
                                                <option>Experience 2</option>
                                                <option>Education 1</option>
                                                <option>Education 2</option>
                                            </select>
                                        </div>

                                        {/* Description */}
                                        <div className="col-span-full">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                                Description
                                            </label>
                                            <ReactQuill
                                                id="description"
                                                theme="snow"
                                                value={value}
                                                onChange={(content) => {
                                                    setValue(content);
                                                    formik.setFieldValue("description", content);
                                                }}
                                                style={{ height: "150px" }}
                                                modules={{
                                                    toolbar: [
                                                        ["bold", "italic", "underline", "strike"],
                                                        [{ header: [1, 2, 3, false] }],
                                                        [{ list: "ordered" }, { list: "bullet" }],
                                                        ["clean"],
                                                    ],
                                                }}
                                                formats={["header", "bold", "italic", "underline", "strike", "list", "bullet"]}
                                                placeholder="Write something"
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-center gap-4 mt-17">
                                        <Button
                                            type="button"
                                            color="gradient"
                                            variant="outline"
                                            onClick={() => setEditProject(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="gradient" variant="solid" className="text-white">
                                            Save
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

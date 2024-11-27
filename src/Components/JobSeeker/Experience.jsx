import { MinusIcon, PlusIcon, PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../../Components/Button";
import userLogo from '../../assets/user.jpeg'
import ReactQuill from "react-quill";
export default function Experience() {
    const [exp, setExp] = useState(false);
    const [editExp, setEditExp] = useState(false);
    const handleExp = () => {
        setExp(!exp);
        if (!exp) {
            setEditExp(false);
        }
    };
    const [value, setValue] = useState("");
    return (
        <>
            <div className="flex justify-center sm:px-0">
                <div className="p-4 w-full max-w-5xl">
                    <div className={`border rounded-md shadow-lg ${exp ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 text-orange-600 bg-white border-b cursor-pointer"
                            onClick={handleExp}
                        >
                            <h3 className="font-semibold text-3xl">Experience</h3>
                            <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                                {exp ? (
                                    <PlusIcon className="block h-6 w-6 text-blue-500 hover:scale-[160%] duration-300" />
                                ) : (
                                    <MinusIcon className="block h-6 w-6 text-red hover:scale-[160%] duration-300" />
                                )}
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className={`relative overflow-x-hidden bg-white transition-all duration-300 ease-in-out ${exp ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {/* Edit Button in Body */}
                            {(!editExp && !exp) && (
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setEditExp(true)}
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
                            )}

                            {/* Profile Information */}
                            {!editExp && (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-semibold text-lg">Software Developer</h4>
                                            </div>

                                            <p className="text-sm text-gray-600">Private</p>
                                            <p className="text-sm text-gray-600">Jan 2022 - Present | Islamabad, Pakistan</p>
                                        </div>

                                    </div>
                                </div>

                            )}
                            {!editExp && (
                                <div className="mt-4 flex justify-center border-t py-2">
                                    <button
                                        type="button"
                                        onClick={() => setEditExp(true)}
                                        className="bg-orange-600 hover:bg-orange-600 rounded-full p-1 text-white shadow-md transition-all"
                                    >
                                        <PlusIcon className=" h-5 w-5" />
                                    </button>
                                </div>
                            )}

                            {/* Edit Profile Form */}
                            {editExp && (
                                <form className="">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-900">Job Title *</label>
                                            <input
                                                type="text"
                                                id="jobTitle"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="company" className="block text-sm font-medium text-gray-900">Company *</label>
                                            <input
                                                type="text"
                                                id="company"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="industry" className="block text-sm font-medium text-gray-900">Industry *</label>
                                            <input
                                                type="text"
                                                id="industry"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="salary" className="block text-sm font-medium text-gray-900">Salary *</label>
                                            <input
                                                type="text"
                                                id="salary"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-900">Location *</label>
                                            <input
                                                type="text"
                                                id="location"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mt-2">Did you directly manage a team? *</label>
                                            <div className="flex items-center gap-4 mt-2">
                                                <label htmlFor="manageYes" className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="manageYes"
                                                        name="manageTeam"
                                                        value="yes"
                                                        className="mr-2"
                                                    />
                                                    Yes
                                                </label>
                                                <label htmlFor="manageNo" className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="manageNo"
                                                        name="manageTeam"
                                                        value="no"
                                                        className="mr-2"
                                                    />
                                                    No
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-900">Start Date *</label>
                                            <input
                                                type="date"
                                                id="startDate"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-900">End Date *</label>
                                            <input
                                                type="date"
                                                id="endDate"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 mt-6">
                                            <input
                                                type="checkbox"
                                                id="present"
                                                required
                                                className="py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500"
                                            />
                                            <label htmlFor="present" className="text-sm font-medium text-gray-900">Currently Working here</label>

                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
                                            <ReactQuill
                                                id="summary-editor"
                                                theme="snow"
                                                value={value}
                                                onChange={setValue}
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
                                        </div>

                                        {/* <div className="col-span-full">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
                                            <textarea
                                                id="description"
                                                rows={4}
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div> */}
                                    </div>

                                    <div className="flex justify-center gap-4 mt-20">
                                        <Button
                                            type="button"
                                            color="gradient"
                                            variant="outline"
                                            onClick={() => setEditExp(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            color="gradient"
                                            variant="solid"
                                            className="text-white"
                                        >
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
    )
}
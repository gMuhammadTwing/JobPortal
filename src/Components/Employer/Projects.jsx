import { MinusIcon, PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../../Components/Button";
export default function Projects() {
    const [Project, setProject] = useState(false);
    const [editProject, setEditProject] = useState(false);
    const handleProject = () => {
        setProject(!Project);
        if (!Project) {
            setEditProject(false);
        }
    };
    return (
        <>
           <div className="flex justify-center px-4 sm:px-0">
                <div className="p-4 w-full max-w-4xl">
                    <div className={`border rounded-md shadow-lg ${Project ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 bg-orange-500 border-b cursor-pointer text-white"
                            onClick={handleProject}
                        >
                            <h3 className="font-semibold text-lg">Projects</h3>
                            <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                                {Project ? (
                                    <PlusIcon className="block h-6 w-6 text-green-600 hover:scale-[160%] duration-300" />
                                ) : (
                                    <MinusIcon className="block h-6 w-6 text-red-600 hover:scale-[160%] duration-300" />
                                )}
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className={`relative transition-all duration-300 ease-in-out ${Project ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {/* Edit Button in Body */}
                            {(!editProject && !Project) && (
                                <button
                                    type="button"
                                    onClick={() => setEditProject(true)}
                                    className="absolute right-4 top-4 bg-orange-500 hover:bg-orange-600 rounded-full p-2 focus:outline-none shadow-md transition-colors"
                                >
                                    <PlusIcon className="h-5 w-5 text-white" />
                                </button>
                            )}

                            {/* Profile Information */}
                            {!editProject && (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-semibold text-lg">Project Name</h4>
                                                <div className="flex space-x-2 ml-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditProject(true)}
                                                        className="bg-blue-500 hover:bg-blue-600 rounded-full p-2 focus:outline-none shadow-md transition-colors"
                                                    >
                                                        <PencilIcon className="h-5 w-5 text-white" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditProject(true)}
                                                        className="bg-red-500 hover:bg-red-600 rounded-full p-2 focus:outline-none shadow-md transition-colors"
                                                    >
                                                        <TrashIcon className="h-5 w-5 text-white" />
                                                    </button>
                                                </div>
                                            </div>
                                            <p>Project URL</p>
                                            <p>Discription</p>
                                        </div>

                                    </div>
                                </div>

                            )}

                            {/* Edit Profile Form */}
                            {editProject && (
                                <form className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                    
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="projectName" className="block text-sm font-medium text-gray-900">Name *</label>
                                        <input
                                            type="text"
                                            id="projectName"
                                            required
                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        />
                                    </div>
                            
                                    {/* Project URL */}
                                    <div>
                                        <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-900">Project URL</label>
                                        <input
                                            type="url"
                                            id="projectUrl"
                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        />
                                    </div>
                            
                                    {/* Start Date */}
                                    <div>
                                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-900">Start Date *</label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            required
                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        />
                                    </div>
                            
                                    {/* End Date */}
                                    <div>
                                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-900">End Date</label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        />
                                    </div>
                            
                                    {/* Ongoing Checkbox */}
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="ongoing"
                                            className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor="ongoing" className="ml-2 text-sm font-medium text-gray-900">Ongoing</label>
                                    </div>
                            
                                    {/* Associated with Dropdown */}
                                    <div>
                                        <label htmlFor="associatedWith" className="block text-sm font-medium text-gray-900">Associated with</label>
                                        <select id="associatedWith" name="associatedWith" className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2">
                                            <option value="">Select an option</option>
                                            <option>Experience 1</option>
                                            <option>Experience 2</option>
                                            <option>Education 1</option>
                                            <option>Education 2</option>
                                        </select>
                                    </div>
                            
                                    {/* Description */}
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
                                        <textarea
                                            id="description"
                                            rows="4"
                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        />
                                    </div>
                                </div>
                            
                                {/* Action Buttons */}
                                <div className="flex justify-center gap-4 mt-5">
                                    <Button
                                        type="button"
                                        color="gradient"
                                        variant="outline"
                                        onClick={() => setEditProject(false)}
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
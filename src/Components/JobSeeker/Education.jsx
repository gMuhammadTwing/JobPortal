import { MinusIcon, PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../../Components/Button";
export default function Education() {
    const [Education, setEducation] = useState(false);
    const [editEducation, setEditEducation] = useState(false);
    const handleEducation = () => {
        setEducation(!Education);
        if (!Education) {
            setEditEducation(false);
        }
    };
    return (
        <>
           <div className="flex justify-center px-4 sm:px-0">
                <div className="p-4 w-full max-w-4xl">
                    <div className={`border rounded-md shadow-lg ${Education ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 bg-orange-500 border-b cursor-pointer text-white"
                            onClick={handleEducation}
                        >
                            <h3 className="font-semibold text-lg">Education</h3>
                            <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                                {Education ? (
                                    <PlusIcon className="block h-6 w-6 text-white hover:scale-[160%] duration-300" />
                                ) : (
                                    <MinusIcon className="block h-6 w-6 text-white hover:scale-[160%] duration-300" />
                                )}
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className={`relative transition-all duration-300 ease-in-out ${Education ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {/* Edit Button in Body */}
                            {(!editEducation && !Education) && (
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setEditEducation(true)}
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
                            {!editEducation && (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-semibold text-lg">Bahria University, Islamabad</h4>
                                            </div>
                                            <p>BS Computer Science 2024</p>
                                        </div>

                                    </div>
                                </div>

                            )}
                            {!editEducation && (
                                <div className="mt-4 flex justify-center border-t-2 py-2">
                                    <button
                                        type="button"
                                        onClick={() => setEditEducation(true)}
                                        className="bg-orange-500 hover:bg-orange-600 rounded-full p-1 text-white shadow-md transition-all"
                                    >
                                        <PlusIcon className=" h-5 w-5" />
                                    </button>
                                </div>
                            )}

                            {/* Edit Profile Form */}
                            {editEducation && (
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        {/* Degree Title Dropdown */}
                                        <div>
                                            <label htmlFor="degreeTitle" className="block text-sm font-medium text-gray-900">Degree Title *</label>
                                            <select id="degreeTitle" name="degreeTitle" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2">
                                                <option value="">Select Degree</option>
                                                <option>Bachelor's</option>
                                                <option>Master's</option>
                                                <option>PhD</option>
                                            </select>
                                        </div>

                                        {/* Field of Study */}
                                        <div>
                                            <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-900">Field of Study *</label>
                                            <input
                                                type="text"
                                                id="fieldOfStudy"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>

                                        {/* Location Dropdown */}
                                        <div>
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-900">Location *</label>
                                            <select id="location" name="location" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2">
                                                <option value="">Select Location</option>
                                                <option>Islamabad</option>
                                                <option>Lahore</option>
                                                <option>Karachi</option>
                                            </select>
                                        </div>

                                        {/* Institution Dropdown */}
                                        <div>
                                            <label htmlFor="institution" className="block text-sm font-medium text-gray-900">Institution *</label>
                                            <select id="institution" name="institution" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2">
                                                <option value="">Select Institution</option>
                                                <option>Harvard University</option>
                                                <option>MIT</option>
                                                <option>Stanford University</option>
                                            </select>
                                        </div>

                                        {/* Completion Year Dropdown */}
                                        <div>
                                            <label htmlFor="completionYear" className="block text-sm font-medium text-gray-900">Completion Year *</label>
                                            <select id="completionYear" name="completionYear" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2">
                                                <option value="">Select Year</option>
                                                <option>2024</option>
                                                <option>2023</option>
                                                <option>2022</option>
                                            </select>
                                        </div>

                                        {/* CGPA Obtained and Out Of */}
                                        <div>
                                            <label htmlFor="cgpa" className="block text-sm font-medium text-gray-900">CGPA Obtained and Out Of *</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    id="cgpaObtained"
                                                    placeholder="Obtained"
                                                    required
                                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500"
                                                />
                                                <input
                                                    type="text"
                                                    id="cgpaOutOf"
                                                    placeholder="Out Of"
                                                    required
                                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-center gap-4 mt-5">
                                        <Button
                                            type="button"
                                            color="gradient"
                                            variant="outline"
                                            onClick={() => setEditEducation(false)}
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
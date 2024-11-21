import { MinusIcon, PlusIcon, PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../../Components/Button";
import userLogo from '../../assets/user.jpeg'
export default function Skills() {
    const [skill, setSkill] = useState(false);
    const [editSkill, setEditSkill] = useState(false);
    const handleSkill = () => {
        setSkill(!skill);
        if (!skill) {
            setEditSkill(false);
        }
    };
    return (
        <>
            <div className="flex justify-center px-4 sm:px-0">
                <div className="p-4 w-full max-w-4xl">
                    <div className={`border rounded-md shadow-lg ${skill ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-500 to-pink-600 border-b cursor-pointer text-white"
                            onClick={handleSkill}
                        >
                            <h3 className="font-semibold text-lg">Skills</h3>
                            <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                                {skill ? (
                                    <PlusIcon className="block h-6 w-6 text-white hover:scale-[160%] duration-300" />
                                ) : (
                                    <MinusIcon className="block h-6 w-6 text-white hover:scale-[160%] duration-300" />
                                )}
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className={`relative transition-all duration-300 ease-in-out ${skill ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {/* Edit Button in Body */}
                            {(!editSkill && !skill) && (
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setEditSkill(true)}
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
                            {!editSkill && (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-semibold text-lg">JavaScript</h4>(Expert)
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            )}
                            {!editSkill && (
                                <div className="mt-4 flex justify-center border-t-2 py-2">
                                    <button
                                        type="button"
                                        onClick={() => setEditSkill(true)}
                                        className="bg-orange-500 hover:bg-orange-600 rounded-full p-1 text-white shadow-md transition-all"
                                    >
                                        <PlusIcon className=" h-5 w-5" />
                                    </button>
                                </div>
                            )}

                            {/* Edit Profile Form */}
                            {editSkill && (
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        <div>
                                            <label htmlFor="skillname" className="block text-sm font-medium text-gray-900">Add a new skill *</label>
                                            <input
                                                type="text"
                                                id="skillname"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="expertise" className="block text-sm font-medium text-gray-900">Experience with this skill</label>
                                            <select id="expertise" name="expertise" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2">
                                                <option>Beginner</option>
                                                <option>Intermediate</option>
                                                <option>Expert</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className="flex justify-center gap-4 mt-5">
                                        <Button
                                            type="button"
                                            color="gradient"
                                            variant="outline"
                                            onClick={() => setEditSkill(false)}
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
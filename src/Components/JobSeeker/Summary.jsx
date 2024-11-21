import { MinusIcon, PlusIcon, PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../Button";
import userLogo from '../../assets/user.jpeg'
export default function Summary() {
    const [summary, setSummary] = useState(false);
    const [editSummary, setEditSummary] = useState(false);
    const handleSummary = () => {
        setSummary(!summary);
        if (!summary) {
            setEditSummary(false);
        }
    };
    return (
        <>
            <div className="flex justify-center px-4 sm:px-0">
                <div className="p-4 w-full max-w-4xl">
                    <div className={`border rounded-md shadow-lg ${summary ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-500 to-pink-600 border-b cursor-pointer text-white"
                            onClick={handleSummary}
                        >
                            <h3 className="font-semibold text-lg">Summary</h3>
                            <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                                {summary ? (
                                    <PlusIcon className="block h-6 w-6 text-white hover:scale-[160%] duration-300" />
                                ) : (
                                    <MinusIcon className="block h-6 w-6 text-white hover:scale-[160%] duration-300" />
                                )}
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className={`relative transition-all duration-300 ease-in-out ${summary ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {/* Edit Button in Body */}
                            {(!editSummary && !summary) && (
                                <button
                                    type="button"
                                    onClick={() => setEditSummary(true)}
                                    className="absolute right-4 hover:bg-white rounded-full p-2 focus:outline-none transition-colors"
                                >
                                    <PencilIcon className="h-5 w-5 text-blue-500" />
                                </button>
                            )}

                            {/* Profile Information */}
                            {!editSummary && (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-4">
                                        {/* <img
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt="Ghulam Muhammad"
                                            className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-2 border-white"
                                        /> */}
                                        <div>
                                            <p className="font-semibold text-lg">I'm software developer</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Edit Profile Form */}
                            {editSummary && (
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="col-span-full">
                                            <label htmlFor="summary" className="block text-sm font-medium text-gray-900">Write Summary</label>
                                            <textarea rows={4} id="summary" name="summary" type="text" className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2" />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 mt-5">
                                        <Button
                                            type="button"
                                            color="gradient"
                                            variant="outline"
                                            onClick={() => setEditSummary(false)}
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
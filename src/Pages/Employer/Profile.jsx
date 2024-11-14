import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import userLogo from '../../assets/user.jpeg'
export default function Profile() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Toggle Collapse
    const handleCollapseToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            {/* Container to center the card horizontally */}
            <div className="flex justify-center">
                <div className="p-4 w-full max-w-4xl">
                    <div
                        className={`border rounded-md shadow-lg ${isCollapsed ? "overflow-hidden" : ""}`}
                    >
                        <div
                            className="flex justify-between items-center p-4 bg-orange-500 border-b cursor-pointer text-white"
                            onClick={handleCollapseToggle}
                        >
                            <h3 className="font-semibold text-lg">Personal Information</h3>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-800 focus:outline-none"
                            >
                                {isCollapsed ? (
                                    <PlusIcon className="block h-6 w-6 text-green-600 hover:text-green-600 hover:cursor-pointer transition ease-in-out delay-100 hover:-translate-z-1 hover:scale-[160%] duration-300" />
                                ) : (
                                    <MinusIcon className="block h-6 w-6 text-red-600 hover:text-red-600 hover:cursor-pointer transition ease-in-out delay-100 hover:-translate-z-1 hover:scale-[160%] duration-300" />
                                )}
                            </button>
                        </div>

                        {/* Card Body */}
                        <div
                            className={`transition-all duration-300 ease-in-out ${isCollapsed ? "max-h-0 p-0" : "max-h-screen p-4"}`}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    {/* Profile Picture */}
                                    <img
                                        src={userLogo}
                                        alt="Ghulam Muhammad"
                                        className="h-40 w-40 rounded-full border-2 border-white"
                                    />
                                    {/* User Info */}
                                    <div>
                                        <h4 className="font-semibold text-lg">Ghulam Muhammad</h4>
                                        <p className="text-sm text-gray-600">Software Developer</p>
                                        <p className="text-sm text-gray-600">Private - Islamabad, Pakistan</p>
                                        <p className="text-sm text-gray-600">g.muh786@gmail.com</p>
                                        <p className="text-sm text-gray-600">+92.312.0376631</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

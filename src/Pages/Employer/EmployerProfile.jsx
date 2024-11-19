import { MinusIcon, PlusIcon, PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../../Components/Button";
import userLogo from '../../assets/user.jpeg'
export default function EmployerProfile() {
    const [profileCollapsed, setprofileCollapsed] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const handleCollapseToggle = () => {
        setprofileCollapsed(!profileCollapsed);
        if (!profileCollapsed) {
            setEditProfile(false);
        }
    };
    return (
        <>
            <div className="flex justify-center px-4 sm:px-0">
                <div className="p-4 w-full max-w-4xl">
                    <div className={`border rounded-md shadow-lg ${profileCollapsed ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 bg-orange-500 border-b cursor-pointer text-white"
                            onClick={handleCollapseToggle}
                        >
                            <h3 className="font-semibold text-lg">Employer Profile</h3>
                            <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                                {profileCollapsed ? (
                                    <PlusIcon className="block h-6 w-6 text-green-600 hover:scale-[160%] duration-300" />
                                ) : (
                                    <MinusIcon className="block h-6 w-6 text-red-600 hover:scale-[160%] duration-300" />
                                )}
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className={`overflow-x-hidden relative transition-all duration-300 ease-in-out ${profileCollapsed ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {/* Edit Button in Body */}
                            {(!editProfile && !profileCollapsed) && (
                                <button
                                    type="button"
                                    onClick={() => setEditProfile(true)}
                                    className="absolute right-4 top-4 bg-orange-500 hover:bg-orange-600 rounded-full p-2 focus:outline-none shadow-md transition-colors"
                                >
                                    <PencilIcon className="h-5 w-5 text-white" />
                                </button>
                            )}

                            {/* Profile Information */}
                            {!editProfile && (
                                <>
                                    <div className=" flex flex-col sm:flex-row gap-6 items-center">
                                    <img
                                        src={userLogo}
                                        alt="User Profile"
                                        className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-2 border-white"
                                    />
                                    <div className="text-center sm:text-left">
                                        <h4 className="font-semibold text-lg">Ghulam Muhammad</h4>
                                        <p className="text-sm text-gray-600">Software Developer</p>
                                        <p className="text-sm text-gray-600">Private - Islamabad, Pakistan</p>
                                        <p className="text-sm text-gray-600">g.muh786@gmail.com</p>
                                        <p className="text-sm text-gray-600">+92.312.0376631</p>
                                    </div>
                                </div>
                                    <div className="space-y-4 mt-4 border-t border-gray-300 p-2">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-2">
                                            <div className="sm:col-span-1">
                                                <label
                                                    htmlFor="company_name"
                                                    className="block text-sm"
                                                >
                                                    Company: <span className="text-gray-900 font-medium">Company Name</span>
                                                </label>

                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="company_name"
                                                    className="block text-sm"
                                                >
                                                    Industry: <span className="text-gray-900 font-medium">Industry Name</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="company_name"
                                                    className="block text-sm"
                                                >
                                                    Location: <span className="text-gray-900 font-medium">Islamabad Pakistan</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="company_name"
                                                    className="block text-sm"
                                                >
                                                    Contact Person Name: <span className="text-gray-900 font-medium">GM</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="company_name"
                                                    className="block text-sm"
                                                >
                                                    Verification: <span className="text-gray-900 font-medium">Verified</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="company_name"
                                                    className="block text-sm"
                                                >
                                                    Date of Registration: <span className="text-gray-900 font-medium">12 Nov, 2024</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="company_name"
                                                    className="block text-sm"
                                                >
                                                    Status: <span className="text-gray-900 font-medium">Active</span>
                                                </label>
                                            </div>

                                            {/* Company Description Field */}
                                            <div className="col-span-full">
                                                <label
                                                    htmlFor="company_name"
                                                    className="block text-sm"
                                                >
                                                    Company Description: <span className="text-gray-900 font-medium">Private Software Development Company</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Edit Profile Form */}
                            {editProfile && (
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <label
                                                htmlFor="company_name"
                                                className="block text-sm font-medium text-gray-900"
                                            >
                                                Company Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="company_name"
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="industry" className="block text-sm font-medium text-gray-900">
                                                Industry *
                                            </label>
                                            <input
                                                id="industry"
                                                name="industry"
                                                type="text"
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-900">
                                                Location *
                                            </label>
                                            <input
                                                id="location"
                                                name="location"
                                                type="text"
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="contact_person_name" className="block text-sm font-medium text-gray-900">
                                                Contact Person Name *
                                            </label>
                                            <input
                                                id="contact_person_name"
                                                name="contact_person_name"
                                                type="text"
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-900">
                                                Phone Number *
                                            </label>
                                            <input
                                                id="phone_number"
                                                name="phone_number"
                                                type="text"
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                                Email *
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="verification_status" className="block text-sm font-medium text-gray-900">
                                                Verification Status *
                                            </label>
                                            <select
                                                id="verification_status"
                                                name="verification_status"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            >
                                                <option>Verified</option>
                                                <option>Unverified</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="date_of_registration" className="block text-sm font-medium text-gray-900">
                                                Date of Registration *
                                            </label>
                                            <input
                                                id="date_of_registration"
                                                name="date_of_registration"
                                                type="date"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-900">
                                                Status *
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            >
                                                <option>Active</option>
                                                <option>Inactive</option>
                                            </select>
                                        </div>

                                        {/* Logo Input Field */}
                                        <div>
                                            <label htmlFor="logo_path" className="block text-sm font-medium text-gray-900">
                                                Logo (Upload Image)
                                            </label>
                                            <input
                                                id="logo_path"
                                                name="logo_path"
                                                type="file"
                                                accept="image/*"
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>

                                        {/* Company Description Field */}
                                        <div className="col-span-full">
                                            <label htmlFor="company_description" className="block text-sm font-medium text-gray-900">
                                                Company Description
                                            </label>
                                            <textarea
                                                id="company_description"
                                                name="company_description"
                                                rows={4}
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-center gap-4 mt-5">
                                        <Button
                                            type="button"
                                            color="gradient"
                                            variant="outline"
                                            onClick={() => setEditProfile(false)}
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
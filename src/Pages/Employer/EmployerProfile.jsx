import { MinusIcon, PlusIcon, PencilIcon, TrashIcon, PlusCircleIcon, MapIcon, MapPinIcon, CalendarDaysIcon, EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../../Components/Button";
import userLogo from '../../assets/user.jpeg'
import ReactQuill from "react-quill";
export default function EmployerProfile() {
    const [profileCollapsed, setprofileCollapsed] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const handleCollapseToggle = () => {
        setprofileCollapsed(!profileCollapsed);
        if (!profileCollapsed) {
            setEditProfile(false);
        }
    };
    const [value, setValue] = useState("");
    return (
        <>
            <div className="flex justify-center px-4 sm:px-6 lg:px-8">
                <div className="p-4 w-full max-w-5xl rounded-lg">
                    <div className={`border rounded-lg shadow-lg ${profileCollapsed ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-center p-4 border-b cursor-pointer bg-[#FFF5F3]"
                            onClick={handleCollapseToggle}
                        >
                            <h3 className="font-semibold text-3xl text-center">Company Profile</h3>
                            {/* <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                                {profileCollapsed ? (
                                    <PlusIcon className="block h-6 w-6 text-blue-500 hover:scale-[160%] duration-300" />
                                ) : (
                                    <MinusIcon className="block h-6 w-6 text-red hover:scale-[160%] duration-300" />
                                )}
                            </button> */}
                        </div>

                        {/* Card Body */}
                        <div className={`overflow-x-hidden bg-white relative transition-all duration-300 ease-in-out ${profileCollapsed ? "max-h-0 p-0" : "max-h-screen p-4 sm:p-6"}`}>
                            {/* Edit Button in Body */}
                            {(!editProfile && !profileCollapsed) && (
                                <button
                                    type="button"
                                    onClick={() => setEditProfile(true)}
                                    className="absolute right-4 top-4 bg-white hover:bg-white rounded-full p-2 focus:outline-none transition-colors"
                                >
                                    <PencilIcon className="h-5 w-5 text-blue-500" />
                                </button>
                            )}

                            {/* Profile Information */}
                            {!editProfile && (
                                <>
                                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                                        <img
                                            src="https://kofejob.dreamstechnologies.com/html/template/assets/img/default-logo.svg"
                                            alt="User Profile"
                                            className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-2 border-white"
                                        />
                                        <div className="text-center sm:text-left">
                                            <strong className="text-sm text-gray-600">Soft Technologies</strong>
                                            <h1 className="font-semibold text-xl sm:text-2xl">Build a Coaching Website Product Store images</h1>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-10 mt-4">
                                        <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                                            <MapPinIcon className="w-5 h-5" />
                                            Los Angeles
                                        </p>
                                        <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                                            <CalendarDaysIcon className="w-5 h-5" />
                                            22 September 2023
                                        </p>
                                        <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                                            <EyeIcon className="w-5 h-5" />
                                            902 Views
                                        </p>
                                        <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                                            <PencilSquareIcon className="w-5 h-5" />
                                            15 Proposal
                                        </p>
                                    </div>
                                    <div className="mt-6 border-t pt-4">
                                        <label className="block font-semibold">Description</label>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        </p>
                                    </div>
                                    <div className="mt-6 border-t pt-4">
                                        <label className="block font-semibold">Required Skills</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                                            {["JavaScript", "Reactjs", "Nextjs", "PHP", "HTML", "CSS", "Bootstrap"].map((skill) => (
                                                <span key={skill} className="bg-red-100 p-2 rounded text-center text-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-6 border-t pt-4">
                                        <label className="block font-semibold">Tags</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                                            {["Machine Learning", "Virtual Assistant", "AI Chatbot"].map((skill) => (
                                                <span key={skill} className="bg-red-100 p-2 rounded text-center text-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Edit Profile Form */}
                            {editProfile && (
                                <form className="">
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
                                            <label htmlFor="company_description" className="block text-sm font-medium text-gray-900">
                                                Company Description
                                            </label>
                                            <textarea
                                                id="company_description"
                                                name="company_description"
                                                rows={4}
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div> */}
                                    </div>

                                    <div className="flex justify-center gap-4 mt-15">
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
import { MinusIcon, PlusIcon, PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../../Components/Button";
import userLogo from '../../assets/user.jpeg'
export default function PersonalInformation() {
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
                            className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-500 to-pink-600 border-b cursor-pointer text-white"
                            onClick={handleCollapseToggle}
                        >
                            <h3 className="font-semibold text-lg">Personal Information</h3>
                            <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                                {profileCollapsed ? (
                                    <PlusIcon className="block h-6 w-6 text-white hover:scale-[160%] duration-300" />
                                ) : (
                                    <MinusIcon className="block h-6 w-6 text-white hover:scale-[160%] duration-300" />
                                )}
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className={`overflow-x-hidden bg-gray-100 relative transition-all duration-300 ease-in-out ${profileCollapsed ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {!editProfile && !profileCollapsed && (
                                // <button
                                //     type="button"
                                //     onClick={() => setEditProfile(true)}
                                //     className="absolute right-4 top-4 bg-orange-500 hover:bg-orange-600 rounded-full p-2 focus:outline-none shadow-md transition-colors"
                                // >
                                //     <PencilIcon className="h-5 w-5 text-white" />
                                // </button>
                                <button
                                    type="button"
                                    onClick={() => setEditProfile(true)}
                                    className="absolute right-4 hover:bg-white rounded-full p-2 focus:outline-none transition-colors"
                                >
                                    <PencilIcon className="h-5 w-5 text-blue-500" />
                                </button>
                            )}

                            {/* Profile Information */}
                            {!editProfile && (
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
                            )}

                            {/* Edit Profile Form */}
                            {editProfile && (
                                <form className="space-y-4 ">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-900"
                                            >
                                                Full Name {" "}
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder=""
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email *</label>
                                            <input id="email" name="email" type="email" required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                defaultValue="g.muh786@gmail.com" />
                                        </div>
                                        <div>
                                            <label htmlFor="fatherName" className="block text-sm font-medium text-gray-900">Father Name</label>
                                            <input id="fatherName" name="fatherName" type="text" className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2" />
                                        </div>
                                        <div>
                                            <label htmlFor="dob" className="block text-sm font-medium text-gray-900">Date of Birth *</label>
                                            <input id="dob" name="dob" type="date" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2" defaultValue="1998-05-12" />
                                        </div>
                                        <div>
                                            <label htmlFor="gender" className="block text-sm font-medium text-gray-900">Gender *</label>
                                            <select id="gender" name="gender" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2">
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-900">Marital Status *</label>
                                            <select id="maritalStatus" name="maritalStatus" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2">
                                                <option>Single</option>
                                                <option>Married</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="nationality" className="block text-sm font-medium text-gray-900">Nationality *</label>
                                            <input id="nationality" name="nationality" type="text" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2" defaultValue="Pakistani" />
                                        </div>
                                        <div>
                                            <label htmlFor="cnic" className="block text-sm font-medium text-gray-900">CNIC *</label>
                                            <input id="cnic" name="cnic" type="text" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2" defaultValue="4320292188993" />
                                        </div>
                                        <div>
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-900">City *</label>
                                            <input id="city" name="city" type="text" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2" defaultValue="Islamabad" />
                                        </div>
                                        <div>
                                            <label htmlFor="area" className="block text-sm font-medium text-gray-900">Area *</label>
                                            <input id="area" name="area" type="text" className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2" defaultValue="G-7" />
                                        </div>
                                        <div>
                                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-900">Mobile *</label>
                                            <input id="mobile" name="mobile" type="text" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2" defaultValue="+92 312 0376631" />
                                        </div>
                                        <div>
                                            <label htmlFor="careerLevel" className="block text-sm font-medium text-gray-900">Career Level *</label>
                                            <input id="careerLevel" name="careerLevel" type="text" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2" defaultValue="Experienced Professional" />
                                        </div>
                                        <div>
                                            <label htmlFor="experience" className="block text-sm font-medium text-gray-900">Experience *</label>
                                            <input id="experience" name="experience" type="text" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2" defaultValue="3 Years" />
                                        </div>
                                        <div>
                                            <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-900">Expected Salary (PKR) *</label>
                                            <input id="expectedSalary" name="expectedSalary" type="text" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2" defaultValue="125,000 - 149,999" />
                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="postalAddress" className="block text-sm font-medium text-gray-900">Postal Address</label>
                                            <textarea rows={4} id="postalAddress" name="postalAddress" type="text" className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2" />
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
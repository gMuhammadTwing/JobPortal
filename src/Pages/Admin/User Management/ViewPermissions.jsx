import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { Hourglass, InfinitySpin, RotatingLines } from "react-loader-spinner";
import app_vars from "../../../config";
import userLogo from '../../../assets/user.jpeg'
const permissionsList = [
    { name: "Admin Users", permissions: "user_management" },
    { name: "Employer", permissions: "employer" },
    { name: "Job Seekers", permissions: "job_seeker" },
    { name: "Employment Agency", permissions: "employment_agency" },
    { name: "Jobs List", permissions: "jobs_list" },
    { name: "Payment", permissions: "payment" },
    { name: "Instructions for payment", permissions: "instructions_for_payment" },
    { name: "Jobs & Applicants", permissions: "jobs_&_applicants" },
    { name: "Blogs", permissions: "blogs" },
    { name: "Contact Us", permissions: "contact_us" },
    { name: "Reported Jobs", permissions: "job_reports" },
    { name: "VeritasKWD Idea Incubator Form", permissions: "veritasKWD_idea_incubator_form" },
    { name: "About Us", permissions: "about_us" },
    { name: "VeritasKWD Opportunity", permissions: "veritasKWD_opportunity" },
    { name: "VeritasKWD Projects", permissions: "veritasKWD_projects" },
    { name: "Veritas Endless Possibilities for Investors", permissions: "veritasKWD_investors" },
    { name: "VeritasKWD Charities", permissions: "veritasKWD_charities" },
    { name: "VeritasKWD Idea Incubator", permissions: "veritasKWD_idea_incubators" },
    { name: "VeritasKWD Volunteers", permissions: "veritasKWD_volunteers" },
    { name: "VeritasKWD Careers", permissions: "veritasKWD_careers" },
];

const ViewPermissions = ({ userId, isOpen, onClose }) => {
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && userId) {
            fetchData();
        }
    }, [isOpen, userId]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/user_permission?user_id=${userId?.id}`);
            setSelectedPermissions(response?.data?.data?.map((p) => p.permission_name) || []);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const [imageLoader, setImageLoader] = useState(false);


    return (
        <Dialog open={isOpen} onClose={() => onClose(false)} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
                <DialogPanel className="relative rounded-lg bg-white p-6 shadow-xl sm:max-w-md w-full">
                    <button
                        type="button"
                        onClick={() => onClose(false)}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                    <DialogTitle className="text-lg font-semibold text-gray-900">
                        User Profile
                    </DialogTitle>

                    {loading ? (
                        <div className="flex justify-center mt-5">
                            <InfinitySpin width={150} height={150} />
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col sm:flex-row gap-6 items-center px-2">
                                <div className="relative group">
                                    {imageLoader ? (
                                        <div className='p-4'><RotatingLines height="70"
                                            width="70"
                                            color="green" />
                                        </div>
                                    ) : (
                                        <img
                                            src={
                                                userId?.user_image
                                                    ? `${app_vars?.domain?.fileURL}${userId?.user_image}`
                                                    : userLogo
                                            }
                                            alt="User Profile"
                                            className="h-28 w-28 rounded-full border-2 border-white"
                                        />
                                    )}


                                    {/* Pencil Icon on Hover */}
                                    {/* <form onSubmit={imageFormik.handleSubmit}> */}
                                    {/* <div onClick={handleIconClick} className="absolute bottom-5 right-8 translate-x-1/2 translate-y-1/2 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <PencilSquareIcon className="h-5 w-5 text-blue-500" />
                                    </div> */}
                                    {/* <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    /> */}
                                </div>

                                <div className="text-center sm:text-left">
                                    <h4 className="font-semibold text-xl text-gray-800">{userId?.name}</h4>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium text-gray-700">Email:</span> {userId?.email}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium text-gray-700">Role:</span> Manager
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <span className="font-semibold text-lg">Permissions</span>
                                <div className="mt-5 grid grid-cols-2 gap-4">
                                    {permissionsList
                                        .filter(({ permissions }) => selectedPermissions.includes(permissions))
                                        .map(({ name }) => (
                                            <div key={name} className="bg-gray-100 p-2 rounded-md text-center">
                                                {name}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </>
                    )}
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default ViewPermissions;

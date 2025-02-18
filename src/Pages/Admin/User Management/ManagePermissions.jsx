import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { Hourglass } from "react-loader-spinner";

const permissionsList = [
    { name: "User Management", permissions: "user_management" },
    { name: "Employer", permissions: "employer" },
    { name: "Job Seekers", permissions: "job_seeker" },
    { name: "Employment Agency", permissions: "employment_agency" },
    { name: "Jobs List", permissions: "jobs_list" },
    { name: "Payment", permissions: "payment" },
    { name: "Instructions for payment", permissions: "instructions_for_payment" },
    { name: "Jobs & Applicants", permissions: "jobs_&_applicants" },
    { name: "Blogs", permissions: "blogs" },
    { name: "Contact Us", permissions: "contact_us" },
    { name: "Job Reports", permissions: "job_reports" },
    { name: "VertiasKWD Idea Incubator Form", permissions: "veritasKWD_idea_incubator_form" },
    { name: "VertiasKWD Opportunity", permissions: "veritasKWD_opportunity" },
    { name: "VertiasKWD Projects", permissions: "veritasKWD_projects" },
    { name: "VertiasKWD Investors", permissions: "veritasKWD_investors" },
    { name: "VertiasKWD Charities", permissions: "veritasKWD_charities" },
    { name: "VertiasKWD Idea Incubators", permissions: "veritasKWD_idea_incubators" },
    { name: "VertiasKWD Volunteers", permissions: "veritasKWD_volunteers" },
    { name: "VertiasKWD Careers", permissions: "veritasKWD_careers" },
];

const ManagePermissions = ({ userId, isOpen, onClose }) => {
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
            const response = await axiosInstance.get(`/api/user_permission?user_id=${userId}`);
            setSelectedPermissions(response?.data?.data?.map((p) => p.permission_name) || []);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = async (e, permission) => {
        const isChecked = e.target.checked;
        const endpoint = isChecked ? "/api/user_permission/store" : "/api/user_permission/destroy";

        try {
            await axiosInstance.post(endpoint, { user_id: userId, permission_name: permission });
            setSelectedPermissions((prev) =>
                isChecked ? [...prev, permission] : prev.filter((p) => p !== permission)
            );
            toast.success(`Permission ${isChecked ? "granted" : "revoked"} successfully`);
        } catch (error) {
            handleError(error);
        }
    };

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
                    <DialogTitle className="text-lg font-semibold text-gray-900">Manage Permissions</DialogTitle>

                    {loading ? (
                        <div className="flex justify-center mt-5">
                            <Hourglass width={50} height={50} />
                        </div>
                    ) : (
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {permissionsList.map(({ name, permissions }) => (
                                <label key={permissions} className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedPermissions.includes(permissions)}
                                        onChange={(e) => handleCheckboxChange(e, permissions)}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">{name}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default ManagePermissions;

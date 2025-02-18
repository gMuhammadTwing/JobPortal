import {
    EyeIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import Pagination from "../../../Components/Pagination";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { LoaderTable } from "../../../Components/LoaderTable";
import { Link } from "react-router-dom";
import { Button } from "../../../Components/Button";
import ManagePermissions from "./ManagePermissions";
import ViewPermissions from "./ViewPermissions";

export default function Index() {
    const [data, setData] = useState();
    const [tableLoader, setTableLoader] = useState(false);

    const fetchData = async (pageNum) => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`/api/admin_user_list?role_id=5&page=${pageNum}`);
            if (response) {
                setData(response?.data);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false);
        }
    };

    const pageNumber = async (pageNum) => {
        fetchData(pageNum);
    };

    useEffect(() => {
        fetchData(1);
    }, []);

    const [userId, setUserId] = useState("");
    const [permissionModal, setPermissionModal] = useState(false);
    const openModal = () => {
        setPermissionModal(true);
    }
    const closeModal = () => {
        setPermissionModal(false);
    }

    const [viewModal, setViewModal] = useState(false);
    const openViewModal = () => {
        setViewModal(true);
    }
    const closeViewModal = () => {
        setViewModal(false);
    }

    return (
        <div className="container mx-auto px-4 max-w-5xl h-screen mt-4">
            <ManagePermissions userId={userId} isOpen={permissionModal} onClose={closeModal} />
            <ViewPermissions userId={userId} isOpen={viewModal} onClose={closeViewModal}/>
            <Toaster richColors />
            {tableLoader ? <LoaderTable /> : (
                <>
                    <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg bg-white">
                        <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-t-lg gap-4">
                            <h3 className="text-lg md:text-xl font-bold text-red-500">User Management</h3>
                            <Button type="button" color="gradient" variant="solid">
                                <Link to="create_user">Add New User</Link>
                            </Button>
                        </div>
                        <table className="w-full min-w-full divide-y divide-gray-300 text-sm md:text-base">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-3 text-left font-semibold text-gray-900">User Name</th>
                                    <th className="px-2 py-3 text-left font-semibold text-gray-900">User Email</th>
                                    <th className="px-2 py-3 text-left font-semibold text-gray-900">Role</th>
                                    <th className="px-2 py-3 text-left font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {data?.data.length > 0 ? (
                                    data?.data.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="px-4 py-3">{item?.name || "N/A"}</td>
                                            <td className="px-2 py-3">{item?.email}</td>
                                            <td className="px-2 py-3">Manager</td>
                                            <td className="px-2 py-3">
                                                <div className="flex items-center space-x-2">
                                                    <EyeIcon onClick={() => {
                                                        openViewModal();
                                                        setUserId(item)
                                                    }} className="w-5 h-5 cursor-pointer" title="View Permissions" />
                                                    <PencilIcon onClick={() => {
                                                        openModal();
                                                        setUserId(item)
                                                    }} className="w-5 h-5 text-blue-500 cursor-pointer" title="Set Permissions" />

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center py-4 text-gray-700">
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                No Record Found
                                            </span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            <Pagination page={pageNumber} total={data?.total} page_size={data?.per_page} />
        </div>
    );
}

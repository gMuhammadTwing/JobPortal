import {
    CalendarIcon,
    AdjustmentsVerticalIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import { useState } from "react";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { Button } from "../../Components/Button";
import { toast, Toaster } from "sonner";
import AddResume from "../../Components/JobSeeker/AddResume";
export default function Resume() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const ToastSuccess = (str) => {
        toast.success(str);
    };
    const ToastError = (str) => {
        toast.error(str);
    };
    const [data, setData] = useState([
        {
            title: "Resume",
            uploadDate: "2024-11-01",
            pdf: "Default Resume"
        },
        {
            title: "CV1",
            uploadDate: "2024-10-25",
            pdf: "Default CV"
        },
        {
            title: "CV2",
            uploadDate: "2024-10-15",
            pdf: "Default CV"
        },
    ]);

    const pageNumber = async (pageNum) => {
        // Pagination logic can go here
    };

    return (
        <div className="container mx-auto px-4">
            <AddResume isOpen={isModalOpen} onClose={closeModal} success={ToastSuccess}
                error={ToastError} />
            <div className="mt-4">
                <div className="sm:flex-auto text-center pb-9 text-3xl font-bold leading-7 text-orange-500 sm:truncate sm:tracking-tight">
                    Manage Your CVs
                </div>
                <Toaster richColors />
                <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-white hidden sm:table-header-group">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-2xl font-semibold text-gray-900 sm:pl-6"
                                        >
                                            Manage Your CVs
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                                        >
                                            <Button
                                                type="button"
                                                color="gradient"
                                                variant="solid"
                                                onClick={()=>openModal()}
                                            >
                                                <PlusCircleIcon className="w-6 h-6 text-white" />
                                                Upload CV</Button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {data.length > 0 ? (
                                        data.map((job, index) => (
                                            <tr
                                                key={index}
                                                className="flex flex-col sm:table-row sm:flex-row sm:items-center"
                                            >
                                                <td className="py-4 pl-4 pr-3 text-smsm:pl-6">
                                                    <h1 className="text-blue-600 font-semibold">
                                                        {job.title}
                                                    </h1>
                                                </td>
                                                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                    <div className="flex items-center">
                                                        <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
                                                        {new Date(job.uploadDate).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "2-digit",
                                                        })}
                                                    </div>
                                                </td>
                                                {/* <td className="py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                                    <div className="flex items-center">
                                                        <DocumentIcon className="w-5 h-5 text-red-400" />
                                                        {job.pdf}
                                                    </div>
                                                </td> */}
                                                <td className="py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                                    <div className="flex items-center">
                                                        <EyeIcon className="w-5 h-5 text-black" />
                                                        <PencilIcon className="w-5 h-5 text-blue-500" />
                                                        <TrashIcon className="w-5 h-5 text-red-600" />

                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4">
                                                <span className="inline-flex text-xl items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                    No Record Found
                                                </span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination
                    page={pageNumber}
                    count={Math.ceil(data.length / 10)}
                />
            </div>
        </div>

    );
}

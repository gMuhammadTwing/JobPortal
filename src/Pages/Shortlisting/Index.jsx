import {
    CalendarIcon,
    DocumentIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import Pagination from "../../Components/Pagination";

export default function Index() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const ToastSuccess = (str) => toast.success(str);
    const ToastError = (str) => toast.error(str);

    const [shortlisting, setShortlisting] = useState([
        {
            jobTitle: "Software Engineer",
            requestBy: "John Doe",
            requestDate: "2024-11-20",
            shortlistingFee: "$500",
            status: "Pending",
            payment_status: "Unpaid",
        },
        {
            jobTitle: "Product Manager",
            requestBy: "Jane Smith",
            requestDate: "2024-11-19",
            shortlistingFee: "$750",
            status: "Processing",
            payment_status: "Paid",
        },
        {
            jobTitle: "UI/UX Designer",
            requestBy: "Emily Johnson",
            requestDate: "2024-11-18",
            shortlistingFee: "$300",
            status: "Completed",
            payment_status: "Paid",
        },
        {
            jobTitle: "Data Analyst",
            requestBy: "Michael Brown",
            requestDate: "2024-11-17",
            shortlistingFee: "$400",
            status: "Pending",
            payment_status: "Unpaid",
        },
    ]);

    const pageNumber = async (pageNum) => {
        // Pagination logic can go here
    };

    return (
        <div className="container mx-auto max-w-5xl h-screen">
            {/* <AddPayment isOpen={isModalOpen} onClose={closeModal} success={ToastSuccess} error={ToastError} /> */}
            <div className="">
                <div className="text-center pb-9 text-3xl font-bold leading-7 text-orange-500 sm:truncate sm:tracking-tight">
                    Shortlisting Requests
                </div>
                <div className="mb-2">
                    {/* <Button type="button" color="gradient" variant="solid" onClick={openModal}>
                        <PlusCircleIcon className="w-6 h-6 text-white" />
                        Add Payment
                    </Button> */}
                </div>
                <Toaster richColors />
                <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                            Job Title
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Request By
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Request Date
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Shortlisting Fee
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Payment Status
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {shortlisting.length > 0 ? (
                                        shortlisting.map((item, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-medium font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                        {item?.jobTitle
                                                            ? item?.jobTitle
                                                            : "N/A"}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-4 text-sm">
                                                    {item.requestBy}
                                                </td>
                                                <td className="px-3 py-4 text-sm">
                                                    {new Date(item.requestDate).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "2-digit",
                                                    })}
                                                </td>
                                                <td className="px-3 py-4 text-sm">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-bold ring-1 ring-inset ${item?.status === "Completed"
                                                                ? "bg-green-100 text-green-600 ring-green-300"
                                                                : item?.status === "Processing"
                                                                    ? "bg-blue-100 text-blue-600 ring-blue-300"
                                                                    : "bg-red-100 text-red-600 ring-red-300"
                                                            }`}
                                                    >
                                                        {item?.status}
                                                    </span>
                                                </td>

                                                <td className="px-3 py-4 text-sm">
                                                    {item.shortlistingFee}
                                                </td>
                                                <td className="px-3 py-4 text-sm">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-bold ring-1 ring-inset ${item?.payment_status === "Paid"
                                                            ? "bg-green-100 text-green-600 ring-green-300"
                                                            : "bg-red-100 text-red-600 ring-red-300"
                                                            }`}
                                                    >
                                                        {item?.payment_status}
                                                    </span>
                                                </td>


                                                <td className="px-3 py-4 text-sm">
                                                    <div className="flex items-center space-x-2">
                                                        <EyeIcon className="w-5 h-5 text-black" title="View Receipt" />
                                                        <PencilIcon className="w-5 h-5 text-blue-500" title="Edit Payment" />
                                                        <TrashIcon className="w-5 h-5 text-red-600" title="Delete Payment" />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4">
                                                <span className="inline-flex text-xl items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                    No shortlisting Found
                                                </span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination page={pageNumber} count={Math.ceil(shortlisting.length / 10)} />
            </div>
        </div>
    );
}

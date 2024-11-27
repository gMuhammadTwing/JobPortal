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
import { Button } from "../../Components/Button";
import Pagination from "../../Components/Pagination";
import AddPayment from "../../Components/JobSeeker/AddPayment";

export default function Payment() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const ToastSuccess = (str) => toast.success(str);
    const ToastError = (str) => toast.error(str);

    const [payments, setPayments] = useState([
        {
            subscription_id: "SUB12345",
            user_id: "USER001",
            payment_reference: "PAYREF123",
            payment_method: "Mpesa",
            amount_paid: 5000,
            payment_date: "2024-11-10",
            receipt: "receipt1.pdf",
        },
        {
            subscription_id: "SUB67890",
            user_id: "USER002",
            payment_reference: "PAYREF456",
            payment_method: "Bank Transfer",
            amount_paid: 10000,
            payment_date: "2024-10-25",
            receipt: "receipt2.jpg",
        },
        {
            subscription_id: "SUB67890",
            user_id: "USER002",
            payment_reference: "PAYREF456",
            payment_method: "Bank Transfer",
            amount_paid: 10000,
            payment_date: "2024-10-25",
            receipt: "receipt2.jpg",
        },
        {
            subscription_id: "SUB67890",
            user_id: "USER002",
            payment_reference: "PAYREF456",
            payment_method: "Bank Transfer",
            amount_paid: 10000,
            payment_date: "2024-10-25",
            receipt: "receipt2.jpg",
        },
        {
            subscription_id: "SUB67890",
            user_id: "USER002",
            payment_reference: "PAYREF456",
            payment_method: "Bank Transfer",
            amount_paid: 10000,
            payment_date: "2024-10-25",
            receipt: "receipt2.jpg",
        },
        {
            subscription_id: "SUB67890",
            user_id: "USER002",
            payment_reference: "PAYREF456",
            payment_method: "Bank Transfer",
            amount_paid: 10000,
            payment_date: "2024-10-25",
            receipt: "receipt2.jpg",
        },
        {
            subscription_id: "SUB67890",
            user_id: "USER002",
            payment_reference: "PAYREF456",
            payment_method: "Bank Transfer",
            amount_paid: 10000,
            payment_date: "2024-10-25",
            receipt: "receipt2.jpg",
        },
        {
            subscription_id: "SUB67890",
            user_id: "USER002",
            payment_reference: "PAYREF456",
            payment_method: "Bank Transfer",
            amount_paid: 10000,
            payment_date: "2024-10-25",
            receipt: "receipt2.jpg",
        },
        {
            subscription_id: "SUB67890",
            user_id: "USER002",
            payment_reference: "PAYREF456",
            payment_method: "Bank Transfer",
            amount_paid: 10000,
            payment_date: "2024-10-25",
            receipt: "receipt2.jpg",
        },
        {
            subscription_id: "SUB67890",
            user_id: "USER002",
            payment_reference: "PAYREF456",
            payment_method: "Bank Transfer",
            amount_paid: 10000,
            payment_date: "2024-10-25",
            receipt: "receipt2.jpg",
        },
    ]);

    const pageNumber = async (pageNum) => {
        // Pagination logic can go here
    };

    return (
        <div className="container mx-auto max-w-5xl">
            <AddPayment isOpen={isModalOpen} onClose={closeModal} success={ToastSuccess} error={ToastError} />
            <div className="pb-15">
                <div className="text-center pb-9 text-3xl font-bold leading-7 text-orange-500 sm:truncate sm:tracking-tight">
                    Manage Payments
                </div>
                <div className="mb-2">
                    <Button type="button" color="gradient" variant="solid" onClick={openModal}>
                        <PlusCircleIcon className="w-6 h-6 text-white" />
                        Add Payment
                    </Button>
                </div>
                <Toaster richColors />
                <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                            Subscription ID
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Payment Method
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Amount Paid
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Payment Date
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {payments.length > 0 ? (
                                        payments.map((payment, index) => (
                                            <tr key={index}>
                                                <td className="py-4 pl-4 pr-3 text-sm">
                                                    {payment.subscription_id}
                                                </td>
                                                <td className="px-3 py-4 text-sm">
                                                    {payment.payment_method}
                                                </td>
                                                <td className="px-3 py-4 text-sm">
                                                    ${payment.amount_paid.toFixed(2)}
                                                </td>
                                                <td className="px-3 py-4 text-sm">
                                                    {new Date(payment.payment_date).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "2-digit",
                                                    })}
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
                                                    No Payments Found
                                                </span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination page={pageNumber} count={Math.ceil(payments.length / 10)} />
            </div>
        </div>
    );
}

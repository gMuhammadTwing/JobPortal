import {
    CalendarIcon,
    DocumentIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "../../../Components/Button";
import Pagination from "../../../Components/Pagination";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { Switch } from "@headlessui/react";
import { toast } from "sonner";
import { LoaderTable } from "../../../Components/LoaderTable";
import moment from 'moment';

export default function PaymentIndex() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [payments, setPayments] = useState();
    const [tableLoader, setTableLoader] = useState(false);
    const fetchData = async (pageNum) => {
        setTableLoader(true);
        try {
            const { data } = await axiosInstance.get(`api/user_payment_history?page=${pageNum}`);
            if (data) {
                setPayments(data);
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
        fetchData(1)
    }, [])

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    const handleToggle = async (payment) => {
        setTableLoader(true)
        var json;
        if (payment.payment_status === true) {
            var json = {
                payment_status: false,
            };
        } else if (payment.payment_status === false) {
            var json = {
                payment_status: true,
            };
        }
        try {
            const response = await axiosInstance.post(`/api/user_payment_history/update/${payment?.id}`, json);
            if (response) {
                toast.success("Payment Updated")
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
            fetchData(1);
        }
    };

    return (
        <div className="container mx-auto max-w-5xl min-h-screen mt-4">
            {/* <AddPayment isOpen={isModalOpen} onClose={closeModal} /> */}
            <div className="pb-15">
                {/* <div className="text-center pb-9 text-3xl font-bold leading-7 text-[#ff0000] sm:truncate sm:tracking-tight">
                    Manage Payments
                </div> */}
                {/* <div className="mb-2">
                    <Button type="button" color="gradient" variant="solid" onClick={openModal}>
                        <PlusCircleIcon className="w-6 h-6 text-white" />
                        Add Payment
                    </Button>
                </div> */}
                {tableLoader ? <LoaderTable /> :
                    <>
                        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-white">
                                            <tr className="border-b border-gray-300">
                                                <th
                                                    scope="col"
                                                    className="pl-4 py-5.5 text-left text-[#ff0000] font-bold text-xl"
                                                >
                                                    Manage Payments
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">

                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                                                >
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                                                >
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                                                >
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                                                >
                                                </th>
                                            </tr>
                                            <tr>
                                                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                                    User Name
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    User Role
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Amount Paid
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Reference Number
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Payment Date
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Payment Status
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Approval
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {payments?.data?.length > 0 ? (
                                                payments?.data?.map((payment, index) => (
                                                    <tr key={index}>
                                                        <td className="py-4 pl-4 pr-3 text-sm">
                                                            {payment?.user_id?.name}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            <span>
                                                                {(() => {
                                                                    switch (payment?.user_id?.role_id) {
                                                                        case 1:
                                                                            return 'Admin';
                                                                        case 2:
                                                                            return 'Job Seeker';
                                                                        case 3:
                                                                            return 'Employer';
                                                                        case 4:
                                                                            return 'Employment Agency';
                                                                        case 5:
                                                                            return 'Admin';
                                                                        default:
                                                                            return 'Unknown Role';
                                                                    }
                                                                })()}
                                                            </span>

                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            {payment?.amount.toFixed(2)}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            {payment?.reference_number}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            {moment(payment?.created_at).format('MM-DD-YYYY HH:mm:ss A') || ""}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            {payment?.payment_status ? (
                                                                <span className="bg-green-100 text-green-600 ring-green-300 rounded-lg p-1">Approved</span>
                                                            ) : (
                                                                <span className="bg-red-100 text-red-600 rounded-lg p-1">Pending</span>
                                                            )}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            <div className="flex items-center space-x-2">
                                                                {/* <EyeIcon className="w-5 h-5 text-black" title="View Receipt" /> */}
                                                                {/* <PencilIcon className="w-5 h-5 text-blue-500" title="Edit Payment" /> */}
                                                                <Switch
                                                                    checked={payment?.payment_status}
                                                                    onClick={() => {
                                                                        handleToggle(payment);
                                                                    }}
                                                                    className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                                >
                                                                    <span className="sr-only">Use setting</span>
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className="pointer-events-none absolute h-full w-full rounded-md bg-white"
                                                                    />
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className={classNames(
                                                                            payment?.payment_status
                                                                                ? "bg-indigo-600"
                                                                                : "bg-gray-200",
                                                                            "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
                                                                        )}
                                                                    />
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className={classNames(
                                                                            payment?.payment_status
                                                                                ? "translate-x-5"
                                                                                : "translate-x-0",
                                                                            "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
                                                                        )}
                                                                    />
                                                                </Switch>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center py-4">
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

                    </>
                }
                <Pagination
                    page={pageNumber}
                    total={payments?.total}
                    page_size={payments?.per_page}
                />
            </div>
        </div>
    );
}
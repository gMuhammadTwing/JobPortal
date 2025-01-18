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

export default function Index() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [data, setData] = useState();
    const role_id = localStorage?.role_id;
    const [tableLoader, setTableLoader] = useState(false);
    const fetchData = async (pageNum) => {
        setTableLoader(true);
        try {
            const { data } = await axiosInstance.get(`/api/job_list?page=${pageNum}`);
            if (data) {
                setData(data);
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
    const handleToggle = async (item) => {
        setTableLoader(true)
        var json;
        if (item.is_featured == true) {
            var json = {
                is_featured: false,
            };
        } else if (item?.is_featured == null || item.is_featured == false) {
            var json = {
                is_featured: true,
            };
        }
        try {
            const response = await axiosInstance.post(`/api/employer_company_job_posting/update/${item?.id}`, json);
            if (response) {
                toast.success("Job Details Updated")
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
            fetchData(1);
        }
    };

    return (
        <div className="container mx-auto max-w-5xl h-screen mt-4">
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
                                                    List of Jobs
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
                                            </tr>
                                            <tr>
                                                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                                    Job Title
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    job_type
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Salary
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    location
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Job Status
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Featured
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {data?.data?.length > 0 ? (
                                                data?.data?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="py-4 pl-4 pr-3 text-sm">
                                                            {item?.job_title}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            {item?.job_type?.job_family}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            {item?.expected_salary}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            {(item?.location)}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            {item?.job_status ? (
                                                                <span className="bg-green-100 text-green-600 ring-green-300 rounded-lg p-1">{item?.job_status}</span>
                                                            ) : (
                                                                <span className="bg-red-100 text-red-600 rounded-lg p-1">{item?.job_status}</span>
                                                            )}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            <div className="flex items-center space-x-2">
                                                                {/* <EyeIcon className="w-5 h-5 text-black" title="View Receipt" /> */}
                                                                {/* <PencilIcon className="w-5 h-5 text-blue-500" title="Edit Item" /> */}
                                                                <Switch
                                                                    checked={item?.item_status}
                                                                    onClick={() => {
                                                                        handleToggle(item);
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
                                                                            item?.is_featured
                                                                                ? "bg-indigo-600"
                                                                                : "bg-gray-200",
                                                                            "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
                                                                        )}
                                                                    />
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className={classNames(
                                                                            item?.is_featured
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
                                                    <td colSpan="6" className="text-center py-4">
                                                        <span className="inline-flex text-xl items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                            No Data Found
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
                    total={data?.total}
                    page_size={data?.per_page}
                />
            </div>
        </div>
    );
}
import {
    CalendarIcon,
    DocumentIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
    PlusCircleIcon,
    ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import Pagination from "../../../Components/Pagination";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { LoaderTable } from "../../../Components/LoaderTable";

export default function Applicants({ job_id }) {
    const [data, setData] = useState();
    const [tableLoader, setTableLoader] = useState(false);
    const fetchData = async (pageNum) => {
        setTableLoader(true)
        try {
            const response = await axiosInstance.get(`/api/job_application?job_id=${job_id}&page=${pageNum}`);
            if (response) {
                setData(response?.data)
                console.log("data: ", response?.data);

            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
        }
    }

    const pageNumber = async (pageNum) => {
        fetchData(pageNum);
    };

    useEffect(() => {
        fetchData(1)
    }, [])

    return (
        <div className="container mx-auto max-w-5xl h-screen">
            <div className="">
                {/* <button
                    type="button"
                    onClick={() => {
                        // nagivate("/admin/shortlisting");
                        window.location.reload();
                    }
                    }
                    className='border border-black rounded-full p-1 px-4'
                >
                    Back
                </button> */}
                <div className="text-center pb-9 text-3xl font-bold leading-7 text-[#ff0000] sm:truncate sm:tracking-tight">
                    Applicants
                </div>
                <div className="mb-2">
                </div>
                <Toaster richColors />
                {tableLoader ? <LoaderTable /> :
                    <>
                        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-white">
                                            <tr>
                                                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                                    Job Title
                                                </th>
                                                {/* <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Job Type
                                                </th> */}
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Applicant Name
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Applicant Email
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Status
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {data?.data.length > 0 ? (
                                                data?.data.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-medium font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                                {item?.job_id?.job_title
                                                                    ? item?.job_id?.job_title
                                                                    : "N/A"}
                                                            </span>
                                                        </td>
                                                        {/* <td className="px-3 py-4 text-sm">
                                                            {item?.job_id?.job_type?.job_family}
                                                        </td> */}
                                                        <td className="px-3 py-4 text-sm">
                                                            {item?.user_id?.unique_name}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            {item?.user_id?.email}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            <span
                                                                className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-bold ring-1 ring-inset ${item?.job_status_id?.job_status == "Submitted"
                                                                    ? "bg-green-100 text-green-600 ring-green-300"
                                                                    : item?.job_status_id?.job_status == "Shortlisted"
                                                                        ? "bg-blue-100 text-blue-600 ring-blue-300"
                                                                        : "bg-red-100 text-red-600 ring-red-300"
                                                                    }`}
                                                            >
                                                                {item?.job_status_id?.job_status}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            <div className="flex items-center space-x-2">
                                                                <EyeIcon className="w-5 h-5 text-black" title="View Participant" />
                                                                <PencilIcon className="w-5 h-5 text-blue-500" title="Edit Pa" />
                                                                {/* <TrashIcon className="w-5 h-5 text-red-600" title="Delete Payment" /> */}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-4">
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
                            total={data?.total}
                            page_size={data?.per_page}
                        />
                    </>
                }
            </div>
        </div>
    );
}
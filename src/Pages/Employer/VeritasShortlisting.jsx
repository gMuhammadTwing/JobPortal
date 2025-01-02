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
import Applicants from "./Applicants";
import axiosInstance, { handleError } from "../../axiosInstance";
import { LoaderTable } from "../../Components/LoaderTable";
import Pagination from "../../Components/Pagination";

export default function VertiasShortlisting() {
    const [data, setData] = useState();
    const [jobs, setJobs] = useState(false);
    const [job_id, setJobId] = useState(null);
    const [tableLoader, setTableLoader] = useState(false);

    const fetchData = async (pageNum) => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`/api/employer_veritas_short_listing/job_list?page=${pageNum}`);
            if (response) {
                setData(response?.data);
                console.log("data: ", response?.data);
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

    return (
        <div className="container mx-auto px-4 max-w-5xl h-screen mt-4">
            {!jobs ? (
                <div>
                    <Toaster richColors />
                    {tableLoader ? <LoaderTable /> :
                        <>
                            <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-white">
                                        <tr className="border-b border-gray-300">
                                            <th
                                                scope="col"
                                                className="py-5.5 pl-4 pr-3 text-left font-bold text-xl text-[#ff0000]"
                                            >
                                                Veritas Shortlisting
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
                                        </tr>
                                        <tr>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Job Title
                                            </th>
                                            <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                                                Job Type
                                            </th>
                                            <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                                                Location
                                            </th>
                                            <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                                                Job Status
                                            </th>
                                            <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {data?.data.length > 0 ? (
                                            data?.data.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="whitespace-nowrap px-2 py-3 text-xs md:text-sm text-gray-500">
                                                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                            {item?.job_title || "N/A"}
                                                        </span>
                                                    </td>
                                                    <td className="px-2 py-3 text-xs md:text-sm">
                                                        {item?.job_type?.job_family}
                                                    </td>
                                                    <td className="px-2 py-3 text-xs md:text-sm">
                                                        {item?.location}
                                                    </td>
                                                    <td className="px-2 py-3 text-xs md:text-sm">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${item?.job_status == "Open"
                                                                ? "bg-green-100 text-green-600 ring-green-300"
                                                                : "bg-red-100 text-red-600 ring-red-300"
                                                                }`}
                                                        >
                                                            {item?.job_status}
                                                        </span>
                                                    </td>
                                                    <td className="px-2 py-3 text-xs md:text-sm">
                                                        <div className="flex items-center space-x-2">
                                                            <ArrowLeftEndOnRectangleIcon
                                                                onClick={() => {
                                                                    setJobs(true)
                                                                    setJobId(item?.id)
                                                                }}
                                                                className="w-5 h-5 text-blue-600 cursor-pointer"
                                                                title="View"
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="text-center py-4">
                                                    <span className="inline-flex text-lg md:text-xl items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                        No Record Found
                                                    </span>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                page={pageNumber}
                                total={data?.total}
                                page_size={data?.per_page}
                            />
                        </>}
                </div>
            ) : (
                <Applicants job_id={job_id} />
            )}
        </div>
    );
}

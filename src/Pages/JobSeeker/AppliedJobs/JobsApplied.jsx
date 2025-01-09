import {
    CalendarIcon,
    AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Pagination from "../../../Components/Pagination";
import { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { LoaderTable } from "../../../Components/LoaderTable";

export default function JobsApplied() {
    const user_id = localStorage.user_id;
    const [data, setData] = useState();
    const [tableLoader, setTableLoader] = useState(false);
    const fetchData = async (page) => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`api/job_application/applied_job_listing?user_id=${user_id}&page=${page}`);
            if (response) {
                setData(response.data)
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
        }
    }
    useEffect(() => {
        fetchData(1);
    }, []);

    const pageNumber = (pageNum) => {
        fetchData(pageNum);
    };

    return (
        <div className="mx-auto max-w-5xl h-screen p-4">
            <div className="pb-8">
                {/* <div className="text-center pb-6 text-3xl font-bold leading-7 text-[#ff0000] sm:truncate sm:tracking-tight">
                    
                </div> */}

                {tableLoader ? (
                    <LoaderTable />
                ) : (
                    <>
                        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-white">
                                    <tr className="border-b border-gray-300">
                                        <th
                                            scope="col"
                                            className="py-5.5 pl-4 pr-3 text-left font-bold text-xl text-[#ff0000]"
                                        >
                                            My Job Applications
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {data?.data?.length > 0 ? (
                                        data?.data?.map((job, index) => (
                                            <tr
                                                key={index}
                                                className="flex flex-col sm:table-row sm:flex-row sm:items-center"
                                            >
                                                {/* Job Title and Company Info */}
                                                <td className="py-4 px-4 text-sm text-gray-500 sm:pl-6">
                                                    <h1 className="text-blue-600 font-semibold text-lg">
                                                        {job?.job_id?.job_title}
                                                    </h1>
                                                    <div className="mt-1">
                                                        <span>{job?.job_id?.company_id?.company_name}</span>,{" "}
                                                        <span>{job?.job_id?.location}</span>
                                                    </div>
                                                </td>

                                                {/* Created Date */}
                                                <td className="px-4 py-4 text-sm text-gray-400 flex gap-x-2 items-center mt-2 sm:mt-0">
                                                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                                                    <span>
                                                        {new Date(job?.created_at).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "2-digit",
                                                        })}
                                                    </span>
                                                </td>

                                                {/* Job Status */}
                                                <td className="px-4 py-4 text-sm text-gray-400 flex gap-x-2 items-center mt-2 sm:mt-0">
                                                    <AdjustmentsVerticalIcon className="w-5 h-5 text-gray-400" />
                                                    <span>{job?.job_status_id?.job_status}</span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4">
                                                <span className="inline-flex text-lg items-center rounded-md bg-blue-50 px-4 py-2 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                    No Record Found
                                                </span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Component */}

                    </>
                )}
                <div className="mt-2">
                    <Pagination page={pageNumber} total={data?.total} page_size={data?.per_page} />
                </div>
            </div>
        </div>


    );
}

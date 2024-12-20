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
        <div className=" mx-auto max-w-5xl h-screen">
            <div className="pb-15">
                <div className="sm:flex-auto text-center pb-9 text-3xl font-bold leading-7 text-orange-500 sm:truncate sm:tracking-tight">
                    My Job Applications
                </div>
                {tableLoader ? <LoaderTable /> :
                    <>
                        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {data?.data?.length > 0 ? (
                                                data?.data?.map((job, index) => (
                                                    <tr
                                                        key={index}
                                                        className="flex flex-col sm:table-row sm:flex-row sm:items-center"
                                                    >
                                                        <td className="py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                                            <h1 className="text-blue-600 font-semibold text-[1.2rem]">
                                                                {job?.job_id?.job_title}
                                                            </h1>
                                                            <div className="mt-1">
                                                                <span>{job?.job_id?.company_id?.company_name}</span>,{" "}
                                                                <span>{job?.job_id?.location}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-3 py-4 text-sm text-gray-400 flex mt-2 gap-x-2">
                                                            <div className="flex items-center">
                                                                <CalendarIcon className="w-5 h-5 text-gray-400" />
                                                                {new Date(job?.created_at).toLocaleDateString("en-US", {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "2-digit",
                                                                })}
                                                            </div>
                                                        </td>
                                                        <td className="px-3 py-4 text-sm text-gray-400 flex mt-2 gap-x-2">
                                                            <div className="flex items-center">
                                                                <AdjustmentsVerticalIcon className="w-5 h-5 text-gray-400" />
                                                                {job?.job_status_id?.job_status}
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
                            total={data?.total}
                            page_size={data?.per_page}
                        />
                    </>
                }
            </div>
        </div>

    );
}

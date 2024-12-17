import {
    CalendarIcon,
    AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Pagination from "../../../Components/Pagination";
import { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../../axiosInstance";

export default function JobsApplied() {
    const user_id = localStorage.user_id;
    const [data, setData] = useState([
        {
            jobTitle: "Software Engineer",
            industryName: "Technology Company",
            location: "San Francisco, CA",
            appliedDate: "2024-11-01",
            status: "Pending",
        },
        {
            jobTitle: "Data Analyst",
            industryName: "Finance Company",
            location: "New York, NY",
            appliedDate: "2024-10-25",
            status: "Interview Scheduled",
        },
        {
            jobTitle: "Project Manager",
            industryName: "Construction Company",
            location: "Chicago, IL",
            appliedDate: "2024-10-15",
            status: "Rejected",
        },
    ]);

    const fetchData = async (page) => {
        // setTableLoader(true);
        try {
            const response = await axiosInstance.get(`api/job_application/applied_job_listing?user_id=${user_id}&page=${page}`);
            if (response) {
                // setData(response.data)
                console.log("Applied Jobs: ", response);
            }
        } catch (error) {
            handleError(error);
        } finally {
            // setTableLoader(false)
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
                <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-300">
                                {/* <thead className="bg-gray-50 hidden sm:table-header-group">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        Job Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Industry Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Location
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Applied Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Status
                                    </th>
                                </tr>
                            </thead> */}
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {data.length > 0 ? (
                                        data.map((job, index) => (
                                            <tr
                                                key={index}
                                                className="flex flex-col sm:table-row sm:flex-row sm:items-center"
                                            >
                                                <td className="py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                                    <h1 className="text-blue-600 font-semibold text-[1.2rem]">
                                                        {job.jobTitle}
                                                    </h1>
                                                    <div className="mt-1">
                                                        <span>{job.industryName}</span>,{" "}
                                                        <span>{job.location}</span>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-400 flex mt-2 gap-x-2">
                                                    <div className="flex items-center">
                                                        <CalendarIcon className="w-5 h-5 text-gray-400" />
                                                        {new Date(job.appliedDate).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "2-digit",
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-400 flex mt-2 gap-x-2">
                                                    <div className="flex items-center">
                                                        <AdjustmentsVerticalIcon className="w-5 h-5 text-gray-400" />
                                                        {job.status}
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

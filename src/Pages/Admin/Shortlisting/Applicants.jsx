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
import { Link, useNavigate } from "react-router-dom";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { LoaderTable } from "../../../Components/LoaderTable";
import Pagination from "../../../Components/Pagination";
import { useDropdownContext } from "../../../DropdownProvider";

export default function Applicants({ job_id }) {
    const [data, setData] = useState();
    const [tableLoader, setTableLoader] = useState(false);
    const fetchData = async (pageNum) => {
        setTableLoader(true)
        try {
            const response = await axiosInstance.get(`/api/job_application?job_id=${job_id}&page=${pageNum}`);
            if (response) {
                setData(response?.data)

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
    const dropDownValues = useDropdownContext();

    useEffect(() => {
        fetchData(1)
    }, [])

    const handleChange = async (event, item) => {
        setTableLoader(true);
        const json = {
            job_status_id: event.target.value
        }
        try {
            const response = await axiosInstance.post(`/api/job_application/update/${item?.id}`, json);
            if (response) {
                toast.success("Applicant's status updated")
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
            fetchData(1);
        }
    };

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
                {/* <div className="text-center pb-9 text-3xl font-bold leading-7 text-[#ff0000] sm:truncate sm:tracking-tight">
                    Applicants
                </div> */}
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
                                            <tr className="border-b border-gray-300">
                                                <th
                                                    scope="col"
                                                    className="py-5.5 pl-4 pr-3 text-left font-bold text-xl text-[#ff0000]"
                                                >
                                                    List of Applicants
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
                                                        <td className="px-3 py-4 text-sm min-w-[150px] max-w-xs sm:max-w-sm">
                                                            <span className="block">
                                                                <select
                                                                    name="job_type"
                                                                    onChange={(e) => handleChange(e, item)}
                                                                    value={item?.job_status_id?.id}
                                                                    className="block w-full sm:w-auto py-1.5 px-2 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                                >
                                                                    <option value="">Select</option>
                                                                    {dropDownValues?.job_status?.map((status) => (
                                                                        <option key={status.id} value={status.id}>
                                                                            {status.job_status}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </span>
                                                        </td>

                                                        <td className="py-4 pl-4 pr-3 text-smsm:pl-6">
                                                            <Link to={"view-applicant/" + item?.user_id?.id}><EyeIcon className="w-5 h-5 cursor-pointer" title="View" /></Link>
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
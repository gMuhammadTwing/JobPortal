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
import { LoaderTable } from "../../../Components/LoaderTable";

export default function Contacts() {
    const [data, setData] = useState();
    const [tableLoader, setTableLoader] = useState(false);

    const fetchData = async (pageNum) => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`/api/contact_us?page=${pageNum}`);
            if (response) {
                setData(response?.data);
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
    const parser = new DOMParser();

    return (
        <div className="container mx-auto px-4 max-w-5xl h-screen mt-4">
            <div>
                {/* <div className="text-center pb-6 text-2xl md:text-3xl font-bold leading-7 text-[#ff0000] sm:truncate sm:tracking-tight">
                    Contact Us
                </div> */}
                <Toaster richColors />
                {tableLoader ? <LoaderTable /> :
                    <>
                        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg mb-2">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-white">
                                    <tr className="border-b border-gray-300">
                                        <th
                                            scope="col"
                                            className="py-5.5 pl-4 pr-3 text-left font-bold text-xl text-[#ff0000]"
                                        >
                                            Contact Us
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
                                    </tr>
                                    <tr>
                                        <th className="px-3 py-5.5 text-left text-sm font-semibold text-gray-900">
                                            Full Name
                                        </th>
                                        <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                                            Phone
                                        </th>
                                        <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                                            Message
                                        </th>
                                        {/* <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                                            Actions
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {data?.data.length > 0 ? (
                                        data?.data.map((item, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-2 py-3 text-xs md:text-sm text-gray-500">
                                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                        {item?.full_name || "N/A"}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-3 text-xs md:text-sm">
                                                    {item?.phone}
                                                </td>
                                                <td className="px-2 py-3 text-xs md:text-sm">
                                                    {item?.email}
                                                </td>
                                                <td className="px-2 py-3 text-xs md:text-sm">
                                                    {parser.parseFromString(item?.message || "", "text/html").body.textContent.trim()}
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

                    </>}
                <Pagination
                    page={pageNumber}
                    total={data?.total}
                    page_size={data?.per_page}
                />
            </div>
        </div>
    );
}

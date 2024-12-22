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
        <div className="container mx-auto px-4 max-w-5xl h-screen">
            <div>
                <div className="text-center pb-6 text-2xl md:text-3xl font-bold leading-7 text-orange-500 sm:truncate sm:tracking-tight">
                    Contact Us
                </div>
                <Toaster richColors />
                {tableLoader ? <LoaderTable /> :
                    <>
                        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="py-3 pl-2 pr-3 text-left text-xs md:text-sm font-semibold text-gray-900">
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
                                                        {item?.title || "N/A"}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-3 text-xs md:text-sm">
                                                    {item?.is_published ? "Yes" : "No"}
                                                </td>
                                                {/* <td className="px-2 py-3 text-xs md:text-sm">
                                                    <div className="flex items-center space-x-2">
                                                        <EyeIcon onClick={() => blogHandler(item, true)} className=" cursor-pointer w-5 h-5 text-black" title="View Participant" />
                                                        <PencilIcon onClick={() => blogHandler(item, false)} className="w-5 h-5 text-blue-500 cursor-pointer" title="Edit Pa" />
                                                        <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer" title="Delete Payment" />
                                                    </div>
                                                </td> */}
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
        </div>
    );
}

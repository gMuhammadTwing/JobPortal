import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import Pagination from "../../../Components/Pagination";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { LoaderTable } from "../../../Components/LoaderTable";
import { EyeIcon } from "@heroicons/react/24/outline";
import app_vars from "../../../config";

export default function Index() {
    const [data, setData] = useState();
    const [tableLoader, setTableLoader] = useState(false);

    const fetchData = async (pageNum) => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`api/veritas_kwd_idea_incubators_form?page=${pageNum}`);
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
                            <div className="bg-white py-5.5 pl-4 pr-3 text-left font-bold text-xl text-[#ff0000] border-b border-gray-300">
                                VeritasKWD Idea Incubator Form
                            </div>
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                                            Name
                                        </th>
                                        <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                                            Message
                                        </th>
                                        <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                                            Attachment
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
                                                <td className="px-5 py-3 text-xs md:text-sm">
                                                    {item?.name || "N/A"}
                                                </td>
                                                <td className="px-2 py-3 text-xs md:text-sm">
                                                    {item?.email}
                                                </td>
                                                <td className="px-2 py-3 text-xs md:text-sm">
                                                    {item?.message}
                                                </td>
                                                <td className="px-6 py-3 text-xs md:text-sm text-center">
                                                    {item?.attachment &&
                                                        <a href={`${app_vars?.domain?.fileURL}${item?.attachment}`} target="_blank"
                                                            rel="noopener noreferrer"><EyeIcon className="w-5 h-5 text-black" /></a>
                                                    }
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

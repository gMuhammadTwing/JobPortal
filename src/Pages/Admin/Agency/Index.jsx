import {
    CalendarIcon,
    AdjustmentsVerticalIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Pagination from "../../../Components/Pagination";
import { useEffect, useState } from "react";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../Components/Button";
import { toast, Toaster } from "sonner";
import axiosInstance, { handleError } from "../../../axiosInstance";
import app_vars from "../../../config";
import DeleteModal from "../../../Components/DeleteModal";
import { LoaderTable } from "../../../Components/LoaderTable";
import { Switch } from "@headlessui/react";
export default function Index() {
    const [data, setData] = useState([])
    const [tableLoader, setTableLoader] = useState(false);
    const fetchData = async (page) => {
        setTableLoader(true)
        try {
            const response = await axiosInstance.get(`/api/admin_user_list?role_id=4&page=${page}`);
            if (response) {
                setData(response?.data)
                console.log(response);
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

    const pageNumber = async (pageNum) => {
        fetchData(pageNum);
    };
    return (
        <div className="container mx-auto max-w-5xl min-h-screen mt-4">
            <div className="pb-15">
                <Toaster richColors />
                {tableLoader ? <LoaderTable /> :
                    <>
                        <div className="overflow-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-white hidden sm:table-header-group">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="py-5.5 pl-4 pr-3 text-left font-bold text-xl text-[#ff0000]"
                                                >
                                                    List of Employer Agency
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">

                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">

                                                </th>
                                            </tr>
                                            <tr className="border-t">
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >Name
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Email
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Unique Name
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {data?.data?.length > 0 ? (
                                                data?.data?.map((item, index) => (
                                                    <tr
                                                        key={index}
                                                        className="flex flex-col sm:table-row sm:flex-row sm:items-center"
                                                    >
                                                        <td className="py-4 pl-4 pr-3 text-smsm:pl-6">
                                                            <h1 className=" font-semibold">
                                                                {item?.name}
                                                            </h1>
                                                        </td>
                                                        <td className="py-4 pl-4 pr-3 text-smsm:pl-6">
                                                            {item?.email}
                                                        </td>
                                                        <td className="py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                            {item?.unique_name}
                                                        </td>
                                                        <td className="py-4 pl-4 pr-3 text-smsm:pl-6">
                                                            <Link to={"view-agency/" + item?.id}><EyeIcon className="w-5 h-5 cursor-pointer" title="View" /></Link>
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

                        <div className="mt-2">
                            <Pagination page={pageNumber} total={data?.total} page_size={data?.per_page} />
                        </div>
                    </>
                }
            </div>
        </div>

    );
}

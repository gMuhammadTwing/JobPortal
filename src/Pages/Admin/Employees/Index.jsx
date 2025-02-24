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
import { useDropdownContext } from "../../../DropdownProvider";
export default function Index() {
    const [data, setData] = useState([])
    const dropDownValues = useDropdownContext();
    const [tableLoader, setTableLoader] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const fetchData = async (page, name, email) => {
        setTableLoader(true)
        try {
            const response = await axiosInstance.get(`/api/admin_user_list?role_id=3&page=${page}&name=${name}&email=${email}`);
            if (response) {
                setData(response?.data)
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
        }
    }
    useEffect(() => {
        fetchData(1, name, email);
    }, []);

    const pageNumber = async (pageNum) => {
        fetchData(pageNum, name, email);
    };

    const searchEmail = (item) => {
        setEmail(item)
        fetchData(1, name, item)
    }
    const searchName = (item) => {
        setName(item)
        fetchData(1, item, email)
    }
    const clearFilter = () => {
        setName("");
        setEmail("");
        fetchData(1, "", "")
    }

    const handleChange = async (event, item) => {
        setTableLoader(true);
        const json = {
            is_status: event.target.value
        }         
        try {
            const response = await axiosInstance.post(`/api/auth/update_password/${item?.id}`, json);
            if (response) {
                toast.success("Status updated")
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
            fetchData(1,"","");
        }
    };

    return (
        <div className="container mx-auto max-w-5xl min-h-screen mt-4">
            <div className="pb-15">
                <Toaster richColors />
                <>
                    <div className="overflow-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden">
                                <div className="bg-white py-5.5 pl-4 pr-3 text-left font-bold text-xl text-[#ff0000]">
                                    List of Employer

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 font-normal">
                                        {/* Name Field */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Search"
                                                onChange={(e) => searchName(e.target.value)}
                                                value={name}
                                                className="block w-full py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>

                                        {/* Email Field */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="text"
                                                placeholder="Search"
                                                onChange={(e) => searchEmail(e.target.value)}
                                                value={email}
                                                className="block w-full py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>

                                        {/* Clear Filter Button */}
                                        <div className="flex items-end">
                                            <Button
                                                type="button"
                                                color="gradient"
                                                variant="outline"
                                                onClick={() => clearFilter()}
                                                className="w-full sm:w-auto"
                                            >
                                                Clear Filter
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                                {tableLoader ? <LoaderTable /> :
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-white hidden sm:table-header-group">
                                            {/* <tr>
                                                <th
                                                    scope="col"
                                                    className="py-5.5 pl-4 pr-3 text-left font-bold text-xl text-[#ff0000]"
                                                >
                                                    List of Employer

                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">

                                                </th>
                                                {/* <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">

                                                </th> */}
                                            {/* </tr> */}
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
                                                    Status
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
                                                        <td className="px-3 py-4 text-sm min-w-[150px] max-w-xs sm:max-w-sm">
                                                            <span className="block">
                                                                <select
                                                                    name="job_type"
                                                                    onChange={(e) => handleChange(e, item)}
                                                                    value={item?.is_status}
                                                                    className="block w-full sm:w-auto py-1.5 px-2 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                                >
                                                                    <option value="">Select</option>
                                                                    {dropDownValues?.user_status?.map((status) => (
                                                                        <option key={status.id} value={status.id}>
                                                                            {status.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </span>
                                                        </td>
                                                        <td className="py-4 pl-4 pr-3 text-smsm:pl-6 flex">
                                                            <Link to={"view-employer/" + item?.id}><EyeIcon className="w-5 h-5 cursor-pointer" title="View" /></Link>
                                                            <Link to={"edit-employer/" + item?.id}><PencilIcon className="w-5 h-5 cursor-pointer text-blue-500" title="Edit" /></Link>
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
                                }
                            </div>
                        </div>
                    </div>
                </>
                <div className="mt-2">
                    <Pagination page={pageNumber} total={data?.total} page_size={data?.per_page} />
                </div>
            </div>
        </div>

    );
}

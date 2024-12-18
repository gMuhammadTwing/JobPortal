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
import AddResume from "./AddResume";
import axiosInstance, { handleError } from "../../../axiosInstance";
import app_vars from "../../../config";
import DeleteModal from "../../../Components/DeleteModal";
import { LoaderTable } from "../../../Components/LoaderTable";
import { Switch } from "@headlessui/react";
export default function Resume() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false)
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUpdateData(null)
    };

    const [data, setData] = useState([])
    const [updateData, setUpdateData] = useState(null);
    const user_id = localStorage.user_id;
    const [tableLoader, setTableLoader] = useState(false);
    const fetchData = async () => {
        setTableLoader(true)
        try {
            const response = await axiosInstance.get(`api/job_seeker_resume?user_id=${user_id}`);
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
    const [endpoint, setEndpoint] = useState()
    useEffect(() => {
        fetchData();
    }, [isModalOpen, isDelete]);

    const pageNumber = async (pageNum) => {
        // Pagination logic can go here
    };
    const update = (item) => {
        setUpdateData(item)
        openModal();
    }
    const closeDeleteModal = () => {
        setIsDelete(false);
    }
    const deleteHandler = (data) => {
        setEndpoint(`api/job_seeker_resume/destroy/${data?.id}`)
        setIsDelete(true)
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    const handleToggle = async (item) => {
        setTableLoader(true)
        var json;
        if (item.is_current === true) {
            var json = {
                is_current: false,
            };
        } else if (item.is_current === false) {
            var json = {
                is_current: true,
            };
        }
        try {
            const response = await axiosInstance.post(`api/job_seeker_resume/update/${item?.id}`, json);
            if (response) {
                toast.success("Resume Data Saved")
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
            fetchData();
        }
    };

    return (
        <div className="container mx-auto max-w-5xl min-h-screen">
            <AddResume isOpen={isModalOpen} onClose={closeModal} updateData={updateData} />
            <DeleteModal
                isOpen={isDelete}
                onClose={closeDeleteModal}
                name="Resume"
                endpoint={endpoint}
            />

            <div className="pb-15">
                <div className="sm:flex-auto text-center pb-9 text-3xl font-bold leading-7 text-orange-500 sm:truncate sm:tracking-tight">
                    Manage Your CVs
                </div>
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
                                                    className="py-3.5 pl-4 pr-3 text-left text-xl font-semibold text-gray-900 sm:pl-6"
                                                >
                                                    Manage Your CVs
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
                                                    <Button
                                                        type="button"
                                                        color="gradient"
                                                        variant="solid"
                                                        onClick={() => openModal()}
                                                    >
                                                        <PlusCircleIcon className="w-6 h-6 text-white" />
                                                        Upload CV</Button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {data?.length > 0 ? (
                                                data?.map((item, index) => (
                                                    <tr
                                                        key={index}
                                                        className="flex flex-col sm:table-row sm:flex-row sm:items-center"
                                                    >
                                                        <td className="py-4 pl-4 pr-3 text-smsm:pl-6">
                                                            <h1 className="text-blue-600 font-semibold">
                                                                {item?.is_current ? "Active" : "In-active"}
                                                            </h1>
                                                        </td>
                                                        <td className="py-4 pl-4 pr-3 text-smsm:pl-6">
                                                            <Switch
                                                                checked={item.is_current}
                                                                onClick={() => {
                                                                    handleToggle(item);
                                                                }}
                                                                className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            >
                                                                <span className="sr-only">Use setting</span>
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="pointer-events-none absolute h-full w-full rounded-md bg-white"
                                                                />
                                                                <span
                                                                    aria-hidden="true"
                                                                    className={classNames(
                                                                        item.is_current
                                                                            ? "bg-indigo-600"
                                                                            : "bg-gray-200",
                                                                        "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
                                                                    )}
                                                                />
                                                                <span
                                                                    aria-hidden="true"
                                                                    className={classNames(
                                                                        item.is_current
                                                                            ? "translate-x-5"
                                                                            : "translate-x-0",
                                                                        "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
                                                                    )}
                                                                />
                                                            </Switch>
                                                        </td>
                                                        <td className="py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                            <div className="flex items-center">
                                                                <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
                                                                {new Date(item.created_at).toLocaleDateString("en-US", {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "2-digit",
                                                                })}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                                            <div className="flex items-center gap-2">
                                                                <a href={`${app_vars?.domain?.fileURL}${item?.resume_file}`} target="_blank"
                                                                    rel="noopener noreferrer"><EyeIcon className="w-5 h-5 text-black" /></a>
                                                                {/* <PencilIcon className="w-5 h-5 text-blue-500 cursor-pointer" onClick={() => update(item)} /> */}
                                                                <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer" onClick={() => deleteHandler(item)} />

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
                            count={Math.ceil(data?.length / 10)}
                        />
                    </>
                }
            </div>
        </div>

    );
}

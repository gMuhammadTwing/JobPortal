import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import AddCoursework from "./AddCoursework";
import { Button } from "../../../Components/Button";
import Pagination from "../../../Components/Pagination";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { useParams } from "react-router-dom";
import { LoaderTable } from "../../../Components/LoaderTable";
import DeleteModal from "../../../Components/DeleteModal";

export default function Index() {
    const param = useParams();

    const institute_id = param?.id != "all" ? param?.id : "";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setViewData(null);
        setView(false);
    }
    const [data, setData] = useState();
    const user_id = localStorage.user_id;
    const [tableLoader, setTableLoader] = useState(false);
    const fetchData = async (page) => {
        setTableLoader(true)
        try {
            const response = await axiosInstance.get(`api/job_seeker_course_work?institute_id=${institute_id}&page=${page}`);
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
        fetchData(pageNum)
    };
    const [isDelete, setIsDelete] = useState(false)
    useEffect(() => {
        fetchData(1)
    }, [isModalOpen, isDelete])

    const [viewData, setViewData] = useState(null);
    const [view, setView] = useState(false);
    const viewCourse = (item, view) => {
        setView(view);
        setViewData(item);
        openModal();
    }
    const closeDeleteModal = () => {
        setIsDelete(false);
    }
    const [endpoint, setEndpoint] = useState()
    const deleteHandler = (data) => {
        setEndpoint(`api/job_seeker_course_work/destroy/${data?.id}`)
        setIsDelete(true)
    }
    return (
        <div className="container mx-auto max-w-5xl h-screen">
            <AddCoursework isOpen={isModalOpen} onClose={closeModal} view={view} data={viewData} />
            <DeleteModal
                isOpen={isDelete}
                onClose={closeDeleteModal}
                name="Coursework"
                endpoint={endpoint}
            />
            <div className="mt-4">
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
                                                    Coursework List
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                </th>
                                            </tr>
                                            <tr>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Course Title
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Grade
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Details
                                                </th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {data?.data?.length > 0 ? (
                                                data?.data.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-3 py-4 text-sm text-gray-500">
                                                            {item?.subject_name}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            {item?.grade_obtained}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm text-gray-500">
                                                            {item?.details}
                                                        </td>
                                                        <td className="px-3 py-4 text-sm">
                                                            <div className="flex items-center space-x-2">
                                                                <EyeIcon onClick={() => viewCourse(item, true)} className="w-5 h-5 text-black cursor-pointer" title="View Coursework" />
                                                                <PencilIcon onClick={() => viewCourse(item, false)} className="w-5 h-5 text-blue-500 cursor-pointer" title="Edit Coursework" />
                                                                <TrashIcon onClick={() => deleteHandler(item)} className="w-5 h-5 text-red-600 cursor-pointer" title="Delete Coursework" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-4">
                                                        <span className="inline-flex text-xl items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                            No coursework found
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

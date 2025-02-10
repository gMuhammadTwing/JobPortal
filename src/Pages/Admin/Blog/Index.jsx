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
import { Button } from "../../../Components/Button";
import AddBlogPost from "./AddBlogPost";
import { Link } from "react-router-dom";

export default function Index() {
    const [data, setData] = useState();
    const [updatedData, setUpdatedData] = useState(null);
    const [tableLoader, setTableLoader] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const closeModal = () => {
        setOpenModal(false);
        setView(false)
        setUpdatedData(null)
    }

    const fetchData = async (pageNum) => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`/api/blogs?page=${pageNum}`);
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
    }, [openModal]);
    const [view, setView] = useState(false);
    const blogHandler = (data, view) => {
        setUpdatedData(data);
        setView(view)
        setOpenModal(true);
    }

    return (
        <div className="container mx-auto px-4 max-w-5xl h-screen mt-4">
            <AddBlogPost isOpen={openModal} onClose={closeModal} data={updatedData} view={view} />
            <div>
                {/* <div className="text-center pb-6 text-2xl md:text-3xl font-bold leading-7 text-[#ff0000] sm:truncate sm:tracking-tight">
                    Blogs
                </div> */}
                <Toaster richColors />
                {tableLoader ? <LoaderTable /> :
                    <>
                        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg bg-white">
                            <div className="flex flex-col sm:flex-row justify-between items-center p-4 cursor-pointer bg-white rounded-t-lg gap-4">
                                <h3 className="text-xl font-bold text-[#ff0000]">Blogs Management</h3>
                                <Button
                                    type="button"
                                    onClick={() => setOpenModal(true)}
                                    color="gradient"
                                    variant="solid"
                                    className="mr-1 mb-2"
                                >
                                    Add Blog
                                </Button>
                            </div>
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Blog Title
                                        </th>
                                        <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                                            Published
                                        </th>
                                        <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                                            Actions
                                        </th>
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
                                                <td className="px-2 py-3 text-xs md:text-sm">
                                                    <div className="flex items-center space-x-2">
                                                        <Link to={`/blog/blog_details/${item?.id}`}><EyeIcon className=" cursor-pointer w-5 h-5 text-black" title="View Blog" /></Link>
                                                        <PencilIcon onClick={() => blogHandler(item, false)} className="w-5 h-5 text-blue-500 cursor-pointer" title="Edit Blog" />
                                                        <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer" title="Delete Blog" />
                                                    </div>
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

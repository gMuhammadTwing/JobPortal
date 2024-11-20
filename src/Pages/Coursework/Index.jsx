import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import Pagination from "../../Components/Pagination";
import { Button } from "../../Components/Button";
import AddCoursework from "./AddCoursework";

export default function Index() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const ToastSuccess = (str) => toast.success(str);
    const ToastError = (str) => toast.error(str);

    const [coursework, setCoursework] = useState([
        {
            degree_program: "Computer Science",
            institution_name: "XYZ University",
            course_title: "Introduction to Accounting 1",
            grade: "A",
            year_of_completion: "2024",
        },
        {
            degree_program: "Economics",
            institution_name: "ABC University",
            course_title: "Business Studies",
            grade: "B",
            year_of_completion: "2023",
        },
        {
            degree_program: "Business Administration",
            institution_name: "XYZ University",
            course_title: "Principles of Management",
            grade: "A",
            year_of_completion: "2022",
        },
        {
            degree_program: "Sociology",
            institution_name: "XYZ University",
            course_title: "Sociology",
            grade: "C",
            year_of_completion: "2024",
        },
    ]);

    const pageNumber = async (pageNum) => {
        // Pagination logic can go here
    };

    return (
        <div className="container mx-auto px-4">
            <AddCoursework isOpen={isModalOpen} onClose={closeModal} success={ToastSuccess} error={ToastError} />
            <div className="mt-4">
                <div className="text-center pb-9 text-3xl font-bold leading-7 text-orange-500 sm:truncate sm:tracking-tight">
                    Coursework List
                </div>
                <div className="mb-2">
                    <Button type="button" color="gradient" variant="solid" onClick={openModal}>
                        Add Coursework
                    </Button>
                </div>
                <Toaster richColors />
                <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                            Degree Program
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Institution Name
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Course Title
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Grade
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Year of Completion
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {coursework.length > 0 ? (
                                        coursework.map((item, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-medium font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                        {item?.degree_program
                                                            ? item?.degree_program
                                                            : "N/A"}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                    {item.institution_name}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                    {item.course_title}
                                                </td>
                                                <td className="px-3 py-4 text-sm">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-bold ring-1 ring-inset ${item.grade === "A"
                                                            ? "bg-green-100 text-green-600 ring-green-300"
                                                            : item.grade === "B"
                                                                ? "bg-blue-100 text-blue-600 ring-blue-300"
                                                                : "bg-red-100 text-red-600 ring-red-300"
                                                            }`}
                                                    >
                                                        {item.grade}
                                                    </span>
                                                </td>

                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                    {item.year_of_completion}
                                                </td>
                                                <td className="px-3 py-4 text-sm">
                                                    <div className="flex items-center space-x-2">
                                                        <EyeIcon className="w-5 h-5 text-black" title="View Coursework" />
                                                        <PencilIcon className="w-5 h-5 text-blue-500" title="Edit Coursework" />
                                                        <TrashIcon className="w-5 h-5 text-red-600" title="Delete Coursework" />
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
                <Pagination page={pageNumber} count={Math.ceil(coursework.length / 10)} />
            </div>
        </div>
    );
}

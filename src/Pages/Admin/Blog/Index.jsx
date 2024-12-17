import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import AddBlogPost from "./AddBlogPost";
import { Button } from "../../../Components/Button";
import Pagination from "../../../Components/Pagination";

export default function Index() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const ToastSuccess = (str) => toast.success(str);
    const ToastError = (str) => toast.error(str);

    const [blogPosts, setBlogPosts] = useState([
        {
            blog_id: 1,
            author_id: 101,
            title: "Understanding React.js",
            date_published: "2024-10-01",
            status: "Published",
        },
        {
            blog_id: 2,
            author_id: 102,
            title: "Platform Updates in 2024",
            date_published: "2024-11-01",
            status: "Draft",
        },
        {
            blog_id: 3,
            author_id: 103,
            title: "Career Growth in Tech",
            date_published: "2024-09-15",
            status: "Published",
        },
        {
            blog_id: 4,
            author_id: 104,
            title: "The Future of Web Development",
            date_published: "2024-11-05",
            status: "Published",
        },
    ]);

    const pageNumber = async (pageNum) => {
        // Pagination logic can go here
    };

    return (
        <div className=" mx-auto max-w-5xl h-screen">
            <AddBlogPost isOpen={isModalOpen} onClose={closeModal} success={ToastSuccess} error={ToastError} />
            <div className="">
                <div className="text-center pb-9 text-3xl font-bold leading-7 text-orange-500 sm:truncate sm:tracking-tight">
                    Blog Posts
                </div>
                <div className="mb-2">
                    <Button type="button" color="gradient" variant="solid" onClick={openModal}>
                        Add New Blog Post
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
                                            Blog ID
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Author ID
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Title
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Date Published
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
                                    {blogPosts.length > 0 ? (
                                        blogPosts.map((item, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {item.blog_id}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                    {item.author_id}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                    {item.title}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                    {item.date_published}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-bold ring-1 ring-inset ${
                                                            item.status === "Published"
                                                                ? "bg-green-100 text-green-600 ring-green-300"
                                                                : "bg-yellow-100 text-yellow-600 ring-yellow-300"
                                                        }`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-4 text-sm">
                                                    <div className="flex items-center space-x-2">
                                                        <EyeIcon className="w-5 h-5 text-black" title="View Blog Post" />
                                                        <PencilIcon className="w-5 h-5 text-blue-500" title="Edit Blog Post" />
                                                        <TrashIcon className="w-5 h-5 text-red-600" title="Delete Blog Post" />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">
                                                <span className="inline-flex text-xl items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                    No blog posts found
                                                </span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination page={pageNumber} count={Math.ceil(blogPosts.length / 10)} />
            </div>
        </div>
    );
}

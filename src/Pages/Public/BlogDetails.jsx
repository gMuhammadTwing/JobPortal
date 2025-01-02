import { CalendarDateRangeIcon, EyeIcon, MapIcon, MapPinIcon, PencilSquareIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import Pagination from "../../Components/Pagination";
import { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../axiosInstance";
import { useParams } from "react-router-dom";
import app_vars from "../../config";
import ReactQuill from "react-quill";
import { BlogDetailsSkeleton } from "../../Components/BlogDetailsSkeleton";
import { toast } from "sonner";
import userLogo from './../../assets/user.jpeg'
import { InfinitySpin } from "react-loader-spinner";
export default function BlogDetails() {
    // const data = [
    //     {
    //         id: 1,
    //         image: "https://kofejob.dreamstechnologies.com/html/template/assets/img/blog/aboutus.jpg",
    //         title: "Build a Coaching Website Product Store Images",
    //         location: "Los Angeles",
    //         date: "22 September 2023",
    //         views: 902,
    //         proposals: 15,
    //         description:
    //             `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    //                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    //                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    //                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

    //                 Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
    //                 eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
    //                 Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos 
    //                 qui ratione voluptatem sequi nesciunt.Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
    //                 adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
    //                 Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? 
    //                 Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem 
    //                 eum fugiat quo voluptas nulla pariatur?

    //                 At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos 
    //                 dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia 
    //                 animi, id est laborum et dolorum fuga.Et harum quidem rerum facilis est et expedita distinctio.Nam libero tempore, cum soluta nobis 
    //                 est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. 
    //                 Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae 
    //                 non recusandae.Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis 
    //                 doloribus asperiores repellat.`
    //     },
    // ];

    const [data, setData] = useState();
    const { id } = useParams();
    const [tableLoader, setTableLoader] = useState(false);

    const fetchData = async () => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`/api/blog/view/${id}`);
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

    const parser = new DOMParser();

    useEffect(() => {
        fetchData();
        fetchComments(1)
    }, []);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const fetchComments = async (page) => {
        try {
            const response = await axiosInstance.get(`/api/blog_comments?blog_id=${id}&page=${page}`);
            if (response) {
                setComments(response?.data);
            }
        } catch (error) {
            handleError(error);
        }
    };
    const [loader, setLoader] = useState(false);
    const handleAddComment = async () => {
        setLoader(true)
        try {
            const response = await axiosInstance.post(`/api/blog_comments/store`, {
                content: newComment,
                blog_id: id,
            });
            if (response) {
                setNewComment("");
                fetchComments(1);
                toast.success("Blog comment saved")
            }
        } catch (error) {
            handleError(error);
        }
        finally {
            setLoader(false)
        }
    };


    return (
        <div
            className='bg-white min-h-screen pb-2'
        >
            <div className='font-medium text-4xl sm:text-4xl md:text-5xl text-center bg-[#FFF5F3] p-12'>
                <h1 className="text-[#ff0000]">Blog Details</h1>
            </div>
            <div className="max-w-4xl m-auto p-4">
                {tableLoader ? <BlogDetailsSkeleton /> : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
                        {data?.map((item) => (
                            <div key={item?.id} className="border rounded p-6 flex flex-col col-span-full">
                                {/* Image Section */}
                                <div className="flex justify-center mb-4">
                                    <img
                                        src={app_vars?.domain?.fileURL + "/" + item?.thumbnail}
                                        alt={item?.title}
                                        className="rounded-lg border-2 border-white w-full h-full object-cover"
                                    />
                                </div>

                                {/* Title Section */}
                                <div className="text-center sm:text-left mb-4">
                                    <h1 className="font-semibold text-xl md:text-2xl">{item.title}</h1>
                                </div>

                                {/* Details Section */}
                                <div className="flex flex-wrap mt-3 gap-4">
                                    <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                        <CalendarDateRangeIcon className="w-5 h-5" />
                                        {new Date(item?.published_at).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                        })}
                                    </p>
                                    <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                        <EyeIcon className="w-5 h-5" />
                                        15 Views
                                    </p>
                                    <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                        <PencilSquareIcon className="w-5 h-5" />
                                        {item?.proposals} Proposals
                                    </p>
                                </div>

                                {/* Description Section */}
                                <div className="border-t border-gray-300 mt-4 pt-4">
                                    <label htmlFor="description" className="block font-semibold mb-2">
                                        Content
                                    </label>
                                    <ReactQuill
                                        id="content"
                                        theme="bubble"
                                        value={item?.content}
                                        readOnly={true}
                                    />

                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Comments</h2>
                    <div className="space-y-2">
                        {comments && comments?.data?.map((comment, index) => (
                            <>
                                <div className="mt-2 border rounded p-4">
                                    <div className=" flex gap-6 items-start">
                                        <img
                                            src={userLogo}
                                            alt="User Profile"
                                            className="h-20 w-20 rounded-full border-2 border-white"
                                        />
                                        <div className="text-center sm:text-left mt-2 space-y-1">
                                            <div className="font-semibold">{comment?.user_id?.name}</div>
                                            <div className="text-gray-700 text-sm">{new Date(comment?.created_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                            })}</div>
                                            <h1 className="text-gray-700">{comment?.content}</h1>

                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>

                    {/* Add Comment Form */}
                    {(localStorage.token) && (
                        < div className="mt-6" >
                            <textarea
                                className="block py-4 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                rows="4"
                                placeholder="Write your comment here..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            ></textarea>
                            <div className="flex justify-center mt-3">
                                {loader ? (
                                    <InfinitySpin height={120} width={120} color="green" />
                                ) : (
                                    <button
                                        className={`px-6 py-2 font-semibold rounded-lg bg-[#ff0000] hover:bg-red-600 ${newComment === ""
                                            ? " cursor-not-allowed text-white"
                                            : " text-white"
                                            }`}
                                        onClick={handleAddComment}
                                        disabled={newComment === ""}
                                        title={newComment === "" ? "Please write a comment before submitting." : ""}
                                    >
                                        Submit Comment
                                    </button>
                                )}

                            </div>
                        </div>
                    )}

                </div>
            </div>



        </div >
    );
}

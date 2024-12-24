import { CalendarDateRangeIcon, EyeIcon, MapIcon, MapPinIcon, PencilSquareIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import Pagination from "../../Components/Pagination";
import { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../axiosInstance";
import { useParams } from "react-router-dom";
import app_vars from "../../config";
import ReactQuill from "react-quill";
import { BlogDetailsSkeleton } from "../../Components/BlogDetailsSkeleton";

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
    }, []);


    return (
        <div
            className='bg-white min-h-screen pb-2'
        >
            <div className='font-medium text-4xl sm:text-4xl md:text-5xl text-center bg-[#FFF5F3] p-20'>
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
            </div>
            {/* <div className="max-w-4xl m-auto mt-10 border rounded p-4">
                <div className="font-semibold">About Author</div>
                <div className=" flex gap-6 items-center">
                    <img
                        src="https://kofejob.dreamstechnologies.com/html/template/assets/img/img-02.jpg"
                        alt="User Profile"
                        className="h-20 w-20 rounded-full border-2 border-white"
                    />
                    <div className="text-center sm:text-left mt-2 space-y-1">
                        <div className="font-semibold">Web Designer</div>
                        <h1 className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</h1>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <button className="flex items-center justify-center w-10 h-10 font-semibold hover:bg-[#ff0000] hover:text-white transition-all hover:rounded-full">
                                <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 font-semibold hover:bg-[#ff0000] hover:text-white transition-all hover:rounded-full">
                                <i className="fa-brands fa-twitter" aria-hidden="true"></i>
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 font-semibold hover:bg-[#ff0000] hover:text-white transition-all hover:rounded-full">
                                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 font-semibold hover:bg-[#ff0000] hover:text-white transition-all hover:rounded-full">
                                <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

        </div>
    );
}

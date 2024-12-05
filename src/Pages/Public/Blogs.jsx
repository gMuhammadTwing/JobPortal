import { CalendarDateRangeIcon, EyeIcon, MapIcon, MapPinIcon, PencilSquareIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import Pagination from "../../Components/Pagination";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Blogs() {
    // useEffect(() => {
    //     // Check if the page has already been reloaded
    //     if (!sessionStorage.getItem('reloaded')) {
    //       sessionStorage.setItem('reloaded', 'true'); // Set the flag in sessionStorage
    //       window.location.reload(); // Reload the page
    //     }
    //   }, []);
    const data = [
        {
            id: 1,
            image: "https://kofejob.dreamstechnologies.com/html/template/assets/img/blog/aboutus.jpg",
            title: "Build a Coaching Website Product Store Images",
            location: "Los Angeles",
            date: "22 September 2023",
            views: 902,
            proposals: 15,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            id: 2,
            image: "https://kofejob.dreamstechnologies.com/html/template/assets/img/blog/aboutus1.jpg",
            title: "Another Coaching Product Example",
            location: "New York",
            date: "10 October 2023",
            views: 456,
            proposals: 8,
            description:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        },
        {
            id: 1,
            image: "https://kofejob.dreamstechnologies.com/html/template/assets/img/blog/aboutus.jpg",
            title: "Build a Coaching Website Product Store Images",
            location: "Los Angeles",
            date: "22 September 2023",
            views: 902,
            proposals: 15,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            id: 2,
            image: "https://kofejob.dreamstechnologies.com/html/template/assets/img/blog/aboutus1.jpg",
            title: "Another Coaching Product Example",
            location: "New York",
            date: "10 October 2023",
            views: 456,
            proposals: 8,
            description:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        },
        // Add more objects as needed
    ];


    return (
        <div
            className='bg-white min-h-screen'
        >
            <div className='font-medium text-4xl sm:text-4xl md:text-5xl text-center bg-[#FFF5F3] p-20'>
                <h1>Blogs</h1>
            </div>
            <div className="container m-auto p-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
                    {data.map((item) => (
                        <div key={item.id} className="border shadow p-6 flex flex-col">
                            {/* Image Section */}
                            <div className="flex justify-center mb-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="rounded-lg border-2 border-white w-full h-auto max-h-60 object-cover"
                                />
                            </div>

                            {/* Title Section */}
                            <div className="text-center sm:text-left mb-4">
                                <h1 className="font-semibold text-xl md:text-2xl">{item.title}</h1>
                            </div>

                            {/* Details Section */}
                            <div className="flex flex-wrap mt-3 gap-4">
                                <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                    <MapPinIcon className="w-5 h-5" />
                                    {item.location}
                                </p>
                                <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                    <CalendarDateRangeIcon className="w-5 h-5" />
                                    {item.date}
                                </p>
                                <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                    <EyeIcon className="w-5 h-5" />
                                    {item.views} Views
                                </p>
                                <p className="flex text-sm md:text-md text-gray-600 items-center gap-x-2">
                                    <PencilSquareIcon className="w-5 h-5" />
                                    {item.proposals} Proposals
                                </p>
                            </div>

                            {/* Description Section */}
                            <div className="border-t border-gray-300 mt-4 pt-4">
                                <label htmlFor="description" className="block font-semibold mb-2">
                                    Description
                                </label>
                                <div className="text-sm text-gray-600">{item.description}</div>
                                <div className="mt-2 text-sm text-red-600 underline cursor-pointer">
                                    <Link
                                        to={`/blog-details/${item?.id}`}
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination />
            </div>

        </div>
    );
}

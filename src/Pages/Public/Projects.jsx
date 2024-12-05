// import { StarIcon } from "@heroicons/react/20/solid";
// import { AcademicCapIcon, ArrowDownOnSquareIcon, Bars2Icon, ClockIcon, CreditCardIcon, CurrencyDollarIcon, MapIcon, MapPinIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
// import { motion } from "framer-motion";
// import Reviews from "./Reviews";

// export default function Projects() {
//     const features = [
//         {
//             name: 'Browse Portfolios',
//             title: 'Find professionals you can trust by browsing their samples of previous work .',
//             icon: AcademicCapIcon,
//         },
//         {
//             name: 'Fast Bids',
//             title: 'Receive obligation free quotes from our talented freelancers fast. 80% of projects get bid',
//             icon: CreditCardIcon,
//         },
//         {
//             name: 'Quality Work',
//             title: 'Kofejob.com has by far the largest pool of quality freelancers globally- over 50 million to choose from.',
//             icon: Bars2Icon,
//         },
//         {
//             name: 'Track Progress',
//             title: 'Keep up-to-date and on-the-go with our time tracker Always know what freelancers are up to.',
//             icon: ClockIcon,
//         },
//     ];

//     const posts = [
//         {
//             id: 1,
//             title: 'Boost your conversion rate',
//             href: '#',
//             description:
//                 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//             date: 'Mar 16, 2020',
//             datetime: '2020-03-16',
//             category: { title: 'Sales', href: '#' },
//             author: {
//                 name: 'Michael Foster',
//                 role: 'Co-Founder / CTO',
//                 href: '#',
//                 imageUrl:
//                     'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//             },
//         },
//         {
//             id: 1,
//             title: 'Boost your conversion rate',
//             href: '#',
//             description:
//                 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//             date: 'Mar 16, 2020',
//             datetime: '2020-03-16',
//             category: { title: 'Banking', href: '#' },
//             author: {
//                 name: 'Michael Foster',
//                 role: 'Co-Founder / CTO',
//                 href: '#',
//                 imageUrl:
//                     'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//             },
//         },
//         {
//             id: 1,
//             title: 'Boost your conversion rate',
//             href: '#',
//             description:
//                 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//             date: 'Mar 16, 2020',
//             datetime: '2020-03-16',
//             category: { title: 'Report Writing', href: '#' },
//             author: {
//                 name: 'Michael Foster',
//                 role: 'Co-Founder / CTO',
//                 href: '#',
//                 imageUrl:
//                     'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//             },
//         }
//     ]


//     return (
//         <div
//             className='bg-white h-screen'
//         >
//             <div className='font-medium text-4xl sm:text-4xl md:text-5xl text-center bg-[#FFF5F3] p-20'>
//                 <h1>Projects</h1>
//             </div>
//             <div>

//             </div>

//         </div>
//     );
// }


import React, { useState } from "react";
export default function Projects() {
    const [selectedFilters, setSelectedFilters] = useState({});
    const posts = [
        {
            "id": 1,
            "title": "Boost your conversion rate",
            "href": "#",
            "description": "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
            "date": "Mar 16, 2020",
            "datetime": "2020-03-16",
            "category": {
                "title": "Sales",
                "href": "#"
            },
            "expectedSalary": "100K - 120K",
            "skills": [
                "HTML",
                "JavaScript",
                "React JS"
            ],
            "experienceRequired": "3+ Years",
            "location": "Islamabad"
        },
        {
            "id": 2,
            "title": "Frontend Developer - React",
            "href": "#",
            "description": "We are looking for a talented Frontend Developer to join our team and work with cutting-edge technologies to build modern web applications.",
            "date": "Mar 20, 2020",
            "datetime": "2020-03-20",
            "category": {
                "title": "Software Development",
                "href": "#"
            },
            "expectedSalary": "80K - 100K",
            "skills": [
                "React JS",
                "HTML",
                "CSS3"
            ],
            "experienceRequired": "2+ Years",
            "location": "Lahore"
        },
        {
            "id": 3,
            "title": "Senior Frontend Developer - React JS",
            "href": "#",
            "description": "We are looking for a senior developer with extensive experience in React JS to lead our frontend development team and build scalable web applications.",
            "date": "Mar 22, 2020",
            "datetime": "2020-03-22",
            "category": {
                "title": "Engineering",
                "href": "#"
            },
            "expectedSalary": "120K - 150K",
            "skills": [
                "React JS",
                "Redux",
                "JavaScript",
                "CSS3"
            ],
            "experienceRequired": "5+ Years",
            "location": "Karachi"
        },
    ]
    const filters = [
        {
            title: "Title",
            options: [
                { label: "Frontend Developer", count: 2 },
                { label: "Frontend Software Engineer", count: 1 },
                { label: "Frontend UI / UX Developer", count: 1 },
                { label: "Frontend Web Developer", count: 1 },
                { label: "Senior Frontend Developer", count: 1 },
                { label: "Senior Software Engineer", count: 1 },
                { label: "Senior Next.js", count: 1 },
                { label: "Senior React.JS", count: 1 },
            ],
        },
        {
            title: "City",
            options: [
                { label: "Islamabad", count: 7 },
                { label: "Lahore", count: 6 },
                { label: "Rawalpindi", count: 6 },
                { label: "Faisalabad", count: 4 },
                { label: "Gujranwala", count: 3 },
                { label: "Gujrat", count: 3 },
                { label: "Karachi", count: 2 },
                { label: "Akhora Khattak", count: 1 },
                { label: "Ali Chak", count: 1 },
                { label: "Allahabad", count: 1 },
            ],
        },
        {
            title: "Type",
            options: [{ label: "Full Time/Permanent", count: 9 }],
        },
    ];
    const handleFilterChange = (category, option) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [option]: !prev[category]?.[option],
            },
        }));
    };
    return (
        <div className="bg-white">
            <div className='font-medium text-4xl sm:text-4xl md:text-5xl text-center bg-[#FFF5F3] p-20'>
                <h1>Projects</h1>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 p-1">
                {/* <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Jobs</h2>
                <p className="mt-2 text-lg text-gray-600">Find your dream job among these opportunities.</p> */}
                {/* Main Grid Layout */}
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Section */}
                    <aside className="lg:col-span-1 border p-6 rounded-lg shadow h-[30rem]">
                        {filters.map((filter, index) => (
                            <div key={index} className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">{filter.title}</h3>
                                <select
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    onChange={(e) => handleFilterChange(filter.title, e.target.value)}
                                >
                                    <option value="" disabled selected>
                                        Select {filter.title}
                                    </option>
                                    {filter.options.map((option, i) => (
                                        <option key={i} value={option.label}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}

                    </aside>
                    {/* Job Advertisements Section */}
                    <section className="lg:col-span-3">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-1">
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="flex flex-col items-start justify-between border rounded-lg p-4 shadow bg-white"
                                >
                                    <div className="flex items-center gap-x-4 text-xs">
                                        <time dateTime={post.datetime} className="text-gray-500">
                                            {post.date}
                                        </time>
                                        <a
                                            href={post.category.href}
                                            className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                        >
                                            {post.category.title}
                                        </a>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between w-full">
                                        <span className="text-2xl font-semibold truncate">
                                            {post.title}
                                        </span>
                                        <button className="ml-auto bg-orange-100 text-orange-600 p-2 px-5 rounded-lg hover:bg-orange-600 hover:text-white transition duration-200 ease-in-out">
                                            View Details
                                        </button>
                                    </div>


                                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
                                        <div className="text-sm text-gray-600">
                                            <span>Experience</span>
                                            <div className="text-black font-semibold text-[1.1rem]">
                                                {post.experienceRequired}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <span>Salary</span>
                                            <div className="text-black font-semibold text-[1.1rem]">
                                                {post.expectedSalary}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <span>Location</span>
                                            <div className="text-black font-semibold text-[1.1rem]">
                                                {post.location}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <span>Expiry</span>
                                            <div className="text-black font-semibold text-[1.1rem]">
                                                4 Days left
                                            </div>
                                        </div>
                                    </div>

                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
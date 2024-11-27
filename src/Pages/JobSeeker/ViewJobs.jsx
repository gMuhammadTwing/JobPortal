import { ArrowDownCircleIcon, ViewColumnsIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Button } from "../../Components/Button";

export default function ViewJobs() {
    const [selectedFilters, setSelectedFilters] = useState({});

    const posts = [
        {
            "id": 1,
            "title": "Website Designer Required For Directory Theme",
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
        {
            "id": 4,
            "title": "Full Stack Developer",
            "href": "#",
            "description": "We are seeking a full stack developer with strong knowledge of both frontend and backend technologies to work on our enterprise applications.",
            "date": "Mar 25, 2020",
            "datetime": "2020-03-25",
            "category": {
                "title": "Software Development",
                "href": "#"
            },
            "expectedSalary": "100K - 130K",
            "skills": [
                "Node.js",
                "React JS",
                "Express",
                "MongoDB"
            ],
            "experienceRequired": "3+ Years",
            "location": "Rawalpindi"
        },
        {
            "id": 5,
            "title": "UI/UX Designer",
            "href": "#",
            "description": "Looking for a creative and detail-oriented UI/UX designer who can design user-centric and aesthetically pleasing interfaces for our applications.",
            "date": "Mar 28, 2020",
            "datetime": "2020-03-28",
            "category": {
                "title": "Design",
                "href": "#"
            },
            "expectedSalary": "70K - 90K",
            "skills": [
                "Figma",
                "Adobe XD",
                "Sketch"
            ],
            "experienceRequired": "2+ Years",
            "location": "Faisalabad"
        },
        {
            "id": 5,
            "title": "UI/UX Designer",
            "href": "#",
            "description": "Looking for a creative and detail-oriented UI/UX designer who can design user-centric and aesthetically pleasing interfaces for our applications.",
            "date": "Mar 28, 2020",
            "datetime": "2020-03-28",
            "category": {
                "title": "Design",
                "href": "#"
            },
            "expectedSalary": "70K - 90K",
            "skills": [
                "Figma",
                "Adobe XD",
                "Sketch"
            ],
            "experienceRequired": "2+ Years",
            "location": "Faisalabad"
        },
        {
            "id": 5,
            "title": "UI/UX Designer",
            "href": "#",
            "description": "Looking for a creative and detail-oriented UI/UX designer who can design user-centric and aesthetically pleasing interfaces for our applications.",
            "date": "Mar 28, 2020",
            "datetime": "2020-03-28",
            "category": {
                "title": "Design",
                "href": "#"
            },
            "expectedSalary": "70K - 90K",
            "skills": [
                "Figma",
                "Adobe XD",
                "Sketch"
            ],
            "experienceRequired": "2+ Years",
            "location": "Faisalabad"
        },
        {
            "id": 5,
            "title": "UI/UX Designer",
            "href": "#",
            "description": "Looking for a creative and detail-oriented UI/UX designer who can design user-centric and aesthetically pleasing interfaces for our applications.",
            "date": "Mar 28, 2020",
            "datetime": "2020-03-28",
            "category": {
                "title": "Design",
                "href": "#"
            },
            "expectedSalary": "70K - 90K",
            "skills": [
                "Figma",
                "Adobe XD",
                "Sketch"
            ],
            "experienceRequired": "2+ Years",
            "location": "Faisalabad"
        }
    ]


    const filters = [
        {
            title: "Job Title",
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
            title: "Experience",
            options: [
                { label: "1 Year", count: 2 },
                { label: "2 Years", count: 1 },
                { label: "3 Years", count: 2 },
                { label: "4 Years", count: 1 },
                { label: "5 Years", count: 3 },
            ],
        },
        {
            title: "Job Type",
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
        <div className="container mx-auto max-w-5xl pb-15">
            <div className="px-6 lg:px-8 ">
                <h2 className="text-4xl font-semibold tracking-tight text-orange-500 sm:text-5xl">Jobs</h2>
                <p className="mt-2 text-lg text-gray-600">Find your dream job among these opportunities.</p>
                <div className="mt-4 p-2 border relative border-gray-200 rounded-md  bg-white mb-2  ">
                    {/* <label className="block text-lg font-semibold text-gray-900 text-center mb-4">
                        Apply Filters
                    </label> */}
                    <div>
                        <div className="py-2 px-1 grid grid-cols-1 gap-x-6 sm:grid-cols-5">
                            {filters.map((filter, index) => (
                                <div key={index} className="mb-6">
                                    <label className="block text-lg font-semibold text-gray-900">
                                        {filter.title}
                                    </label>
                                    <select
                                        className="mt-2 w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={(e) => handleFilterChange(filter.title, e.target.value)}
                                        value={
                                            selectedFilters[filter.title]
                                                ? Object.keys(selectedFilters[filter.title])[0]
                                                : ""
                                        }
                                    >
                                        <option value="">Select {filter.title}</option>
                                        {filter.options.map((option, i) => (
                                            <option key={i} value={option.label}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                            <div className="sm:col-span-1 mt-9">
                                <Button
                                    type="button"
                                    variant="outline"
                                    color="slate"
                                    // onClick={clearFilterExpenseQuarryWise}
                                    className="flex items-center"
                                >
                                    <XCircleIcon
                                        className="-ml-0.5 h-5 w-5 mr-1"
                                        aria-hidden="true"
                                    />
                                    Clear Filter
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="lg:col-span-4 ">
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
                                <div className="">
                                    <div className="mt-3 flex justify-between">
                                        <span className="text-2xl font-semibold">
                                            {post.title}
                                        </span>
                                        <button className="bg-orange-50 text-orange-600 p-2 px-5 rounded-lg hover:bg-orange-600 hover:text-white transition duration-200 ease-in-out">
                                            View Details
                                        </button>
                                    </div>
                                    <p className="mt-2 line-clamp-3 text-sm text-gray-600">{post.description}</p>
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
    );
}

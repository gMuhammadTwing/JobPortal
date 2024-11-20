import { ArrowDownCircleIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export default function ViewJobs() {
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
        <div className=" py-10 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
                <h2 className="text-4xl font-semibold tracking-tight text-orange-500 sm:text-5xl">Jobs</h2>
                <p className="mt-2 text-lg text-gray-600">Find your dream job among these opportunities.</p>

                {/* Main Grid Layout */}
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Section */}
                    <aside className="lg:col-span-1 bg-white p-6 rounded-lg shadow max-h-[120vh]">
                        {filters.map((filter, index) => (
                            <div key={index} className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">{filter.title}</h3>
                                <ul className="mt-2 space-y-1">
                                    {filter.options.map((option, i) => (
                                        <li key={i} className="flex items-center text-sm text-gray-700">
                                            <input
                                                type="checkbox"
                                                className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                checked={!!selectedFilters[filter.title]?.[option.label]}
                                                onChange={() => handleFilterChange(filter.title, option.label)}
                                            />
                                            <span>{option.label}</span>
                                            <span className="ml-auto text-gray-500">({option.count})</span>
                                        </li>
                                    ))}
                                </ul>
                                {filter.options.length > 5 && (
                                    <button className="mt-2 text-indigo-600 text-sm hover:underline">Show More</button>
                                )}
                            </div>
                        ))}
                    </aside>

                    {/* Job Advertisements Section */}
                    <section className="lg:col-span-3  min-h-screen overflow-y-auto">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="flex flex-col items-start justify-between border rounded-lg p-4 shadow bg-white border-transparent hover:border-orange-500"
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
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                                            <a href={post.href}>
                                                <span className="absolute inset-0" />
                                                {post.title}
                                            </a>
                                        </h3>
                                        <p className="mt-5 line-clamp-3 text-sm text-gray-600">{post.description}</p>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="text-sm text-gray-600">
                                            <strong>Experience:</strong>
                                            <a className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                                {post.experienceRequired}
                                            </a>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <strong>Salary:</strong> {post.expectedSalary}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <strong>Location:</strong> {post.location}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <strong>Skills:</strong>
                                            {post.skills.map((skill) => (
                                                <a
                                                    key={skill}
                                                    className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-sm text-gray-500 hover:bg-gray-100"
                                                >
                                                    {skill}
                                                </a>
                                            ))}
                                        </div>
                                        <div className="mt-4 flex divide-x divide-gray-200 border-gray-300">
                                            <div className="flex w-0 flex-1">
                                                <a
                                                    href="#"
                                                    className="relative inline-flex w-full items-center justify-center gap-x-3 py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                                                >
                                                    <ArrowDownCircleIcon aria-hidden="true" className="size-5 text-gray-400" />
                                                    View
                                                </a>
                                            </div>
                                            <div className="flex w-0 flex-1">
                                                <a
                                                    href="#"
                                                    className="relative inline-flex w-full items-center justify-center gap-x-3 py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                                                >
                                                    <ViewColumnsIcon aria-hidden="true" className="size-5 text-gray-400" />
                                                    Apply
                                                </a>
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

import { StarIcon } from "@heroicons/react/20/solid";
import { ArrowDownOnSquareIcon, CurrencyDollarIcon, MapIcon, MapPinIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";

export default function FeaturedDevelopers() {
    const jobs = [
        {
            name: 'Jane Cooper',
            title: 'Regional Paradigm Technician Job',
            role: 'Technical Writer',
            hourlyRate: "443",
            location: "Florida, USA",
            email: 'janecooper@example.com',
            telephone: '+1-202-555-0170',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Jane Cooper',
            hourlyRate: "443",
            location: "Florida, USA",
            title: 'Regional Paradigm Technician Job',
            role: 'Frontend Developer',
            email: 'janecooper@example.com',
            telephone: '+1-202-555-0170',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Jane Cooper',
            title: 'Regional Paradigm Technician Job',
            role: 'Technical Writer',
            hourlyRate: "443",
            location: "Florida, USA",
            email: 'janecooper@example.com',
            telephone: '+1-202-555-0170',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Jane Cooper',
            hourlyRate: "443",
            location: "Florida, USA",
            title: 'Regional Paradigm Technician Job',
            role: 'Frontend Developer',
            email: 'janecooper@example.com',
            telephone: '+1-202-555-0170',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Jane Cooper',
            title: 'Regional Paradigm Technician Job',
            role: 'Technical Writer',
            hourlyRate: "443",
            location: "Florida, USA",
            email: 'janecooper@example.com',
            telephone: '+1-202-555-0170',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Jane Cooper',
            title: 'Regional Paradigm Technician Job',
            role: 'Frontend Developer',
            hourlyRate: "443",
            location: "Florida, USA",
            email: 'janecooper@example.com',
            telephone: '+1-202-555-0170',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Jane Cooper',
            title: 'Regional Paradigm Technician Job',
            role: 'Technical Writer',
            hourlyRate: "443",
            location: "Florida, USA",
            email: 'janecooper@example.com',
            telephone: '+1-202-555-0170',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        // More people...
    ]
    return (
        <div className=' rounded-lg p-2 sm:p-8 md:p-16 lg:p-20 bg-white'>
            <div className='px-3 font-medium text-4xl sm:text-5xl md:text-6x text-center pb-5'>
                <h1>Featured <span className='text-orange-500'>Developers</span></h1>
            </div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-5">
                {jobs.map((job, index) => (
                    <li
                        key={index}
                        className="col-span-1 divide-y divide-gray-200 rounded-lg shadow-6 bg-white border border-transparent hover:border-orange-500"
                    >
                        <div className="flex w-full items-center justify-between space-x-5 p-6">
                            <img alt="" src={job.imageUrl} className="size-17 shrink-0 rounded bg-gray-300" />
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="truncate text-sm font-medium text-gray-900">{job.name}</h3>

                                </div>
                                <div className="text-sm text-gray-500">
                                    {job.role}
                                </div>
                                <div className="mt-2 truncate text-sm text-gray-500 flex">
                                    <StarIcon className="w-5 h-5 text-orange-400" />
                                    <StarIcon className="w-5 h-5 text-orange-400" />
                                    <StarIcon className="w-5 h-5 text-orange-400" />
                                    <StarIcon className="w-5 h-5 text-orange-400" />
                                    <StarIcon className="w-5 h-5 text-orange-400" />

                                    <span className="ml-1">5.0 (30)</span>
                                </div>
                            </div>

                        </div>
                        <div className="">
                            <div className="flex p-3 justify-between text-gray-500 ">
                                <div className="flex w-0 flex-1">

                                    <CurrencyDollarIcon className="size-5 text-gray-400 mt-[3px]" />
                                    {job.hourlyRate} Hourly
                                </div>
                                <div className="flex w-0 flex-1">

                                    <MapPinIcon aria-hidden="true" className="size-5 text-gray-400 mt-[3px]" />
                                    <span>{job.location}</span>
                                </div>
                            </div>
                        </div>
                    </li>

                ))}
            </ul>
        </div>
    )
}
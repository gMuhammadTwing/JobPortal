import { ArrowDownOnSquareIcon, ArrowDownRightIcon } from "@heroicons/react/24/outline";

export default function FeaturedJobs() {
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
                'https://randomuser.me/api/portraits/women/0.jpg',
        },
        {
            name: 'John Doe',
            title: 'Senior Software Engineer',
            role: 'Frontend Developer',
            hourlyRate: "560",
            location: "California, USA",
            email: 'johndoe@example.com',
            telephone: '+1-202-555-0198',
            imageUrl:
                'https://randomuser.me/api/portraits/men/0.jpg',
        },
        {
            name: 'Sarah Smith',
            title: 'Lead UI/UX Designer',
            role: 'UX Designer',
            hourlyRate: "490",
            location: "New York, USA",
            email: 'sarahsmith@example.com',
            telephone: '+1-202-555-0135',
            imageUrl:
                'https://randomuser.me/api/portraits/women/1.jpg',
        },
        {
            name: 'Michael Johnson',
            title: 'Project Manager',
            role: 'Business Analyst',
            hourlyRate: "520",
            location: "Texas, USA",
            email: 'michaeljohnson@example.com',
            telephone: '+1-202-555-0182',
            imageUrl:
                'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
            name: 'Emily Davis',
            title: 'Data Analyst',
            role: 'Data Scientist',
            hourlyRate: "475",
            location: "Georgia, USA",
            email: 'emilydavis@example.com',
            telephone: '+1-202-555-0163',
            imageUrl:
                'https://randomuser.me/api/portraits/women/2.jpg',
        },
        {
            name: 'Alex Taylor',
            title: 'Software Developer',
            role: 'Backend Developer',
            hourlyRate: "600",
            location: "Washington, USA",
            email: 'alextaylor@example.com',
            telephone: '+1-202-555-0144',
            imageUrl:
                'https://randomuser.me/api/portraits/men/2.jpg',
        },
        {
            name: 'Chris Lee',
            title: 'Software Engineer',
            role: 'Full Stack Developer',
            hourlyRate: "650",
            location: "Illinois, USA",
            email: 'chrislee@example.com',
            telephone: '+1-202-555-0111',
            imageUrl:
                'https://randomuser.me/api/portraits/men/3.jpg',
        },
        {
            name: 'Jordan Brown',
            title: 'Mobile App Developer',
            role: 'iOS Developer',
            hourlyRate: "590",
            location: "Florida, USA",
            email: 'jordanbrown@example.com',
            telephone: '+1-202-555-0123',
            imageUrl:
                'https://randomuser.me/api/portraits/men/4.jpg',
        },
    ];
    return (
        <div className='bg-gradient-to-t to-[#F8ECF8] from-[#FFF3EA] p-2 sm:p-8 md:p-16 lg:p-20'>
            <div className=''>
                <div className='font-medium text-4xl sm:text-5xl md:text-6x text-center '>Featured Jobs <span className='text-orange-500'>For You</span></div>
                <div className='text-center mt-2 text-gray-600 font-semibold'>We have over 2000+ Projects waiting for you</div>
            </div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
                {jobs.map((person) => (
                    <li
                        key={person.email}
                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    >
                        <div className="flex flex-1 flex-col p-8">
                            <img alt="" src={person.imageUrl} className="mx-auto size-32 shrink-0 rounded-full" />
                            <h3 className="mt-6 text-sm font-medium text-gray-900">{person.name}</h3>
                            <dl className="mt-1 flex grow flex-col justify-between">
                                <dt className="sr-only">Title</dt>
                                <dd className="text-sm text-gray-500">{person.title}</dd>
                                <dt className="sr-only">Role</dt>
                                <dd className="mt-3">
                                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        {person.role}
                                    </span>
                                </dd>
                            </dl>
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="flex w-0 flex-1">
                                    <a
                                        href={`mailto:${person.email}`}
                                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <ArrowDownOnSquareIcon aria-hidden="true" className="size-5 text-gray-400" />
                                        View
                                    </a>
                                </div>
                                <div className="-ml-px flex w-0 flex-1">
                                    <a
                                        href={`tel:${person.telephone}`}
                                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <ArrowDownRightIcon aria-hidden="true" className="size-5 text-gray-400" />
                                        Apply
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
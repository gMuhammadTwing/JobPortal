import { StarIcon } from "@heroicons/react/20/solid";
import { ArrowDownOnSquareIcon, CurrencyDollarIcon, MapIcon, MapPinIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

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
        <motion.div
            className='rounded-lg p-2 sm:p-8 md:p-16 lg:p-20 bg-white'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='px-3 font-medium text-4xl sm:text-5xl md:text-6xl text-center pb-5'>
                <h1>Featured <span className='text-orange-500'>Developers</span></h1>
            </div>

            <motion.ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-5"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { staggerChildren: 0.2 },
                    },
                }}
            >
                {jobs.map((job, index) => (
                    <motion.li
                        key={index}
                        className="col-span-1 divide-y divide-gray-200 rounded-lg shadow-6 bg-white border border-transparent hover:border-orange-500"
                        whileHover={{ scale: 1.05 }} // Hover effect
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <div className="flex w-full items-center justify-between space-x-5 p-6">
                            <img alt="" src={job.imageUrl} className="size-17 shrink-0 rounded bg-gray-300" />
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="truncate text-sm font-medium text-gray-900">{job.name}</h3>
                                </div>
                                <div className="text-sm text-gray-500">{job.role}</div>
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
                        <div className="p-3">
                            <div className="flex justify-between text-gray-500">
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
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    );
}

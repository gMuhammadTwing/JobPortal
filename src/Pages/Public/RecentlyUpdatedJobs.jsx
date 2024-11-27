import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function RecentlyUpdatedJobs() {
  const jobs = [
    {
      name: "Jane Cooper",
      title: "Regional Paradigm Technician Job",
      role: "Technical Writer",
      email: "janecooper@example.com",
      telephone: "+1-202-555-0170",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      name: "Jane Cooper",
      title: "Regional Paradigm Technician Job",
      role: "Frontend Developer",
      email: "janecooper@example.com",
      telephone: "+1-202-555-0170",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
        name: "Jane Cooper",
        title: "Regional Paradigm Technician Job",
        role: "Technical Writer",
        email: "janecooper@example.com",
        telephone: "+1-202-555-0170",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      {
        name: "Jane Cooper",
        title: "Regional Paradigm Technician Job",
        role: "Frontend Developer",
        email: "janecooper@example.com",
        telephone: "+1-202-555-0170",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      {
        name: "Jane Cooper",
        title: "Regional Paradigm Technician Job",
        role: "Technical Writer",
        email: "janecooper@example.com",
        telephone: "+1-202-555-0170",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      {
        name: "Jane Cooper",
        title: "Regional Paradigm Technician Job",
        role: "Frontend Developer",
        email: "janecooper@example.com",
        telephone: "+1-202-555-0170",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
    // Add more jobs as needed...
  ];

  return (
    <motion.div
      className="mb-3 rounded-lg p-2 sm:p-8 md:p-16 lg:p-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-3 font-medium text-4xl sm:text-5xl md:text-6xl text-center pb-5">
        <h1>
          Recently Updated <span className="text-orange-600">Jobs For You</span>
        </h1>
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
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow border border-transparent hover:border-orange-500 text-gray-800 hover:text-orange-600 transform transition-all duration-300"
            whileHover={{ scale: 1.05 }} // Hover effect to scale up
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-xl font-medium">{job.role}</h3>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">400 Jobs Available</p>
              </div>
              <ArrowRightIcon className="w-4 h-4 text-gray-500" />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../axiosInstance";
import RecentlyUpdatedJobsSkeleton from "../../Components/RecentlyUpdatedJobsSkeleton";
import { Link } from "react-router-dom";
import { useDropdownContext } from "../../DropdownProvider";
import { toast } from "sonner";

export default function RecentlyUpdatedJobs() {
  const [data, setData] = useState();
  const [tableLoader, setTableLoader] = useState(false);
  const dropDownValues = useDropdownContext();

  // const fetchData = async (pageNum) => {
  //   setTableLoader(true);
  //   try {
  //     const response = await axiosInstance.get(`/api/job_list?page=${pageNum}`);
  //     if (response) {
  //       setData(response?.data);
  //       console.log("data: ", response?.data);
  //     }
  //   } catch (error) {
  //     handleError(error);
  //   } finally {
  //     setTableLoader(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData(1);
  // }, []);

  return (
    <div className="bg-white">
      <motion.div
        className="mx-auto max-w-[85rem] rounded-lg p-2 sm:p-8 md:p-16 lg:p-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className=" px-3 font-medium text-4xl sm:text-5xl md:text-6xl text-center pb-5">
          <h1>
            Job Categories
          </h1>
        </div>

        {tableLoader ? <RecentlyUpdatedJobsSkeleton /> :
          (
            <>
              <motion.ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10"
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
                {dropDownValues?.job_family.slice(0, 6).map((job, index) => (
                  <motion.li
                    key={index}
                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow border hover:border-[#ff0000] text-gray-800 hover:text-[#ff0000] transform transition-all duration-300"
                    whileHover={{ scale: 1.05 }} // Hover effect to scale up
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      to={
                        localStorage?.token
                          ? ((localStorage.payment == 'true' || localStorage.role_id == 1) ? `/jobs_type/${job?.id}` : (localStorage.payment == 'false' ? '/home' : '/payment-alert'))
                          : '/login'
                      }
                      onClick={() => {
                        localStorage?.token
                          ? ((localStorage.payment != 'true' && localStorage.role_id != 1) && toast.info("Payment Approval Pending"))
                          : toast.info("Please login first");
                      }}
                    // to={localStorage?.token ? `/jobs_type/${job?.id}` : '/login'}
                    >
                      <div className="flex w-full items-center justify-between p-6">
                        <div className="flex-1 truncate">
                          <div className="flex items-center space-x-3">
                            <h3 className="truncate text-sm font-medium">{job?.job_family}</h3>
                          </div>
                          <p className="mt-1 truncate text-sm text-gray-500">{job?.job_family}</p>
                        </div>
                        <ArrowRightIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-10 flex justify-center cursor-pointer">
                {localStorage?.token ?
                  (localStorage.payment == 'true' || localStorage.role_id == 1) ?
                    <Link
                      to={"/jobs"}
                    >
                      <span className="bg-red-50 text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                        View all Jobs</span>
                    </Link> :
                    (
                      localStorage.payment == 'false' ?
                        <Link
                          to={"/home"}
                          onClick={() => toast.info("Payment Approval Pending")}
                        >
                          <span className="bg-red-50 text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                            View all Jobs</span>
                        </Link>
                        :
                        <Link
                          to={"/payment-alert"}
                          onClick={() => toast.info("Payment Approval Pending")}
                        >
                          <span className="bg-red-50 text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                            View all Jobs</span>
                        </Link>
                    )
                  :
                  <Link
                    to={"/login"}
                    onClick={() => toast.info("Please login first")}
                  >
                    <span className="bg-red-50 text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                      View all Jobs</span>
                  </Link>}
              </div>
            </>
          )}
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";

export default function RecentlyUpdatedJobsSkeleton() {
  return (
    <motion.div
      className="mx-auto max-w-[85rem] rounded-lg p-2 sm:p-8 md:p-16 lg:p-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      <motion.ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
        {[...Array(3)].map((_, index) => (
          <motion.li
            key={index}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-gray-100 shadow border border-transparent animate-pulse"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-300 h-6 w-40 rounded">&nbsp;</div>
                </div>
                <div className="mt-1 bg-gray-300 h-4 w-24 rounded">&nbsp;</div>
              </div>
              <div className="bg-gray-300 w-6 h-6 rounded-full">&nbsp;</div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

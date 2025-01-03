export default function RecentlyUpdatedJobsSkeleton() {
  return (
    <div className="mx-auto max-w-[85rem] rounded-lg p-4 sm:p-8 md:p-16 lg:p-20">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <li
            key={index}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-gray-100 shadow-md border border-gray-300 animate-pulse"
          >
            <div className="flex w-full items-center justify-between p-6">
              <div className="flex-1 space-y-4">
                <div className="h-6 w-40 bg-gray-300 rounded-md"></div>
                <div className="h-4 w-24 bg-gray-300 rounded-md"></div>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


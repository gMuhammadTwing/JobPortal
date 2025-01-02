import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export default function Pagination({ page, total = 0, page_size = 10 }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = total > 0 ? Math.ceil(total / page_size) : 1;

    // Handle page click
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        page(pageNumber);
    };

    // Handle Next button click
    const handleNextClick = () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            page(nextPage);
        }
    };

    // Handle Previous button click
    const handlePreviousClick = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            page(prevPage);
        }
    };

    // Calculate the range of items being shown (avoid NaN by handling total = 0 case)
    const startItem = total > 0 ? (currentPage - 1) * page_size + 1 : 0;
    const endItem = total > 0 ? Math.min(currentPage * page_size, total) : 0;

    // Render the pagination numbers
    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            // Show all pages if less than 5
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageClick(i)}
                        aria-current={i === currentPage ? 'page' : null}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${i === currentPage
                                ? 'z-10 bg-[#ff0000] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0000]'
                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                            }`}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            // More complex pagination when total pages > 5
            const firstPages = [1, 2, 3];
            const lastPages = [totalPages - 1, totalPages];

            firstPages.forEach((i) => {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageClick(i)}
                        aria-current={i === currentPage ? 'page' : null}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${i === currentPage
                                ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                            }`}
                    >
                        {i}
                    </button>
                );
            });

            if (currentPage > 3 && currentPage <= totalPages - 2) {
                pages.push(
                    <span
                        key="ellipsis-start"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                    >
                        ...
                    </span>
                );
                pages.push(
                    <button
                        key={currentPage}
                        onClick={() => handlePageClick(currentPage)}
                        aria-current="page"
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500`}
                    >
                        {currentPage}
                    </button>
                );
            }

            pages.push(
                <span
                    key="ellipsis-end"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                >
                    ...
                </span>
            );

            lastPages.forEach((i) => {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageClick(i)}
                        aria-current={i === currentPage ? 'page' : null}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${i === currentPage
                                ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                            }`}
                    >
                        {i}
                    </button>
                );
            });
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-between py-1">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={handlePreviousClick}
                    className="relative inline-flex items-center rounded-md border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={handleNextClick}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{startItem}</span> to{' '}
                        <span className="font-medium">{endItem}</span> of{' '}
                        <span className="font-medium">{total}</span> results
                    </p>
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm bg-white">
                        <button
                            onClick={handlePreviousClick}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            disabled={currentPage === 1}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                        {renderPageNumbers()}
                        <button
                            onClick={handleNextClick}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            disabled={currentPage === totalPages}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}

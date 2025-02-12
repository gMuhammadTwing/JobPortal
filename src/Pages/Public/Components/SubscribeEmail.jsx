export default function SubscribeEmail() {
    return (
        <div className="bg-[#ff0000]">
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-6 max-w-[85rem] mx-auto px-6 py-10 md:py-20">
                {/* Left Section */}
                <div className="flex-1 space-y-3 text-center md:text-left">
                    <div className="text-white text-3xl md:text-5xl font-bold">
                        <div>Find your next</div>
                        <div>great opportunity!</div>
                    </div>
                    <div className="text-white text-lg md:text-2xl font-semibold pt-2">
                        Join our Veritas Job Portal and receive the best job openings every week in your inbox.
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-1">
                    <div className="truncate rounded-md bg-white">
                        <div className="flex flex-col md:flex-row px-4 py-3 items-center space-y-4 md:space-y-0">
                            <input
                                id="subscribe"
                                name="subscribe"
                                type="text"
                                placeholder="Enter your email"
                                className="block w-full border-0 text-gray-900 placeholder:text-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                            />
                            <button className="px-6 py-2 bg-[#ff0000] text-white text-md font-medium rounded-md hover:bg-black transition duration-200 ease-in-out md:ml-4">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SubscribeEmail() {
    return (
        <div className="bg-[#ff0000]">
            <div className="flex items-center space-x-6 max-w-[85rem] mx-auto p-20">
                {/* Left Section */}
                <div className="flex-1 space-y-3">
                    <div className="text-white text-5xl font-bold">
                        <div>Find your next</div>
                        <div>great opportunity!</div>
                    </div>
                    <div className="text-white text-2xl font-semibold pt-2">
                        Join our Veritas Job Portal and receive the best job openings every week on your inbox.
                    </div>

                </div>

                {/* Right Section */}
                <div className="flex-1">
                    <div className="truncate rounded-md bg-white">
                        <div className="flex px-4 py-3">
                            <input
                                id="subscribe"
                                name="subscribe"
                                type="text"
                                placeholder="Enter your email"
                                className="block w-full border-0 text-gray-900 placeholder:text-gray-500"
                            />
                            <div className="px-15 py-2 bg-[#ff0000] text-center justify-center flex w-20 shrink-0  rounded-md text-md font-medium text-white">
                                Subscribe
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
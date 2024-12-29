export default function VisionMission() {
    return (
        <div className='text-center bg-[#FFF5F3] p-20 border-b'>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 mx-auto max-w-[75rem]">
                <li
                    className="col-span-1 flex flex-col items-center justify-center bg-white divide-y divide-gray-200 border rounded-lg text-center shadow transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                >
                    <div className="flex flex-1 flex-col items-center justify-center p-8">
                        <h3 className="text-2xl font-medium text-[#ff0000]">Our Vision</h3>
                        <dl className="mt-4 flex flex-col items-center text-center">
                            <dd className="text-md text-gray-900">
                                VeritasKWD is the ultimate Unemployment Solution—Moving Kenya to Full Employment rate and onwards to a Workforce Superpower.
                            </dd>
                        </dl>
                    </div>
                </li>
                <li
                    className="col-span-1 flex flex-col items-center justify-center bg-white divide-y divide-gray-200 border rounded-lg text-center shadow transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                >
                    <div className="flex flex-1 flex-col items-center justify-center p-8">
                        <h3 className="text-2xl font-medium text-[#ff0000]">Our Mission</h3>
                        <dl className="mt-4 flex flex-col items-center text-center">
                            <dd className="text-md text-gray-900">
                                To connect all job seekers in Kenya with local, national, and global employers. Veritas Kenya Workforce Database is driven by the
                                maxim that “opportunities are deliberately created.” Opportunities are not created in isolation and Veritas Kenya Workforce will
                                partner with the national government, County governments, private organizations, and private investors to create opportunities for
                                all Kenyans.
                            </dd>
                        </dl>
                    </div>
                </li>

            </ul>
        </div>
    )
}
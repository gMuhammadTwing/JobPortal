import { Link } from "react-router-dom";

export default function FooterHeader() {
    return (
        <div className="bg-[#ff0000]">
            <div className="flex items-center space-x-6 max-w-[77rem] mx-auto">
                {/* Left Section */}
                <div className="flex-1 space-y-2">
                    <div className="text-white text-2xl font-bold">
                        Find Your Next Great Job Opportunity!
                    </div>
                    <div className="text-white text-sm">
                        Quisque pretium dolor turpis, quis blandit turpis semper ut. Nam malesuada eros nec luctus laoreet.
                    </div>
                    <div className="pt-5">
                        <span
                            className="bg-red-50 text-[#ff0000] px-6 py-3 rounded-md hover:bg-black hover:text-white transition duration-200 ease-in-out"
                        >
                            <Link to={`/create-account`}> Join Now </Link>
                        </span>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-1">
                    <img
                        src="https://kofejob.dreamstechnologies.com/html/template/assets/img/job1.png" // Replace with your image URL
                        alt="Job Opportunity"
                        className=""
                    />
                </div>
            </div>
        </div>
    )
}
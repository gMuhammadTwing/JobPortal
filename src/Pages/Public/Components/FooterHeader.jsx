import { Link } from "react-router-dom";

export default function FooterHeader() {
    return (
        <div className="bg-[#ff0000]">
            <div className="flex flex-col md:flex-row items-center md:space-y-0 md:space-x-6 max-w-[77rem] mx-auto px-4">
                {/* Left Section */}
                <div className="flex-1 space-y-2 text-center md:text-left p-4 md:p-0">
                    <div className="text-white text-xl md:text-2xl font-bold">
                        Discover Your Perfect Match at Veritas Jobs
                    </div>
                    <div className="text-white text-sm">
                        Employers, find your next top talent; job seekers, unlock your career potential. Log in to Veritas Jobs now to discover opportunities that match your needs.
                    </div>
                    <div className="pt-5">
                        <Link
                            to={`/create-account`}
                            className="bg-red-50 text-[#ff0000] px-6 py-3 rounded-md hover:bg-black hover:text-white transition duration-200 ease-in-out inline-block"
                        >
                            Join Now
                        </Link>
                    </div>
                </div>


                {/* Right Section */}
                <div className="flex-1">
                    <img
                        src="https://kofejob.dreamstechnologies.com/html/template/assets/img/job1.png" // Replace with your image URL
                        alt="Job Opportunity"
                        className="w-[30rem] max-w-sm mx-auto md:max-w-none"
                    />
                </div>
            </div>
        </div>
    );
}

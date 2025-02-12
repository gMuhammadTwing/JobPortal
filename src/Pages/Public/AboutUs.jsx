import { Link } from "react-router-dom";
import FooterHeader from "./Components/FooterHeader";
import OurMission from "./OurMission";
import OurValues from "./OurValues";
import OurVision from "./OurVision";
import { toast } from "sonner";

export default function AboutUs() {
    return (
        <div
            className='bg-white'
        >
            <div className=' text-center bg-[#FFF5F3] p-12'>
                <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">About Us</h1>
                <p>We are dedicated to bridging the gap between talent and opportunity</p>
                <div className="mt-5 flex justify-center cursor-pointer">
                    {localStorage?.token ? (
                        (localStorage.payment == 'true' || localStorage.role_id == 1 || localStorage.role_id == 3) ?
                            <Link
                                to={"/jobs"}
                            >
                                <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                    Browse Jobs</span>
                            </Link> :
                            (
                                localStorage.payment == 'false' ?
                                    <Link
                                        onClick={() => toast.info("Payment Approval Pending")}
                                        to={"/home"}
                                    >
                                        <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                            Browse Jobs</span>
                                    </Link>
                                    :
                                    <Link
                                        onClick={() => toast.info("Payment Approval Pending")}
                                        to={"/payment-alert"}
                                    >
                                        <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                            Browse Jobs</span>
                                    </Link>
                            )
                    ) : (
                        <Link
                            onClick={() => toast.info("Please login first")}
                            to={"/login"}
                        >
                            <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                Browse Jobs</span>
                        </Link>
                    )}
                </div>
            </div>

            <div className="text-center p-10 mt-10 space-y-4 max-w-7xl mx-auto">
                <div className="font-medium text-4xl sm:text-4xl md:text-5xl">
                    About We’re on a mission to empowering Jobs worldwide.
                </div>
                <div className="text-justify">
                    Veritas Kenya Workforce Database (VeritasKWD/Veritas Jobs) is a hiring and an opportunity marketplace. Veritas Jobs is one of its kind, subscription-based job search and candidate search employment service that seamlessly connects available Kenyan talent to available opportunities locally and internationally. Our subscription only hiring platform enhances the job seeker’s credibility by hosting only authentic credentials in the resume database. We are committed to improving the job seeker’s experience by connecting job seekers with employers, offering unmatched convenience via new job notifications, giving maximum exposure to job seekers’ profiles, and providing accurate information.  VeritasKWD is the only hiring platform in the world to adopt competency-based hiring where a candidate's coursework is given prominence. A job seeker's actual potential and value can be discerned from the field of study (program), coursework and grades scored.
                </div>
            </div>
            {/* <div className="text-center pb-4 max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-4">
                <img
                    src="https://kofejob.dreamstechnologies.com/html/template/assets/img/blog/aboutus.jpg"
                    alt="User Profile"
                    className="rounded-lg border-2 border-white max-w-full sm:w-40 md:w-60 lg:w-80 h-auto"
                />
                <img
                    src="https://kofejob.dreamstechnologies.com/html/template/assets/img/blog/aboutus1.jpg"
                    alt="User Profile"
                    className="rounded-lg border-2 border-white max-w-full sm:w-40 md:w-60 lg:w-80 h-auto"
                />
            </div> */}
            <div className="pb-10">
                <OurVision />
                <OurMission />
                <OurValues />
            </div>
            <FooterHeader />

        </div>
    );
}

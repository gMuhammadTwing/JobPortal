import { Link } from "react-router-dom";
import FooterHeader from "./Components/FooterHeader";
import OurMission from "./OurMission";
import OurValues from "./OurValues";
import OurVision from "./OurVision";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../axiosInstance";
import { Hourglass } from "react-loader-spinner";
import ReactHtmlParser from "html-react-parser";
export default function AboutUs() {
    const [data, setData] = useState();
    const [loader, setLoader] = useState(false)
    const [vision, setVision] = useState();
    const [mission, setMission] = useState();
    const [values, setValues] = useState();
    const fetchData = async () => {
        setLoader(true)
        try {
            const response = await axiosInstance.get(`/api/about_us`);
            if (response) {
                setData(response?.data);
                setVision(response?.data[0]?.our_vision)
                setMission(response?.data[0]?.our_mission)
                setValues(response?.data[0]?.our_values)
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoader(false)
            // setTableLoader(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div
            className='bg-white'
        >
            <div className=' text-center bg-[#FFF5F3] p-12'>
                <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">About Us</h1>
                <p>We are dedicated to bridging the gap between talent and opportunity</p>
                <div className="mt-5 flex justify-center cursor-pointer">
                    {localStorage?.token ? (
                        (localStorage.payment == 'true' || localStorage.role_id == 1 || localStorage.role_id == 5 || localStorage.role_id == 3) ?
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

            {loader ?
                <div className="flex justify-center items-center h-screen">
                    <Hourglass />
                </div>
                :
                <>
                    <div className="text-center p-10 mt-10 space-y-4 max-w-7xl mx-auto">
                        <div className="font-medium text-4xl sm:text-4xl md:text-5xl">
                            About We’re on a mission to empowering Jobs worldwide.
                        </div>
                        <div className="text-justify">
                            {
                                data && data[0]?.description ? (
                                    ReactHtmlParser(data[0]?.description)
                                ) : null
                            }
                            {/* Veritas Kenya Workforce Database (VeritasKWD/Veritas Jobs) is a hiring and an opportunity marketplace. Veritas Jobs is one of its kind, subscription-based job search and candidate search employment service that seamlessly connects available Kenyan talent to available opportunities locally and internationally. Our subscription only hiring platform enhances the job seeker’s credibility by hosting only authentic credentials in the resume database. We are committed to improving the job seeker’s experience by connecting job seekers with employers, offering unmatched convenience via new job notifications, giving maximum exposure to job seekers’ profiles, and providing accurate information.  VeritasKWD is the only hiring platform in the world to adopt competency-based hiring where a candidate's coursework is given prominence. A job seeker's actual potential and value can be discerned from the field of study (program), coursework and grades scored. */}
                        </div>
                    </div>
                    <div className="pb-10">
                        <OurVision data={vision} />
                        <OurMission data={mission} />
                        <OurValues data={values} />
                    </div>
                </>
            }
            <FooterHeader />

        </div>
    );
}

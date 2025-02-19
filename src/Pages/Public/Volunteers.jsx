import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/outline";
import FooterHeader from "./Components/FooterHeader";
import { Link } from "react-router-dom";
import axiosInstance, { handleError } from "../../axiosInstance";
import { useEffect, useState } from "react";
import ReactHtmlParser from "html-react-parser";
import { Hourglass } from "react-loader-spinner";
export default function Volunteers() {
    const [data, setData] = useState();
    const [loader, setLoader] = useState(false)

    const fetchData = async () => {
        setLoader(true)
        try {
            const response = await axiosInstance.get(`/api/veritas_kwd_volunteers`);
            if (response) {
                setData(response?.data);
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
    }, [])
    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">VeritasKWD Volunteers Opportunity</h1>
                    {/* <p>We are dedicated to bridging the gap between talent and opportunity</p> */}
                    <div className="mt-5 flex justify-center cursor-pointer">
                        <Link
                            to={"/create-account"}
                        >
                            <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                Register</span>
                        </Link>
                    </div>
                </div>

                <div className="text-start p-15 space-y-4 max-w-5xl mx-auto">
                    <div className="space-y-4">
                        {!loader && <div className="font-bold text-2xl">Why volunteer?</div> }
                        <div className="text-justify">
                            {loader ? (
                                <div className="flex justify-center items-center h-full">
                                    <Hourglass />
                                </div>
                            ) : data && data[0]?.description ? (
                                ReactHtmlParser(data[0]?.description)
                            ) : null}
                        </div>
                        {/* <div className="flex">Developing new skills: Volunteering can help you develop new skills and gain valuable work experience. </div>
                        <div className="flex">Career advancement: Volunteering can help you improve your resume, create business relationships, and explore different industries.</div>
                        <div className="text-justify">According to the Deloitte Volunteer IMPACT Survey, 76% of human resources executives surveyed felt that volunteering made a job candidate more desirable, and 81% stated that skilled volunteering should be considered in hiring decisions. In another report, this time by the Corporation for National & Community Service, researchers found that candidates with volunteer experience were 27% more likely to find employment than their non-volunteering counterparts.</div> */}
                    </div>
                </div>
            </div>
            <FooterHeader />
        </>

    );
}

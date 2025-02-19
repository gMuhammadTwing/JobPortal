import { Link } from "react-router-dom";
import FooterHeader from "./Components/FooterHeader";
import axiosInstance, { handleError } from "../../axiosInstance";
import { useEffect, useState } from "react";
import ReactHtmlParser from "html-react-parser";
import { Hourglass } from "react-loader-spinner";

export default function Projects() {
    const [data, setData] = useState();
    const [loader, setLoader] = useState(false)
    const fetchData = async () => {
        setLoader(true)
        try {
            const response = await axiosInstance.get(`api/veritas_kwd_projects`);
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
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">VeritasKWD Projects</h1>
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

                <div className="text-center p-15 space-y-4 max-w-7xl mx-auto">
                    {/* <div className="font-medium text-4xl sm:text-4xl md:text-5xl">
                    About We’re on a mission to empowering Jobs worldwide.
                </div> */}
                    <div className="text-justify">
                        {/* VeritasKWD Projects are timed opportunities for job seekers. They come in all manner and shape— brand promoters, survey/research assignments, drafting legislation, writing assignments, social media influencers, digital space promoters, event promoters, etc. Candidates who are passionate and hardworking stand better chances for repeat engagements and possible permanent employment. */}
                        {loader ? (
                            <div className="flex justify-center items-center h-full">
                                <Hourglass />
                            </div>
                        ) : data && data[0]?.description ? (
                            ReactHtmlParser(data[0]?.description)
                        ) : null}
                    </div>
                </div>

            </div>
            <FooterHeader />
        </>

    );
}

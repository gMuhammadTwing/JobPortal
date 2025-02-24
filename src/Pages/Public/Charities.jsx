import { Link } from "react-router-dom";
import FooterHeader from "./Components/FooterHeader";
import axiosInstance, { handleError } from "../../axiosInstance";
import { useEffect, useState } from "react";
import ReactHtmlParser from "html-react-parser";
import { Hourglass, InfinitySpin } from "react-loader-spinner";
export default function Charities() {
    const [data, setData] = useState();
    const [loader, setLoader] = useState(false)
    const fetchData = async () => {
        setLoader(true)
        try {
            const response = await axiosInstance.get(`/api/veritas_kwd_charities`);
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
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">VeritasKWD Charities</h1>
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
                        {loader ? (
                            <div className="flex justify-center items-center h-full">
                                <InfinitySpin width={150} height={150} />
                            </div>
                        ) :
                            localStorage.token ? (
                                data && data[0]?.description_private ? (
                                    ReactHtmlParser(data[0]?.description_private)
                                )
                                    : null
                            ) :
                                data && data[0]?.description_public ? (
                                    ReactHtmlParser(data[0]?.description_public)
                                )
                                    : null
                        }
                        {/* Social welfare is at the heart of VeritasKWD hence VeritasKWD Charities. Social welfare refers to the well-being of a society, particularly for those who are disadvantaged or underprivileged. It also refers to the efforts made to protect the security and health of those in need. */}
                    </div>
                    {/* <div className="text-justify">
                        VeritasKWD engages with social purpose organizations including charities, non-profit organizations, and social enterprises not only to explore opportunities for job seekers in their spheres of operations, but also to support their initiatives. VeritasKWD upholds that Kenyans have a common heritage and destiny. VeritasKWD seeks to promote nationhood by championing “No Kenyan Left Behind” irrespective of their race, tribe, creed, religion, age, and gender.
                    </div> */}
                </div>

            </div>
            <FooterHeader />
        </>

    );
}

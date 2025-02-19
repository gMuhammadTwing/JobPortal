import { Link } from "react-router-dom";
import FooterHeader from "./Components/FooterHeader";
import axiosInstance, { handleError } from "../../axiosInstance";
import { useEffect, useState } from "react";
import ReactHtmlParser from "html-react-parser";
import { Hourglass } from "react-loader-spinner";
export default function Investors() {
    const [data, setData] = useState();
    const [loader, setLoader] = useState(false)
    const fetchData = async () => {
        setLoader(true)
        try {
            const response = await axiosInstance.get(`/api/veritas_kwd_investors`);
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
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Veritas Endless Possibities for Investors</h1>
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
                    {/* <div className="text-justify">
                        VeritasKWD is a hiring and opportunity creation marketplace. VeritasKWD Endless Possibilities is a massive and realistic opportunity creation model that calls for multisectoral participation. To be transformative, VeritasKWD ropes in to the extent possible, the national government of Kenya, county governments, private companies, private investors, and individuals to be partakers in VeritasKWD opportunity creation.
                    </div> */}
                    <div className="text-justify">
                        {loader ? (
                            <div className="flex justify-center items-center h-full">
                                <Hourglass />
                            </div>
                        ) : localStorage.token ? (
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
                        {/* Opportunities are deliberately created. Meaningful opportunity creation is capital intensive hence the need for investors. Opportunity Creation is directly proportional to Investment—intentional investment would create opportunities for all Kenyans. VeritasKWD Endless Possibilities investor model guarantees a full employment rate in Kenya. */}
                    </div>
                </div>

            </div>
            <FooterHeader />
        </>

    );
}

import { Link } from "react-router-dom";
import FooterHeader from "./Components/FooterHeader";
import { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../axiosInstance";
import ReactHtmlParser from "html-react-parser"; // Import the parser
import { Hourglass } from "react-loader-spinner";

export default function Opportunity() {
    const [data, setData] = useState();
    const [loader, setLoader] = useState(false)
    const fetchData = async () => {
        setLoader(true)
        try {
            const response = await axiosInstance.get(`/api/veritas_kwd_opportunity`);
            if (response) {
                console.log(response);
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
    }, []);

    return (
        <>
            <div className='bg-white'>
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">VeritasKWD Opportunity Creation Program</h1>
                    <div className="mt-5 flex justify-center cursor-pointer">
                        <Link to={"/create-account"}>
                            <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                Register
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="text-center p-15 space-y-4 max-w-7xl mx-auto">
                    <div className="text-justify">
                        {/* Render parsed HTML content */}
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

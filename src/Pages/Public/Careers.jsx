import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/outline";
import FooterHeader from "./Components/FooterHeader";
import { Link } from "react-router-dom";
import axiosInstance, { handleError } from "../../axiosInstance";
import { useEffect, useState } from "react";
import ReactHtmlParser from "html-react-parser";
import { Hourglass } from "react-loader-spinner";
export default function Careers() {
    const [data, setData] = useState();
    const [loader, setLoader] = useState(false)
    const fetchData = async () => {
        setLoader(true)
        try {
            const response = await axiosInstance.get(`/api/veritas_kwd_careers`);
            if (response) {
                setData(response.data)
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoader(false)
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
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Careers at VeritasKWD</h1>
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
                        {loader ? (
                            <div className="flex justify-center items-center h-full">
                                <Hourglass />
                            </div>
                        )
                            :
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

                        {/* <div className="">VeritasKWD strives to be the very BEST company to work for. Some practices we have adopted to be the greatest company to work for include, but are not limited to:</div>
                        <div className="flex"><CheckIcon className="w-6 h-6 text-white bg-green-500 rounded-full p-1 mr-5 mt-1" />Competitive compensation: We pay our employees well and offer benefits that are competitive with other companies in the industry. </div>
                        <div className="flex"><CheckIcon className="w-6 h-6 text-white bg-green-500 rounded-full p-1 mr-5 mt-1" />Career development: We provide paid training during work hours so employees can learn new skills without sacrificing their personal time. </div>
                        <div className="flex mb-4">
                            <CheckIcon className="w-6 h-6 text-white bg-green-500 rounded-full p-1 mr-5 mt-1" />
                            <p>Listen to employees: We actively listen to our employees and make them feel heard. Employees who feel heard are more likely to perform well.</p>
                        </div>
                        <div className="flex mb-4">
                            <CheckIcon className="w-6 h-6 text-white bg-green-500 rounded-full p-1 mr-5 mt-1" />
                            <p>Value employees: We make employees feel valued, supported, respected, and rewarded.</p>
                        </div>
                        <div className="flex mb-4">
                            <CheckIcon className="w-6 h-6 text-white bg-green-500 rounded-full p-1 mr-5 mt-1" />
                            <p>Create an inclusive culture: We create a safe space where employees can bring their authentic selves to work.</p>
                        </div>
                        <div className="flex mb-4">
                            <CheckIcon className="w-6 h-6 text-white bg-green-500 rounded-full p-1 mr-5 mt-1" />
                            <p>Encourage innovation: We make employees feel safe to share their ideas with managers and higher-ups.</p>
                        </div>
                        <div className="flex mb-4">
                            <CheckIcon className="w-6 h-6 text-white bg-green-500 rounded-full p-1 mr-5 mt-1" />
                            <p>Appreciate employees: We regularly appreciate our employees to boost performance and engagement.</p>
                        </div>
                        <div className="flex">
                            <CheckIcon className="w-6 h-6 text-white bg-green-500 rounded-full p-1 mr-5 mt-1" />
                            <p>Give employees opportunities to grow: We give our employees the opportunity to grow in their positions.</p>
                        </div> */}
                    </div>
                </div>
            </div>
            <FooterHeader />
        </>

    );
}

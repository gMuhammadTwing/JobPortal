import { Link } from "react-router-dom";
import FooterHeader from "./Components/FooterHeader";
import QR from '../../assets/fb_qr.jpeg'
export default function JoinCommunity() {
    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Join our community</h1>
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

                <div className="text-center p-10 space-y-4 max-w-7xl mx-auto">
                    <div className="font-bold text-2xl">Join Our Facebook</div>
                    <div className="font-bold underline text-[#ff0000] text-2xl">Community</div>
                    <div className="text-center max-w-xl mx-auto">
                        Join the Veritas Jobs Facebook community, a place where you can meet other job-seekers and employers.
                    </div>
                    <div className="flex justify-center">
                        <img
                            alt="Your Company"
                            src={QR}
                            className="h-auto w-auto"
                        />
                    </div>
                </div>


            </div>
            <FooterHeader />
        </>

    );
}

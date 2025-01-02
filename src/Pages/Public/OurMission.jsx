import { Link } from "react-router-dom";
import FooterHeader from "./Components/FooterHeader";

export default function OurMission() {
    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Our Mission</h1>
                    {/* <p>We are dedicated to bridging the gap between talent and opportunity</p> */}
                </div>

                <div className="text-center p-15 max-w-7xl mx-auto">
                    {/* <div className="font-medium text-4xl sm:text-4xl md:text-5xl">
                    About We’re on a mission to empowering Jobs worldwide.
                </div> */}
                    <div>
                        To connect all job seekers in Kenya to opportunities locally, nationally, and globally.
                    </div>
                    <div className="">
                        VeritasKWD is driven by the maxim that “opportunities are deliberately created.”  Opportunities are not created in isolation and Veritas Kenya Workforce Database will partner with the national government, County governments, private organizations and private investors to create opportunities for all Kenyans.
                    </div>
                </div>

            </div>
            <FooterHeader />

        </>
    );
}

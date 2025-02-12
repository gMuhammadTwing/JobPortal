import { Link } from "react-router-dom";
import FooterHeader from "./Components/FooterHeader";

export default function OurVision() {
    return (
        <>
            <div
                className='p-10'
            >
                <div className=' text-center'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-black">Our Vision</h1>
                    {/* <p>We are dedicated to bridging the gap between talent and opportunity</p> */}
                </div>

                <div className="text-center p-2 space-y-2 max-w-7xl mx-auto">
                    {/* <div className="font-medium text-4xl sm:text-4xl md:text-5xl">
                    About We’re on a mission to empowering Jobs worldwide.
                </div> */}
                    <div className="text-center">
                        VeritasKWD is the ultimate Unemployment Solution—
                    </div>
                    <div className="text-center">
                        Moving Kenya to Full Employment rate and onwards to a Workforce Superpower.
                    </div>
                </div>

            </div>

        </>
    );
}

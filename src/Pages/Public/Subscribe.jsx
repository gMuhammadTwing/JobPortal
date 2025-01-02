import { Link } from "react-router-dom";
import SubscribeEmail from "./Components/SubscribeEmail";

export default function Subscribe() {
    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Subscribe</h1>
                    <p>Find your next great opportunity! Subscribe to Veritas Kenya Workforce Database.</p>
                </div>
            </div>
            <SubscribeEmail/>
        </>

    );
}

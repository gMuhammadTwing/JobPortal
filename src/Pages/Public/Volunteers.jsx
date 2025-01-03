import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/outline";
import FooterHeader from "./Components/FooterHeader";

export default function Volunteers() {
    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Volunteers</h1>
                    {/* <p>We are dedicated to bridging the gap between talent and opportunity</p> */}
                </div>

                <div className="text-start p-15 space-y-4 max-w-5xl mx-auto">
                    <div className="space-y-4">
                        <div className="font-bold text-2xl">Why volunteer?</div>
                        <div className="flex"><CheckIcon className="w-6 h-6 text-white bg-green-500 rounded-full p-1 mr-5 mt-1" />Developing new skills: Volunteering can help you develop new skills and gain valuable work experience. </div>
                        <div className="flex"><CheckIcon className="w-6 h-6 text-white bg-green-500 rounded-full p-1 mr-5 mt-1" />Career advancement: Volunteering can help you improve your resume, create business relationships, and explore different industries.</div>
                        <div className="text-justify">According to the Deloitte Volunteer IMPACT Survey, 76% of human resources executives surveyed felt that volunteering made a job candidate more desirable, and 81% stated that skilled volunteering should be considered in hiring decisions. In another report, this time by the Corporation for National & Community Service, researchers found that candidates with volunteer experience were 27% more likely to find employment than their non-volunteering counterparts.</div>
                    </div>
                </div>
            </div>
            <FooterHeader />
        </>

    );
}

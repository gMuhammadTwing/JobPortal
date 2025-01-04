import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import SubscribeEmail from "./Components/SubscribeEmail";

export default function WhySubscribe() {
    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Why Subscribe?</h1>
                    {/* <p>If you are unemployed or actively searching for a job, please subscribe and submit your resume.</p> */}
                    <div className="mt-10 flex justify-center cursor-pointer">
                        <Link
                            to={"/subscribe"}
                        >
                            <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                Subscribe</span>
                        </Link>
                    </div>
                </div>
                <div className="text-justify  space-y-4 max-w-6xl mx-auto p-5 mt-10">
                    <div className="">Veritas Jobs is a subscription only employment service that drives prosperous outcomes for job seekers, employers, communities and the nation of Kenya. Our subscription only hiring platform enhances the job seeker’s credibility by hosting only authentic credentials in the resume databases. We are committed to improving the job seeker’s experience by connecting genuine job seekers with genuine employers.  We empower job seekers for success.</div>
                    <div>The actual subscription value for all VeritasKWD services is KES 1000. We are currently offering our services and products at an introductory discounted rate (half price). All Job seekers are encouraged to take advantage of this special offer—it is a limited-time offer!</div>
                </div>
                <div className=" space-y-4 max-w-6xl mx-auto px-5 py-10 text-justify">
                    <div className="space-y-6">
                        <div className="font-semibold text-lg sm:text-xl lg:text-2xl">
                            What do you get for KES 500 only subscription fee?
                        </div>
                        <div className="space-y-4">
                            {[
                                "A lifetime access to Veritas Kenya Workforce Database and other related services",
                                "Find and apply for jobs",
                                "Get shortlisted for qualified jobs. VeritasKWD offers shortlisting services to employers.",
                                "De-identification/Anonymization/masking of job seeker’s name (Name codification). This protects the job seeker’s identity and detribalizes the hiring process by masking tribal names. Job seekers’ actual names are replaced by Unique Identification Codes (UIC). Learn more here (see 'Veritas Jobs Code91 Appendix 2')",
                                "De-identified resumes and Coursework make VeritasKWD the safest database in the world.",
                                "Unlimited Resume uploads to the Resume & Coursework bank",
                                "Coursework uploads and showcasing tilt the recruiting process to competency-based hiring, increasing job seeker’s chances of landing a job. (see 'Veritas Coursework Sample Appendix 3')",
                                "Unlimited access to new jobs",
                                "Enjoy ONETS benefits. VeritasKWD uses ONET (under Creative Commons Attribution 4.0 International License), a service and product of United States Department of Labor-Employment and Training Administration, for a comprehensive all families jobs’ classification in the Resume & Coursework bank. ONET is the world’s leading tool for career exploration for job seekers.",
                                "Job seekers enjoy unbiased hiring process. Subscribers are assigned unique identification codes (UIC) to use in their resumes and coursework. This eliminates tribal bias in hiring.",
                                "Access to Veritas Jobs’ Facebook Community",
                                "Job alerts on relevant job posts",
                                "Free consultation for job seekers (after 3 years of unemployment following graduation and 3 years of subscription to Veritas Kenya Workforce Database).",
                                "Telephone employment consultation upon request and on a first-come basis",
                                "Idea/Business Proposal submission for evaluation and possible funding (after 2 years of subscription and 5 years of continuous unemployment)",
                                "Immediate idea/Business proposal submission for graduate job seekers who have been unemployed or misemployed for 6+ years after graduation.",
                                "Early access to Remote jobs",
                                "Enjoy early access to paid Veritas experimental opportunities",
                                "Qualify to join work teams (Veritas teams) for paid special projects and assignments (after 3 years of subscription to and 3 years of continuous unemployment)",
                                "Access to Veritas Opportunity Creation Program (After 1 year of subscription and 6 years of continuous unemployment)",
                                "Free access to Unemployment seminars/ Opportunity exploration after 3 years of continuous unemployment and 3 years of subscription to Veritas Kenya Workforce Database",
                                "Access to temporary jobs",
                                "Access to contract jobs",
                                "Priority access to VeritasKWD Project jobs",
                                "Gain eligibility for paid research opportunities",
                                "Priority access and consideration for franchise opportunities",
                                "Exclusive access to new franchise jobs",
                                "Free career change consultation",
                                "Coursework weighting. VeritasKWD puts emphasis on the contribution of Coursework to job seeker’s hireability.",
                                "Freelance opportunities",
                                "Lifetime access to VeritasKWD entrepreneurial ecosystem.",
                                "Free virtual unemployment consultation available as soon as 6 months after subscription.",
                                "By subscribing to Veritas Jobs, job seekers get to showcase their qualifications to potential employers",
                                "Subscribing to VeritasKWD is the first step to getting hired! VeritasKWD is the ultimate solution to unemployment. We seek to be of benefit to all Kenyan job seekers by adding or attaching value to their qualifications. VeritasKWD has an opportunity for everyone. Ours is a world of endless opportunities. We’ll help you discover yours!",
                                "Attain first come, first served VeritasKWD privileges. Seniority to VERITAS KENYA WORKFORCE DATABASE is solely determined by subscription date not the year of graduation.",
                                "Access endless possibilities",
                            ].map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <CheckIcon className="w-6 h-6 flex-shrink-0 text-white bg-green-500 rounded-full p-1 mr-4 mt-1" />
                                    <p className="text-sm sm:text-base md:text-lg">{item}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                <SubscribeEmail />
            </div>

        </>

    );
}

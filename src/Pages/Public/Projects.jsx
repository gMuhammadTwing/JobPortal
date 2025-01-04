import { Link } from "react-router-dom";
import FooterHeader from "./Components/FooterHeader";

export default function Projects() {
    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Projects</h1>
                    {/* <p>We are dedicated to bridging the gap between talent and opportunity</p> */}
                    <div className="mt-5 flex justify-center cursor-pointer">
                        <Link
                            to={"/subscribe"}
                        >
                            <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                Subscribe</span>
                        </Link>
                    </div>
                </div>

                <div className="text-center p-15 space-y-4 max-w-7xl mx-auto">
                    {/* <div className="font-medium text-4xl sm:text-4xl md:text-5xl">
                    About We’re on a mission to empowering Jobs worldwide.
                </div> */}
                    <div className="text-justify">
                        VeritasKWD Projects are timed opportunities for job seekers. They come in all manner and shape— brand promoters, survey/research assignments, drafting legislation, writing assignments, social media influencers, digital space promoters, event promoters, etc. Candidates who are passionate and hardworking stand better chances for repeat engagements and possible permanent employment.
                    </div>
                </div>

            </div>
            <FooterHeader />
        </>

    );
}

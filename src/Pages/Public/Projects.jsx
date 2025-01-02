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
                </div>

                <div className="text-center p-15 space-y-4 max-w-7xl mx-auto">
                    {/* <div className="font-medium text-4xl sm:text-4xl md:text-5xl">
                    About We’re on a mission to empowering Jobs worldwide.
                </div> */}
                    <div>
                        VeritasKWD Projects are timed opportunities for job seekers. They come in all manner and shape— brand promoters, survey/research assignments, drafting legislation, writing assignments, social media influencers, digital space promoters, event promoters, etc. Candidates who are passionate and hardworking stand better chances for repeat engagements and possible permanent employment.
                    </div>
                </div>

            </div>
            <FooterHeader />
        </>

    );
}

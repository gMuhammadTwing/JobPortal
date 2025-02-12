import FooterHeader from "./Components/FooterHeader";

export default function Disclaimer() {
    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Disclaimer</h1>
                    {/* <p>We are dedicated to bridging the gap between talent and opportunity</p> */}
                </div>

                <div className="text-center p-15 space-y-4 max-w-7xl mx-auto">
                    {/* <div className="font-medium text-4xl sm:text-4xl md:text-5xl">
                    About We’re on a mission to empowering Jobs worldwide.
                </div> */}
                    <div className="text-justify">
                        VeritasKWD does not guarantee the validity of a job offer and cautions Job Seekers to verify the validity of a job offer before taking an adverse action regarding their current employment situations. Job Seekers are solely responsible for verifying the accuracy of any Employer or job offer.
                    </div>
                </div>

            </div>
            <FooterHeader />
        </>

    );
}

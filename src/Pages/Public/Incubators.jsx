import FooterHeader from "./Components/FooterHeader";

export default function Incubators() {
    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Incubators</h1>
                    {/* <p>We are dedicated to bridging the gap between talent and opportunity</p> */}
                </div>

                <div className="text-center p-15 space-y-4 max-w-7xl mx-auto">
                    {/* <div className="font-medium text-4xl sm:text-4xl md:text-5xl">
                    About We’re on a mission to empowering Jobs worldwide.
                </div> */}
                    <div className="text-justify">
                    VeritasKWD idea incubator is a program that helps Kenyan opportunity seekers and creators submit ideas/business proposals that are aligned with their passions and are viable in the real world. VeritasKWD idea incubators help new businesses and ideas grow. We subject ideas/business proposals to in-depth and extensive research, stress testing, feasibility testing, viability, and concept evaluation among other measures. We source external funding for ideas/business proposals that are innovative and have the greatest job creation potential. Veritas finances ideas/proposals that are cool and useful and meet VeritasKWD’s funding threshold. Veritas would finance the idea/business proposal in exchange for an agreeable equity. To submit an idea/business proposal, one must be unemployed for at least 3 years after subscription to VeritasKWD and 3 years after graduation. Job seekers who are degree holders and have never been employed or are misemployed for 6+ years (after graduation) may submit business ideas or Business proposals immediately after subscription for consideration. 
                    </div>
                    {/* <div>
                        VeritasKWD engages with social purpose organizations including charities, non-profit organizations, and social enterprises not only to explore opportunities for job seekers in their spheres of operations, but also to support their initiatives. VeritasKWD upholds that Kenyans have a common heritage and destiny. VeritasKWD seeks to promote nationhood by championing “No Kenyan Left Behind” irrespective of their race, tribe, creed, religion, age, and gender.
                    </div> */}
                </div>

            </div>
            <FooterHeader />
        </>

    );
}

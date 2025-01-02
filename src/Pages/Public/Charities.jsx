import FooterHeader from "./Components/FooterHeader";

export default function Charities() {
    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Charities</h1>
                    {/* <p>We are dedicated to bridging the gap between talent and opportunity</p> */}
                </div>

                <div className="text-center p-15 space-y-4 max-w-7xl mx-auto">
                    {/* <div className="font-medium text-4xl sm:text-4xl md:text-5xl">
                    About We’re on a mission to empowering Jobs worldwide.
                </div> */}
                    <div>
                        Social welfare is at the heart of VeritasKWD hence VeritasKWD Charities. Social welfare refers to the well-being of a society, particularly for those who are disadvantaged or underprivileged. It also refers to the efforts made to protect the security and health of those in need.
                    </div>
                    <div>
                        VeritasKWD engages with social purpose organizations including charities, non-profit organizations, and social enterprises not only to explore opportunities for job seekers in their spheres of operations, but also to support their initiatives. VeritasKWD upholds that Kenyans have a common heritage and destiny. VeritasKWD seeks to promote nationhood by championing “No Kenyan Left Behind” irrespective of their race, tribe, creed, religion, age, and gender.
                    </div>
                </div>

            </div>
            <FooterHeader />
        </>

    );
}

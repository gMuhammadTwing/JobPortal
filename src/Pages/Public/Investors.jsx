import FooterHeader from "./Components/FooterHeader";

export default function Investors() {
    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Investors</h1>
                    {/* <p>We are dedicated to bridging the gap between talent and opportunity</p> */}
                </div>

                <div className="text-center p-15 space-y-4 max-w-7xl mx-auto">
                    {/* <div className="font-medium text-4xl sm:text-4xl md:text-5xl">
                    About We’re on a mission to empowering Jobs worldwide.
                </div> */}
                    <div className="text-justify">
                        VeritasKWD is a hiring and opportunity creation marketplace. VeritasKWD Endless Possibilities is a massive and realistic opportunity creation model that calls for multisectoral participation. To be transformative, VeritasKWD ropes in to the extent possible, the national government of Kenya, county governments, private companies, private investors, and individuals to be partakers in VeritasKWD opportunity creation.
                    </div>
                    <div className="text-justify">
                    Opportunities are deliberately created. Meaningful opportunity creation is capital intensive hence the need for investors. Opportunity Creation is directly proportional to Investment—intentional investment would create opportunities for all Kenyans. VeritasKWD Endless Possibilities investor model guarantees a full employment rate in Kenya. 
                    </div>
                </div>

            </div>
            <FooterHeader />
        </>

    );
}

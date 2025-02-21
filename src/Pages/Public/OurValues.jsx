import { Link } from "react-router-dom";
import FooterHeader from "./Components/FooterHeader";
import ReactHtmlParser from "html-react-parser";
export default function OurValues({ data }) {
    return (
        <>
            <div
                className='p-10'
            >
                <div className=' text-center p-2'>
                    {/* <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-black">Our Values</h1> */}
                    {/* <p>We are dedicated to bridging the gap between talent and opportunity</p> */}
                </div>

                <div className="text-center p-2 max-w-7xl mx-auto">
                    <div className="text-center">
                        {
                            data ? (
                                ReactHtmlParser(data)
                            ) : null
                        }
                        {/* We believe an opportunity exists for everyone. To the extent possible, we assist job seekers realize their full potential, find jobs, discover opportunities, and/or create endless possibilities for all Kenyans. */}
                    </div>
                    {/* <div className="">
                        VeritasKWD is driven by the maxim that “opportunities are deliberately created.”  Opportunities are not created in isolation and Veritas Kenya Workforce Database will partner with the national government, County governments, private organizations and private investors to create opportunities for all Kenyans.
                    </div> */}
                </div>
            </div>

        </>
    );
}

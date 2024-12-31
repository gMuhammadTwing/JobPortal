import { ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid";
import FB from './../assets/fb.png'
import { Button } from "../Components/Button";
import footer_logo from '../assets/footer_logo.jpeg'
export default function Footer() {
    return (
        <div className="border rounded-lg bg-white p-4 pt-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Footer Main Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-20 border-gray-200 text-gray-600">
                    {/* Logo and Intro Section */}
                    <div className="col-span-2 space-y-6 text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start items-center">
                            <img
                                alt="Your Company"
                                src={footer_logo}
                                className="w-16 h-16 md:w-20 md:h-20"
                            />
                            <h1 className="ml-2 text-xl md:text-2xl font-bold text-gray-900">
                                Veritas Jobs
                            </h1>
                        </div>
                        <p className="text-gray-700 text-sm md:text-base">
                            We’re always in search of talented and motivated people. Don’t be shy, introduce yourself!
                        </p>
                        {/* <div className="mt-4 md:mt-6 flex flex-wrap justify-center lg:justify-start gap-4">
                            {["facebook-f", "twitter", "instagram", "linkedin"].map((icon, idx) => (
                                <button
                                    key={idx}
                                    className="flex items-center justify-center w-10 h-10 font-semibold border rounded hover:bg-[#ff0000] hover:text-white transition-all hover:rounded-full"
                                >
                                    <i className={`fa-brands fa-${icon}`} aria-hidden="true"></i>
                                </button>
                            ))}
                        </div> */}
                        <button className="bg-black text-white rounded py-2 px-4 hover:bg-[#ff0000] transition-all text-sm md:text-base">
                            Contact with us
                        </button>
                    </div>

                    {/* Useful Links Section */}
                    <div>
                        <ul className="space-y-3 text-center lg:text-left">
                            <li className="text-black font-semibold text-lg mb-5">
                                <span className="underline decoration-[#ff0000] decoration-2 underline-offset-8">Useful</span> Links
                            </li>
                            {["About Us", "Blog", "Login", "Register", "Forgot Password"].map((link, idx) => (
                                <li key={idx} className="flex justify-center lg:justify-start items-center">
                                    <ChevronRightIcon className="w-5 h-5 mt-1" />
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help & Support Section */}
                    <div>
                        <ul className="space-y-3 text-center lg:text-left">
                            <li className="text-black font-semibold text-lg mb-5">
                                <span className="underline decoration-[#ff0000] decoration-2 underline-offset-8">Help</span> & Support
                            </li>
                            {["Browse Candidates", "Employer Dashboard", "Job Packages", "Job Featured", "Post A Job"].map((item, idx) => (
                                <li key={idx} className="flex justify-center lg:justify-start items-center">
                                    <ChevronRightIcon className="w-5 h-5 mt-1" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect With Us Section */}
                    <div>
                        <ul className="space-y-3 text-center lg:text-left">
                            <li className="text-black font-semibold text-lg mb-5">
                                <span className="underline decoration-[#ff0000] decoration-2 underline-offset-8">Connect</span> With Us
                            </li>
                            {["Chat", "FAQ", "Reviews", "Privacy Policy", "Terms Of Use"].map((item, idx) => (
                                <li key={idx} className="flex justify-center lg:justify-start items-center">
                                    <ChevronRightIcon className="w-5 h-5 mt-1" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


            </div>
            {/* Footer Bottom Section */}
            <div className="text-center border-t py-2 mt-20 text-gray-600 text-sm md:text-base">
                Copyright 2024 © JobPortal. All rights reserved.
            </div>
        </div>
    );
}

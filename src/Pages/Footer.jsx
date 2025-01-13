import { ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid";
import FB from './../assets/fb.png'
import { Button } from "../Components/Button";
import footer_logo from '../assets/footer_logo.jpeg'
import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <div className="border rounded-lg bg-white p-4 pt-20">
            <div className="max-w-[78rem] mx-auto">
                {/* Footer Main Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-20 border-gray-200 text-gray-600">
                    {/* Logo and Intro Section */}
                    <div className="col-span-2 space-y-6 text-center lg:text-left">
                        <div className="flex justify-start lg:justify-start items-center">
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
                            Veritas Jobs is your go-to platform for the latest job listings and career opportunities in Kenya. As a trusted job board, we are committed to helping job seekers find their next opportunity.
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
                            <Link to={"contact-us"}>Contact with us</Link>
                        </button>
                    </div>

                    {/* Useful Links Section */}
                    <div>
                        <ul className="space-y-3 text-center lg:text-left">
                            {[
                                { text: "About Us", href: "/about-us" },
                                { text: "Blog", href: "/blogs" },
                                { text: "Login", href: "/login" },
                                { text: "Register", href: "/create-account" },
                                { text: "Forgot Password", href: "/forgot-password" }
                            ].map((link, idx) => (
                                <li key={idx} className="flex justify-center lg:justify-start items-center">
                                    <ChevronRightIcon className="w-5 h-5 mt-1" />
                                    <Link to={link.href} className="hover:underline">{link.text}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* Help & Support Section */}
                    {/* <div>
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
                    </div> */}

                    {/* Connect With Us Section */}
                    <div>
                        <ul className="space-y-3 text-center lg:text-left">
                            {/* List of objects with both item text and href */}
                            {[
                                { label: "Terms & Conditions", href: "/terms" },
                                { label: "Disclaimer", href: "/disclaimer" },
                                { label: "Privacy Policy", href: "/privacy-policy" },
                                { label: "Refund Policy", href: "/refund-policy" },
                                { label: "Service/Product Guarantee", href: "/service-guarantee" }
                            ].map((item, idx) => (
                                <li key={idx} className="flex justify-center lg:justify-start items-center">
                                    <ChevronRightIcon className="w-5 h-5 mt-1" />
                                    <Link to={item.href} className="hover:underline">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* Footer Bottom Section */}
            <div className="text-center border-t py-2 mt-20 text-gray-600 text-sm md:text-base">
                Copyright 2024 © Veritas Jobs. All rights reserved.
            </div>
        </div>
    );
}

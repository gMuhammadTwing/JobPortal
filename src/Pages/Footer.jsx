import { ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid";
import FB from './../assets/fb.png'
import { Button } from "../Components/Button";
export default function Footer() {
    return (
        <div className="border rounded-lg bg-white p-2 sm:pt-8 md:pt-16 lg:pt-20">
            <div className="mx-auto px-6 lg:px-8">
                {/* Footer Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 border-gray-200 text-gray-600 p-6">
                    {/* Logo and Intro Section */}
                    <div className="col-span-2 space-y-6 text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start items-center">
                            <img
                                alt="Your Company"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                className="w-10 h-10"
                            />
                            <h1 className="ml-2 text-2xl font-bold text-gray-900">Job Portal</h1>
                        </div>
                        <p className="text-gray-700">
                            We’re always in search of talented and motivated people. Don’t be shy, introduce yourself!
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4">
                            <button className="flex items-center justify-center w-10 h-10 font-semibold border rounded hover:bg-orange-600 hover:text-white transition-all hover:rounded-full">
                                <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 font-semibold border rounded hover:bg-orange-600 hover:text-white transition-all hover:rounded-full">
                                <i className="fa-brands fa-twitter" aria-hidden="true"></i>
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 font-semibold border rounded hover:bg-orange-600 hover:text-white transition-all hover:rounded-full">
                                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 font-semibold border rounded hover:bg-orange-600 hover:text-white transition-all hover:rounded-full">
                                <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
                            </button>
                        </div>
                        <button className="bg-black text-white rounded p-2 hover:bg-orange-600">
                            Contact with us
                        </button>
                    </div>

                    {/* Useful Links Section */}
                    <div>
                        <ul className="space-y-3 text-center lg:text-left">
                            <li className="text-black font-semibold text-[1.2rem] mb-5">
                                <span className="underline decoration-orange-600 decoration-2 underline-offset-8">Useful</span> Links
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                About Us
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Blog
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Login
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Register
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Forgot Password
                            </li>
                        </ul>
                    </div>

                    {/* Help & Support Section */}
                    <div>
                        <ul className="space-y-3 text-center lg:text-left">
                            <li className="text-black font-semibold text-[1.2rem] mb-5">
                                <span className="underline decoration-orange-600 decoration-2 underline-offset-8">Help</span> & Support
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Browse Candidates
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Employer Dashboard
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Job Packages
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Job Featured
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Post A Job
                            </li>
                        </ul>
                    </div>

                    {/* Other Links Section */}
                    <div>
                        <ul className="space-y-3 text-center lg:text-left">
                            <li className="text-black font-semibold text-[1.2rem] mb-5">
                                <span className="underline decoration-orange-600 decoration-2 underline-offset-8">Other</span> Links
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Freelancers
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Freelancer Details
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Project
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Project Details
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Post A Project
                            </li>
                        </ul>
                    </div>

                    {/* Connect With Us Section */}
                    <div>
                        <ul className="space-y-3 text-center lg:text-left">
                            <li className="text-black font-semibold text-[1.2rem] mb-5">
                                <span className="underline decoration-orange-600 decoration-2 underline-offset-8">Conn</span>ect With Us
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Chat
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                FAQ
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Reviews
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Privacy Policy
                            </li>
                            <li className="flex justify-center lg:justify-start">
                                <ChevronRightIcon className="w-5 h-5 mt-1" />
                                Terms Of Use
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="text-center mt-5 border-t py-3 text-gray-600">
                    Copyright 2024 © JobPortal. All rights reserved.
                </div>
            </div>
        </div>
    );
}

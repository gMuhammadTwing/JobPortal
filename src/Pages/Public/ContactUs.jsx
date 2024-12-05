import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Button } from "../../Components/Button";

export default function ContactUs() {
    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <div className=' text-center bg-[#FFF5F3] p-20'>
                <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl">Contact Us</h1>
                <p>We can’t wait to hear from you.</p>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto p-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
                    {/* Text Section */}
                    <div className="flex flex-col justify-center text-center md:text-left">
                        <h1 className="font-semibold text-2xl mb-4">Singapore (Asia-Pacific HQ)</h1>
                        <div className="flex items-start gap-3 mb-2">
                            <MapPinIcon className="w-6 h-6 text-orange-600" />
                            <div>
                                <strong>Address:</strong>
                                <br />
                                60 Anson Road
                                <br />
                                Mapletree Anson, #10-03
                                <br />
                                Singapore 079914
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <PhoneIcon className="w-6 h-6 text-orange-600" />
                            <div>
                                <strong>Phone:</strong>{" "}
                                <span className="text-blue-700 underline">
                                    +65 6955 6000
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-start gap-4">
                            {/* Social Media Buttons */}
                            {["facebook-f", "twitter", "instagram", "linkedin"].map((icon) => (
                                <button
                                    key={icon}
                                    className="flex items-center justify-center w-10 h-10 text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition-all"
                                >
                                    <i className={`fa-brands fa-${icon}`} aria-hidden="true"></i>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex justify-center items-center">
                        <img
                            src="https://www.hubspot.com/hubfs/Contact%20Us/singapore.jpg"
                            alt="Singapore Office"
                            className="rounded-lg border-white shadow-lg w-full h-auto object-cover"
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <img
                            src="https://www.hubspot.com/hubfs/Contact%20Us/sydney.jpg"
                            alt="Singapore Office"
                            className="rounded-lg border-white shadow-lg w-full h-auto object-cover"
                        />
                    </div>
                    <div className="border shadow-1 rounded-lg p-4">
                        <form className="">
                            {/* <p className="mb-2 text-center lg:text-left">Prefer doing things in person? We don’t but we have to list our addresses here for legal reasons.</p> */}

                            {/* Full Name input */}
                            <div className="mb-2">
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-900">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    required
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                />
                            </div>

                            {/* Email input */}
                            <div className="mb-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                                    Message
                                </label>
                                <input
                                    id="message"
                                    name="message"
                                    type="message"
                                    required
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                />
                            </div>

                            <div className="text-center">
                                <Button
                                    type="submit"
                                    color="gradient"
                                    variant="solid"
                                    className={"inline-block text-white"}
                                >Contact Us</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

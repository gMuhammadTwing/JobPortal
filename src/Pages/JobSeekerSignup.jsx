import { Link } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import { Button } from "../Components/Button";

export default function JobSeekerSignup() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-neutral-200 dark:bg-neutral-700">
            <div className="w-full max-w-md lg:max-w-4xl mx-auto p-4 sm:p-6 md:p-10">
                <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left column container */}
                        <div className="w-full px-4 py-4 md:px-8 lg:w-6/12 lg:p-12">
                            <div className="text-center">
                                {/* <img
                                    className="mx-auto w-24 sm:w-32 md:w-40 lg:w-48"
                                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                    alt="logo"
                                /> */}
                                <h4 className="mb-4 text-xl font-semibold">
                                    Join us as Job Seeker
                                </h4>
                            </div>

                            <form>
                                <p className="mb-2 text-center lg:text-left">Create a new account</p>

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
                                <div className="mb-2">
                                    <label htmlFor="nid" className="block text-sm font-medium text-gray-900">
                                        National ID
                                    </label>
                                    <input
                                        id="nid"
                                        name="nid"
                                        type="number"
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

                                {/* Password input */}
                                <div className="mb-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                </div>

                                {/* Confirm Password input */}
                                <div className="mb-7">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                </div>

                                {/* Signup button */}
                                <div className="text-center">
                                    {/* <TERipple rippleColor="light" className="w-full"> */}
                                    {/* <button
                                            type="submit"
                                            className="inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none bg-gradient-to-r from-orange-500 to-pink-600"
                                        >
                                            Sign Up
                                        </button> */}
                                    <Button
                                        type="submit"
                                        color="gradient"
                                        variant="solid"
                                        className={"inline-block w-full text-white"}
                                    >Sign Up</Button>
                                    {/* </TERipple> */}
                                </div>

                                {/* Login link */}
                                <div className="mt-4 flex items-center justify-center lg:justify-start">
                                    <p className="text-sm">Already have an account?</p>
                                    <TERipple rippleColor="light">
                                        <Link
                                            to="/login"
                                            className="ml-2 inline-block px-6 pb-[6px] pt-2 text-xs font-medium uppercase text-danger"
                                        >
                                            <Button
                                                type="button"
                                                color="gradient"
                                                variant="outline"
                                            // onClick={onClose}
                                            >Login</Button>
                                        </Link>
                                    </TERipple>
                                </div>
                            </form>
                        </div>

                        {/* Right column container with background and description */}
                        <div
                            className="hidden lg:flex lg:w-6/12 items-center justify-center rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none bg-gradient-to-r from-orange-500 to-pink-600"
                        >
                            <div className="px-4 py-8 text-white md:p-12">
                                <h4 className="mb-6 text-xl font-semibold">Welcome to our community</h4>
                                <p className="text-sm">
                                    Join us and start your journey. Experience a platform where growth and collaboration are at the core of our values.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

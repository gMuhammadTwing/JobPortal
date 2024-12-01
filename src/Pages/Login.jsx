import { Link } from "react-router-dom";
import { TERipple } from "tw-elements-react";
import { Button } from "../Components/Button";

export default function Login() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-neutral-200 dark:bg-neutral-700">
            <div className="w-full max-w-md lg:max-w-4xl mx-auto p-4 sm:p-6 md:p-10">
                <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left column container */}
                        <div className="w-full px-4 py-8 md:px-8 lg:w-6/12 lg:p-12">
                            <div className="text-center">
                                <img
                                    className="mx-auto w-24 sm:w-32 md:w-40 lg:w-48"
                                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                    alt="logo"
                                />
                                <h4 className="mb-12 mt-4 text-xl font-semibold">
                                    We are The Lotus Team
                                </h4>
                            </div>

                            <form>
                                <p className="mb-4 text-center lg:text-left">Please login to your account</p>

                                {/* Email input */}
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                </div>

                                {/* Password input */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                            Password
                                        </label>
                                        <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                </div>

                                {/* Login button */}
                                <div className="text-center">
                                    {/* <TERipple rippleColor="light" className="w-full"> */}
                                    <Link
                                        to={"/dashboard"}
                                        type="button"
                                    // className="inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none bg-gradient-to-r from-orange-500 to-pink-600"
                                    // style={{
                                    //     background:
                                    //         "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                    // }}
                                    >
                                        <Button
                                            type="button"
                                            color="gradient"
                                            variant="solid"
                                            className={"inline-block w-full text-white"}
                                        >Log in</Button>
                                    </Link>
                                    {/* </TERipple> */}
                                </div>

                                {/* Register link */}
                                <div className="mt-6 flex items-center justify-center lg:justify-start">
                                    <p className="text-sm">Don't have an account?</p>
                                    <TERipple rippleColor="light">
                                        <Link
                                            type="button"
                                            to={"/create-account"}
                                            className="ml-2 inline-block px-6 pb-[6px] pt-2 text-xs font-medium uppercase text-danger"
                                        >
                                            <Button
                                                type="button"
                                                color="gradient"
                                                variant="outline"
                                            // onClick={onClose}
                                            >Register</Button>
                                        </Link>
                                    </TERipple>
                                </div>
                            </form>
                        </div>

                        {/* Right column container with background and description */}
                        <div
                            className="hidden lg:flex lg:w-6/12 items-center justify-center rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none bg-gradient-to-r from-orange-500 to-pink-600"
                        // style={{
                        //     background:
                        //         "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                        // }}
                        >
                            <div className="px-4 py-8 text-white md:p-12">
                                <h4 className="mb-6 text-xl font-semibold">We are more than just a company</h4>
                                <p className="text-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { Link, Navigate, useNavigate } from "react-router-dom";
import { TERipple } from "tw-elements-react";
import { Button } from "../Components/Button";
import { useFormik } from "formik";
import auth from "../auth";
import { InfinitySpin } from "react-loader-spinner";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import Logo from '../assets/footer_logo.jpeg'
export default function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            setLoading(true)
            await auth.login(values)
            if (localStorage.token && localStorage.token != 'undefined') {
                navigate("/home")
                window.location.reload();
            }
            else {
                toast.error("Incorrect username or password")
            }
            setLoading(false)
        },
    });
    return (
        <section className=" flex items-center justify-center bg-neutral-200 dark:bg-neutral-700">
            {/* <Toaster richColors /> */}
            <div className="w-full max-w-md lg:max-w-4xl mx-auto p-4 sm:p-6 md:p-10">
                <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left column container */}
                        <div className="w-full px-4 py-8 md:px-8 lg:w-6/12 lg:p-12">
                            <div className="text-center">
                                <img
                                    className="mx-auto w-20 sm:w-30 md:w-30 lg:w-30"
                                    src={Logo}
                                    alt="logo"
                                />
                                <h4 className="mb-12 mt-4 text-xl font-semibold">
                                    We are The Veritas Jobs
                                </h4>
                            </div>

                            <form onSubmit={formik.handleSubmit}>
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
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
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
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        autoComplete="current-password"
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                </div>

                                {/* Login button */}
                                <div className="text-center">
                                    {loading ? <div className="flex justify-center mr-5"><InfinitySpin width={150} color="green" /></div> :
                                        <Button
                                            type="submit"
                                            color="gradient"
                                            variant="solid"
                                            className={"inline-block w-full text-white"}
                                        >Sign in</Button>
                                    }
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
                            className="hidden lg:flex lg:w-6/12 items-center justify-center rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none bg-gradient-to-r from-[#008604] to-[#008604]"
                        // style={{
                        //     background:
                        //         "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                        // }}
                        >
                            <div className="px-4 py-8 text-white md:p-12">
                                <h4 className="mb-6 text-xl font-semibold">Veritas Jobs</h4>
                                <p className="text-sm">
                                    Veritas Jobs is your go-to platform for the latest job listings and career opportunities in Kenya. As a trusted job board, we are committed to helping job seekers find their next opportunity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

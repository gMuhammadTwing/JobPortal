import { useFormik } from "formik";
import { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { toast } from "sonner";
import FooterHeader from "./Public/Components/FooterHeader";
import Logo from '../assets/footer_logo.jpeg'
export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: async (values) => {
            setLoading(true);
            // Here you should implement logic for sending a reset email, e.g. calling an API.
            // For now, let's just simulate a success message.
            toast.success("Password reset instructions sent to your email.");
            setLoading(false);
        },
    });

    return (
        <>
            {/* <div className=' text-center bg-[#FFF5F3] p-12'>
                <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Forgot Password</h1>
                
            </div> */}
            <section className="flex items-center justify-center bg-white">

                <div className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-10">
                    <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800 border p-10">

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
                        <div className="text-start">
                            <div className="mb-4 text-xl font-semibold">Forgot Your Password?</div>
                        </div>

                        <form onSubmit={formik.handleSubmit}>
                            {/* Email input */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                    Enter your email address
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

                            {/* Reset password button */}
                            <div className="text-center">
                                {loading ? (
                                    <div className="flex justify-center mr-5"><InfinitySpin width={150} color="green" /></div>
                                ) : (
                                    <button
                                        type="submit"
                                        className="w-full bg-[#008600] text-white py-1 px-4 rounded-md"
                                    >
                                        Send Reset Link
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

            </section>
            <FooterHeader />
        </>
    );
}

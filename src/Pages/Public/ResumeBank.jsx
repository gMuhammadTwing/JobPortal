import { toast } from "sonner";
import axiosInstance, { handleError } from "../../axiosInstance";
import FooterHeader from "./Components/FooterHeader";
import auth from "../../auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { InfinitySpin } from "react-loader-spinner";
import { Button } from "../../Components/Button";
import { Skeleton } from "../../Components/Skeleton";
export default function ResumeBankPublic() {
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [loader, setLoader] = useState(false);
    const [tableLoader, setTableLoader] = useState(false)
    const [user_id, setUserId] = useState();
    const formik = useFormik({
        initialValues: {
            name: "",
            role_id: "",
            email: "",
            password: "",
            c_password: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Must be at least 2 characters")
                .max(50, "Must be 50 characters or less")
                .required("Company Name is required"),
            role_id: Yup.string()
                .required("Please select a registration type"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
            c_password: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await axiosInstance.post("api/auth/register", values);
                if (response) {
                    toast.success(response.message || "Account created successfully!");
                    localStorage.setItem("token", response?.data?.token?.accessToken);
                    localStorage.setItem("user_id", response?.data?.token?.token?.user_id);
                    setUserId(response?.data?.token?.token?.user_id);
                    if (values?.role_id == 4) {
                        setRegistered(true)
                    }
                    getPaymentInstructions();
                    formik.resetForm();
                }
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        },
    });

    const [paymentInstructions, setPaymentInstructions] = useState()
    const navigate = useNavigate();
    const getPaymentInstructions = async () => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`api/admin_payment_instruction?role_id=${formik.values.role_id}`);
            if (response) {
                setPaymentInstructions(response?.data[0])
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
        }
    };
    const submitPayment = async () => {
        setLoader(true)
        const json = {
            user_id: user_id,
            amount: paymentInstructions?.amount,
        }
        try {
            const response = await axiosInstance.post(`api/user_payment_history/store`, json);
            if (response) {
                toast.success("Payment submitted successfully");
                localStorage.setItem("payment", false);
            }
        } catch (error) {
            handleError(error);
        }
        finally {
            setLoader(false)
            auth.logout();
            navigate("/login")
        }
    }
    const parser = new DOMParser();
    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Resume Bank</h1>
                    <p className="mt-1">Need to find candidates fast?  Veritas Jobs for  employers in Kenya.</p>
                    <div className="mt-5 flex justify-center cursor-pointer">
                        {localStorage?.token ? (
                            (localStorage.payment == 'true' || localStorage.role_id == 1 || localStorage.role_id == 5 || localStorage.role_id == 3) ?
                                <Link
                                    to={"/jobs"}
                                >
                                    <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                        Browse Jobs</span>
                                </Link> :
                                (
                                    localStorage.payment == 'false' ?
                                        <Link
                                            onClick={() => toast.info("Payment Approval Pending")}
                                            to={"/home"}
                                        >
                                            <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                                Browse Jobs</span>
                                        </Link>
                                        :
                                        <Link
                                            onClick={() => toast.info("Payment Approval Pending")}
                                            to={"/payment-alert"}
                                        >
                                            <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                                Browse Jobs</span>
                                        </Link>
                                )
                        ) : (
                            <Link
                                onClick={() => toast.info("Please login first")}
                                to={"/login"}
                            >
                                <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                    Browse Jobs</span>
                            </Link>
                        )}
                    </div>
                </div>

                <section className="flex items-center justify-center shadow-lg p-12">
                    <div className="w-full max-w-md mx-auto">
                        <div className="block rounded-lg bg-white shadow-lg">
                            <div className="">
                                {/* Left column container */}
                                <div className="w-full px-4 py-4 md:px-8 border rounded-lg">
                                    <div className="text-center">
                                        <h4 className="mb-4 text-xl font-semibold">
                                            Join us as Employer
                                        </h4>
                                    </div>
                                    {!registered ? (
                                        <>
                                            <form onSubmit={formik.handleSubmit}>
                                                <p className="mb-2 text-center lg:text-left">Create a new account</p>
                                                <div className="mb-2">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                                        Company Name
                                                    </label>
                                                    <input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        value={formik.values.name}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className={`block py-1.5 px-3 border ${formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"
                                                            } text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:outline-none hover:border-blue-500 mt-2`}
                                                    />
                                                    {formik.touched.name && formik.errors.name && (
                                                        <p className="mt-1 text-xs text-red-500">{formik.errors.name}</p>
                                                    )}
                                                </div>

                                                {/* Registered As */}
                                                <div className="mb-2">
                                                    <label htmlFor="role_id" className="block text-sm font-medium text-gray-900">
                                                        Registered As
                                                    </label>
                                                    <select
                                                        id="role_id"
                                                        name="role_id"
                                                        value={formik.values.role_id}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className={`block py-1.5 px-3 border ${formik.touched.role_id && formik.errors.role_id ? "border-red-500" : "border-gray-300"
                                                            } text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:outline-none hover:border-blue-500 mt-2`}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="3">Employer</option>
                                                        <option value="4">Employment Agency</option>
                                                    </select>
                                                    {formik.touched.role_id && formik.errors.role_id && (
                                                        <p className="mt-1 text-xs text-red-500">{formik.errors.role_id}</p>
                                                    )}
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
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className={`block py-1.5 px-3 border ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
                                                            } text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:outline-none hover:border-blue-500 mt-2`}
                                                    />
                                                    {formik.touched.email && formik.errors.email && (
                                                        <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
                                                    )}
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
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className={`block py-1.5 px-3 border ${formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
                                                            } text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:outline-none hover:border-blue-500 mt-2`}
                                                    />
                                                    {formik.touched.password && formik.errors.password && (
                                                        <p className="mt-1 text-xs text-red-500">{formik.errors.password}</p>
                                                    )}
                                                </div>

                                                {/* Confirm Password input */}
                                                <div className="mb-7">
                                                    <label htmlFor="c_password" className="block text-sm font-medium text-gray-900">
                                                        Confirm Password
                                                    </label>
                                                    <input
                                                        id="c_password"
                                                        name="c_password"
                                                        type="password"
                                                        value={formik.values.c_password}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className={`block py-1.5 px-3 border ${formik.touched.c_password && formik.errors.c_password ? "border-red-500" : "border-gray-300"
                                                            } text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:outline-none hover:border-blue-500 mt-2`}
                                                    />
                                                    {formik.touched.c_password && formik.errors.c_password && (
                                                        <p className="mt-1 text-xs text-red-500">{formik.errors.c_password}</p>
                                                    )}
                                                </div>

                                                {/* Signup button */}
                                                <div className="text-center">
                                                    {loading ? (
                                                        <div className="flex justify-center">
                                                            <InfinitySpin width={150} color="green" />
                                                        </div>
                                                    ) : (
                                                        <Button
                                                            type="submit"
                                                            color="gradient"
                                                            variant="solid"
                                                            className="inline-block w-full text-white"
                                                        >
                                                            Sign Up
                                                        </Button>
                                                    )}
                                                </div>
                                            </form>
                                            {/* Login link */}
                                            <div className="mt-6 flex items-center justify-center lg:justify-start">
                                                <p className="text-sm">Already have an account?</p>
                                                <Link
                                                    to="/login"
                                                    className="ml-2 inline-block px-6 pb-[6px] pt-2 text-xs font-medium uppercase text-danger"
                                                >
                                                    <Button type="button" color="gradient" variant="outline">
                                                        Login
                                                    </Button>
                                                </Link>
                                            </div>
                                        </>
                                    ) :
                                        <div className="">
                                            {tableLoader ? <Skeleton /> :
                                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                    <div className="col-span-full text-gray-600">
                                                        <strong>Payment Instructions:</strong>
                                                        <ul className="list-disc pl-5 space-y-1">
                                                            <li>{parser.parseFromString(paymentInstructions?.instructions || '', "text/html").body.textContent.trim()}</li>
                                                            {/* <li>Bank Details: </li>
                                                                    <li>Account No: 03120376631</li>
                                                                    <li>Account Title: Joe Joe</li>
                                                                    <li>Bank of Kenya</li> */}
                                                        </ul>
                                                    </div>

                                                    <div className="sm:col-span-4">
                                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                                            Amount
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="amount"
                                                            value={paymentInstructions?.amount}
                                                            disabled
                                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                        />
                                                    </div>

                                                    <div className="col-span-1 h-20 flex items-center justify-center">
                                                        {loader ? (
                                                            <div className="mt-5">
                                                                <InfinitySpin height={120} width={120} color="green" />
                                                            </div>
                                                        ) : (
                                                            <div className=" mt-5 ml-2">
                                                                <Button
                                                                    type="button"
                                                                    color="gradient"
                                                                    variant="solid"
                                                                    onClick={() => submitPayment()}
                                                                >
                                                                    Submit
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>

    );
}

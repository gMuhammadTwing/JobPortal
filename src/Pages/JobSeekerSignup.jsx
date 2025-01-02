import { Link, useNavigate, useNavigation } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import { Button } from "../Components/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance, { handleError } from "../axiosInstance";
import { toast } from "sonner";
import { InfinitySpin } from "react-loader-spinner";
import { useState } from "react";
import { Skeleton } from "../Components/Skeleton";

// Validation schema
const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, "Full Name must be at least 3 characters")
        .required("Full Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    c_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});

export default function JobSeekerSignup() {
    const [registered, setRegistered] = useState(false);
    const [loader, setLoader] = useState(false);
    const [tableLoader, setTableLoader] = useState(false)
    const [user_id, setUserId] = useState();
    const initialValues = {
        name: "",
        email: "",
        password: "",
        c_password: "",
        role_id: 2,
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axiosInstance.post("api/auth/register", values);
            if (response) {
                toast.success(response.message || "Account created successfully!");
                localStorage.setItem("token", response?.data?.token?.accessToken);
                localStorage.setItem("user_id", response?.data?.token?.token?.user_id);
                setUserId(response?.data?.token?.token?.user_id);
                resetForm();
                setRegistered(true)
                getPaymentInstructions();
            }
        } catch (error) {
            handleError(error);
        } finally {
            setSubmitting(false);
        }
    };
    const [paymentInstructions, setPaymentInstructions] = useState()
    const parser = new DOMParser();
    const navigate = useNavigate();
    const getPaymentInstructions = async () => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`api/admin_payment_instruction?role_id=${initialValues.role_id}`);
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
                localStorage.setItem("payment",false);
            }
        } catch (error) {
            handleError(error);
        }
        finally {
            setLoader(false)
            navigate("/login")
        }
    }
    return (
        <section className="flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 min-h-screen">
            <div className="w-full max-w-md lg:max-w-4xl mx-auto p-4 sm:p-6 md:p-10">
                <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left column */}
                        <div className="w-full px-4 py-4 md:px-8 lg:w-6/12 lg:p-12">
                            <div className="text-center">
                                <h4 className="mb-4 text-xl font-semibold">
                                    Join us as Job Seeker
                                </h4>
                            </div>
                            {!registered ? (
                                <>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ isSubmitting }) => (
                                            <Form>
                                                <p className="mb-2 text-center lg:text-left">
                                                    Create a new account
                                                </p>
                                                {["name", "email", "password", "c_password"].map((field, index) => (
                                                    <div key={index} className="mb-2">
                                                        <label
                                                            htmlFor={field}
                                                            className="block text-sm font-medium text-gray-900"
                                                        >
                                                            {field === "c_password"
                                                                ? "Confirm Password"
                                                                : field.charAt(0).toUpperCase() + field.slice(1)}
                                                        </label>
                                                        <Field
                                                            id={field}
                                                            name={field}
                                                            type={field.includes("password") ? "password" : "text"}
                                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                        />
                                                        <ErrorMessage
                                                            name={field}
                                                            component="div"
                                                            className="text-red-500 text-xs mt-1"
                                                        />
                                                    </div>
                                                ))}
                                                <div className="text-center">
                                                    {isSubmitting ? (
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
                                            </Form>
                                        )}
                                    </Formik>
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
                                                >
                                                    Login
                                                </Button>
                                            </Link>
                                        </TERipple>
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
                        {/* Right column */}
                        <div className="hidden lg:flex lg:w-6/12 items-center justify-center rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none bg-gradient-to-r from-[#008604] to-[#008604]">
                            <div className="px-4 py-8 text-white md:p-12">
                                <h4 className="mb-6 text-xl font-semibold">
                                    Welcome to our community
                                </h4>
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

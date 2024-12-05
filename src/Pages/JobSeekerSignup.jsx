import { Link } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import { Button } from "../Components/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance, { handleError } from "../axiosInstance";
import { toast } from "sonner";
import { InfinitySpin } from "react-loader-spinner";

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
    const initialValues = {
        name: "",
        email: "",
        password: "",
        c_password: "",
        role_id: 2, // Fixed role for job seekers
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axiosInstance.post("api/auth/register", values);
            if (response) {
                toast.success(response.message || "Account created successfully!");
                resetForm();
            }
        } catch (error) {
            handleError(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="flex items-center justify-center bg-neutral-200 dark:bg-neutral-700">
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
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                </TERipple>
                            </div>
                        </div>
                        {/* Right column */}
                        <div className="hidden lg:flex lg:w-6/12 items-center justify-center rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none bg-gradient-to-r from-orange-500 to-pink-600">
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

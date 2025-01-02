import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Button } from "../../Components/Button";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance, { handleError } from "../../axiosInstance";
import { toast } from "sonner";
import GreatAboutUs from "./Components/GreatAboutUs";
import Testimonials from "./Components/Testimonials";
import FooterHeader from "./Components/FooterHeader";
export default function ContactUs() {
    const formik = useFormik({
        initialValues: {
            full_name: "",
            phone: "",
            email: "",
            message: "",
        },
        validationSchema: Yup.object({
            full_name: Yup.string()
                .required("Full name is required")
                .min(3, "Full name must be at least 3 characters"),
            phone: Yup.string()
                .required("Phone is required")
                .matches(/^\d+$/, "Phone must be numeric"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            // message: Yup.string().required("Message is required"),
        }),
        onSubmit: async (values) => {
            console.log("Form submitted:", values);
            try {
                const response = await axiosInstance.post(`/api/contact_us/store`, values);
                if (response) {
                    toast.success("Message Sent Successfully")

                }
            } catch (error) {
                handleError(error);
            } finally {
                formik.resetForm();
            }
        },
    });

    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <div className=' text-center bg-[#FFF5F3] p-20'>
                <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Contact Us</h1>
                <p>We’d love to hear from you! Whether you have questions, feedback, or need assistance</p>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto p-6 mt-10">
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

                    <div className="border shadow-1 rounded-lg p-4">
                        <form className="" onSubmit={formik.handleSubmit}>
                            {/* Full Name */}
                            <div className="mb-2">
                                <label htmlFor="full_name" className="block text-sm font-medium text-gray-900">
                                    Full Name
                                </label>
                                <input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    value={formik.values.full_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.full_name && formik.touched.full_name && (
                                    <p className="text-sm text-red-500">{formik.errors.full_name}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="mb-2">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.phone && formik.touched.phone && (
                                    <p className="text-sm text-red-500">{formik.errors.phone}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="mb-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.email && formik.touched.email && (
                                    <p className="text-sm text-red-500">{formik.errors.email}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div className="">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    name="message"
                                    type="text"
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.message && formik.touched.message && (
                                    <p className="text-sm text-red-500">{formik.errors.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="text-center mt-12">
                                <Button
                                    type="submit"
                                    color="gradient"
                                    variant="solid"
                                    className={"inline-block text-white"}
                                >Contact Us</Button>
                            </div>
                        </form>
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
                </div>
            </div>
            <FooterHeader/>
            {/* <GreatAboutUs/> */}
            {/* <Testimonials/> */}
        </div>
    );
}

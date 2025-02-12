import { CheckIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
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
            <div className=' text-center bg-[#FFF5F3] p-12'>
                <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Contact Us</h1>
                <p>We’d love to hear from you! Whether you have questions, feedback, or need assistance</p>
            </div>

            {/* Content Section */}
            <div className="max-w-[78rem] mx-auto p-6 mt-20 mb-20">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="border shadow-1 rounded-lg p-4">
                        <form className="grid grid-cols-1 gap-2 md:grid-cols-2" onSubmit={formik.handleSubmit}>
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
                            <div className="col-span-full">
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
                            <div className="col-span-full text-center mt-0">
                                <Button
                                    type="submit"
                                    color="gradient"
                                    variant="solid"
                                    className={"inline-block text-white"}
                                >Contact Us</Button>
                            </div>
                        </form>
                    </div>
                    <div className="space-y-4 text-center">
                        <div className="font-semibold">Have any questions? </div>
                        <div className="">We’re ready to help! We'd like to hear from you - here's how you can contact us:  </div>
                        <div className="font-semibold">General questions </div>
                        <div className="">For general queries, please email us at <span className="text-[#ff0000]">support@veritaskenya.com</span>  </div>
                    </div>

                    {/* Image Section */}
                    {/* <div className="flex justify-center items-center">
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
                    </div> */}
                </div>
            </div>
            <FooterHeader />
            {/* <GreatAboutUs/> */}
            {/* <Testimonials/> */}
        </div>
    );
}

import { Link } from "react-router-dom";
import FooterHeader from "./Components/FooterHeader";
import { toast } from "sonner";
import axiosInstance, { handleError } from "../../axiosInstance";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../../Components/Button";
import { Hourglass, InfinitySpin } from "react-loader-spinner";
import { useEffect, useState } from "react";
import ReactHtmlParser from "html-react-parser";
export default function Incubators() {
    const [data, setData] = useState();
    const [loader, setLoader] = useState(false)
    const fetchData = async () => {
        setLoader(true)
        try {
            const response = await axiosInstance.get(`/api/veritas_kwd_idea_incubators`);
            if (response) {
                console.log(response);

                setData(response?.data);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoader(false)
            // setTableLoader(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
            attachment: null, // File input
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Name is required")
                .min(3, "Name must be at least 3 characters"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            message: Yup.string().required("Message is required"),
            attachment: Yup.mixed()
                .nullable()
                .test(
                    "fileType",
                    "Only image/pdf files are allowed",
                    (value) =>
                        !value || ["image/png", "image/jpeg", "application/pdf"].includes(value.type)
                ),
        }),
        onSubmit: async (values) => {
            setIsLoading(true)
            try {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("email", values.email);
                formData.append("message", values.message);
                if (values.attachment) {
                    formData.append("attachment", values.attachment);
                }

                const response = await axiosInstance.post(`/api/veritas_kwd_idea_incubators_form/store`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (response) {
                    toast.success("Message Sent Successfully");
                }
            } catch (error) {
                handleError(error);
            } finally {
                formik.resetForm();
                setIsLoading(false);
                formik.setFieldValue("attachment", null);
                window.location.reload();
            }
        },
    });

    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">VeritasKWD Idea Incubators</h1>
                    {/* <p>We are dedicated to bridging the gap between talent and opportunity</p> */}
                    <div className="mt-5 flex justify-center cursor-pointer">
                        <Link
                            to={"/create-account"}
                        >
                            <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                Register</span>
                        </Link>
                    </div>
                </div>

                <div className="text-center p-15 space-y-4 max-w-7xl mx-auto">
                    {/* <div className="font-medium text-4xl sm:text-4xl md:text-5xl">
                    About We’re on a mission to empowering Jobs worldwide.
                </div> */}
                    <div className="text-justify">
                        {loader ? (
                            <div className="flex justify-center items-center h-full">
                                <Hourglass />
                            </div>
                        ) : data && data[0]?.description ? (
                            ReactHtmlParser(data[0]?.description)
                        ) : null}
                        {/* VeritasKWD idea incubator is a program that helps Kenyan opportunity seekers and creators submit ideas/business proposals that are aligned with their passions and are viable in the real world. VeritasKWD idea incubators help new businesses and ideas grow. We subject ideas/business proposals to in-depth and extensive research, stress testing, feasibility testing, viability, and concept evaluation among other measures. We source external funding for ideas/business proposals that are innovative and have the greatest job creation potential. Veritas finances ideas/proposals that are cool and useful and meet VeritasKWD’s funding threshold. Veritas would finance the idea/business proposal in exchange for an agreeable equity. To submit an idea/business proposal, one must be unemployed for at least 3 years after subscription to VeritasKWD and 3 years after graduation. Job seekers who are degree holders and have never been employed or are misemployed for 6+ years (after graduation) may submit business ideas or Business proposals immediately after subscription for consideration. */}
                    </div>
                    {/* <div>
                        VeritasKWD engages with social purpose organizations including charities, non-profit organizations, and social enterprises not only to explore opportunities for job seekers in their spheres of operations, but also to support their initiatives. VeritasKWD upholds that Kenyans have a common heritage and destiny. VeritasKWD seeks to promote nationhood by championing “No Kenyan Left Behind” irrespective of their race, tribe, creed, religion, age, and gender.
                    </div> */}
                </div>

                <div className="max-w-[78rem] mx-auto p-6 mt-0 flex justify-center items-center">
                    <div className="border shadow-1 rounded-lg p-4 w-full max-w-2xl">
                        <form className="grid grid-cols-1 gap-2" onSubmit={formik.handleSubmit}>
                            {/* Name */}
                            <div className="mb-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.name && formik.touched.name && (
                                    <p className="text-sm text-red-500">{formik.errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="mb-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                    Email
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
                            <div className="mb-2">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    name="message"
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.message && formik.touched.message && (
                                    <p className="text-sm text-red-500">{formik.errors.message}</p>
                                )}
                            </div>

                            {/* Attachment */}
                            <div className="mb-2">
                                <label htmlFor="attachment" className="block text-sm font-medium text-gray-900">
                                    Attachment (PDF only)
                                </label>
                                <input
                                    id="attachment"
                                    name="attachment"
                                    type="file"
                                    accept=".jpg, .jpeg, .png, .pdf"
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    onChange={(event) => {
                                        formik.setFieldValue("attachment", event.currentTarget.files[0]);
                                    }}
                                />
                                {formik.errors.attachment && formik.touched.attachment && (
                                    <p className="text-sm text-red-500">{formik.errors.attachment}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            {isLoading ? (
                                <div className="flex justify-center">
                                    <InfinitySpin width={150} color="green" />
                                </div>
                            ) : (
                                <div className="text-center mt-0">
                                    <Button type="submit" color="gradient" variant="solid" className="inline-block text-white">
                                        Submit
                                    </Button>
                                </div>
                            )}

                        </form>
                    </div>
                </div>


            </div>
            <FooterHeader />
        </>

    );
}

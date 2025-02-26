import {
    PencilSquareIcon,
    MapPinIcon,
    UserCircleIcon,
    EnvelopeOpenIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import { InfinitySpin, RotatingLines } from "react-loader-spinner";
import userLogo from "../../assets/user.jpeg";
import { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../axiosInstance";
import { useParams } from "react-router-dom";
import app_vars from "../../config";
import { ViewProfileSkeleton } from "../../Components/ViewProfileSkeleton";
import { Button } from "../../Components/Button";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useDropdownContext } from "../../DropdownProvider";
import { toast } from "sonner";
import { EditProfileSkeleton } from "../../Components/EditProfileSkeleton";
export default function EditEmployer() {
    const dropDownValues = useDropdownContext();
    const user_id = localStorage.user_id;
    const [data, setData] = useState()
    const [tableLoader, setTableLoader] = useState(false);
    const id = useParams();
    const fetchData = async () => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`api/employer_company_profile?user_id=${id?.id}`);
            if (response) {
                setData(response.data[0])
                localStorage.setItem("company_id", response.data[0]?.id)
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            // company_name: data?.company_name || '',
            company_industry: data?.company_industry || "",
            location: data?.location || "",
            contact_person_name: data?.contact_person_name || "",
            contact_number: data?.contact_number || "",
            contact_email: data?.contact_email || "",
            logo: data?.logo || null,
            description: data?.description || "",
            user_id: id?.id,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            // company_name: Yup.string().required("Company name is required"),
            company_industry: Yup.string().required("Company_industry is required"),
            location: Yup.string().required("Location is required"),
            contact_person_name: Yup.string().required("Contact person name is required"),
            contact_email: Yup.string().email("Invalid email format").required("Email is required"),
            logo: Yup.mixed().nullable(),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            setLoading(true);
            for (const key in values) {
                formData.append(key, values[key]);
            }
            if (data) {
                try {
                    const response = await axiosInstance.post(`api/employer_company_profile/update/${data?.id}`, formData);
                    if (response) {
                        toast.success("Personal Information Saved")
                        formik.resetForm();
                    }
                } catch (error) {
                    handleError(error);
                } finally {
                    fetchData()
                    setLoading(false);
                }
            } else {
                try {
                    const response = await axiosInstance.post(`api/employer_company_profile/store`, formData);
                    if (response) {
                        toast.success("Personal Information Saved")
                        formik.resetForm();
                    }
                } catch (error) {
                    handleError(error);
                } finally {
                    fetchData()
                    setLoading(false);
                }
            }
        },
    });
    return (
        <div className="flex justify-center px-4 sm:px-6 lg:px-8 min-h-[33rem] bg-gray-100 mt-4">
            <div className="p-6 w-full max-w-5xl bg-white rounded-lg">
                <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="font-bold text-xl text-[#ff0000]">Update Employer Profile</h3>
                </div>
                {tableLoader ? <EditProfileSkeleton /> :
                    <div className="mt-6">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-1">
                                    <label
                                        htmlFor="company_name"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Company Name *
                                    </label>
                                    <input
                                        id="company_name"
                                        name="company_name"
                                        type="text"
                                        disabled="true"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={data?.user_id?.name}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.touched.company_name && formik.errors.company_name && (
                                        <div className="text-red-500 text-sm">{formik.errors.company_name}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="company_industry" className="block text-sm font-medium text-gray-900">
                                        Industry *
                                    </label>
                                    <select
                                        name="company_industry"
                                        // onChange={(e) => handleChange(e, item)}
                                        // value={formik.values.job_type}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.company_industry}
                                        // value={item?.job_status_id?.id}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    >
                                        <option value="">Select</option>
                                        {dropDownValues?.industries?.map((item) => {
                                            return (
                                                <option key={item.id} value={item?.id}>
                                                    {item?.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-900">
                                        Location *
                                    </label>
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.location}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.touched.location && formik.errors.location && (
                                        <div className="text-red-500 text-sm">{formik.errors.location}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="contact_person_name" className="block text-sm font-medium text-gray-900">
                                        Contact Person Name *
                                    </label>
                                    <input
                                        id="contact_person_name"
                                        name="contact_person_name"
                                        type="text"
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.contact_person_name}
                                    />
                                    {formik.touched.contact_person_name && formik.errors.contact_person_name && (
                                        <div className="text-red-500 text-sm">{formik.errors.contact_person_name}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="contact_number" className="block text-sm font-medium text-gray-900">
                                        Phone Number *
                                    </label>
                                    <input
                                        id="contact_number"
                                        name="contact_number"
                                        type="text"
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.contact_number}
                                    />
                                    {formik.touched.contact_number && formik.errors.contact_number && (
                                        <div className="text-red-500 text-sm">{formik.errors.contact_number}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="contact_email" className="block text-sm font-medium text-gray-900">
                                        Email *
                                    </label>
                                    <input
                                        id="contact_email"
                                        name="contact_email"
                                        type="contact_email"
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.contact_email}
                                    />
                                    {formik.touched.contact_email && formik.errors.contact_email && (
                                        <div className="text-red-500 text-sm">{formik.errors.contact_email}</div>
                                    )}
                                </div>

                                {/* Logo Input Field */}
                                <div>
                                    <label htmlFor="logo" className="block text-sm font-medium text-gray-900">
                                        Logo (Upload Image)
                                    </label>
                                    <input
                                        id="logo"
                                        name="logo"
                                        type="file"
                                        onChange={(event) => formik.setFieldValue("logo", event.currentTarget.files[0])}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.logo && (
                                        <div className="text-red-500 text-sm">{formik.errors.logo}</div>
                                    )}
                                </div>

                                {/* Company Description Field */}
                                <div className="col-span-full">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
                                    <ReactQuill
                                        id="description"
                                        theme="snow"
                                        value={formik.values.description}
                                        onChange={(value) => formik.setFieldValue("description", value)}
                                        style={{ height: "150px" }}
                                        modules={{
                                            toolbar: [
                                                ["bold", "italic", "underline", "strike"],
                                                [{ header: [1, 2, 3, false] }],
                                                [{ list: "ordered" }, { list: "bullet" }],
                                                ["clean"],
                                            ],
                                        }}
                                        formats={["header", "bold", "italic", "underline", "strike", "list", "bullet"]}
                                        placeholder="Write something"
                                    />
                                </div>
                            </div>
                            {loading ? <div className="flex justify-center mr-5 sm:mt-18 mt-25"><InfinitySpin width={150} color="green" /></div> :
                                <div className="flex justify-center gap-4 sm:mt-15 mt-25">
                                    <Button
                                        type="button"
                                        color="gradient"
                                        variant="outline"
                                    // onClick={() => setEditProfile(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        color="gradient"
                                        variant="solid"
                                        className="text-white"
                                    >
                                        Update
                                    </Button>
                                </div>
                            }
                        </form>
                    </div>
                }
            </div>
        </div>
    );
}

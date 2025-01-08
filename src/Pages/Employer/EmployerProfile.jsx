import { MinusIcon, PlusIcon, PencilIcon, TrashIcon, PlusCircleIcon, MapIcon, MapPinIcon, CalendarDaysIcon, EyeIcon, PencilSquareIcon, UserCircleIcon, EnvelopeOpenIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../Components/Button";
import userLogo from '../../assets/user.jpeg'
import ReactQuill from "react-quill";
import axiosInstance, { handleError } from "../../axiosInstance";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { InfinitySpin, RotatingLines } from "react-loader-spinner";
import app_vars from "../../config";
import { Skeleton } from "../../Components/Skeleton";
import { useDropdownContext } from "../../DropdownProvider";
export default function EmployerProfile() {
    const [tableLoader, setTableLoader] = useState(false);
    const [profileCollapsed, setprofileCollapsed] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleCollapseToggle = () => {
        setprofileCollapsed(!profileCollapsed);
        if (!profileCollapsed) {
            setEditProfile(false);
        }
    };
    const [value, setValue] = useState("");
    const parser = new DOMParser();
    const [data, setData] = useState();
    const user_id = localStorage.user_id;
    const fileInputRef = useRef(null);
    const handleIconClick = () => {
        fileInputRef.current.click();
    };
    const dropDownValues = useDropdownContext();
    const formik = useFormik({
        initialValues: {
            company_name: data?.company_name || '',
            company_industry: data?.company_industry || "",
            location: data?.location || "",
            contact_person_name: data?.contact_person_name || "",
            contact_number: data?.contact_number || "",
            contact_email: data?.contact_email || "",
            logo: data?.logo || null,
            description: data?.description || "",
            user_id: user_id,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            company_name: Yup.string().required("Company name is required"),
            company_industry: Yup.string().required("Company_industry is required"),
            location: Yup.string().required("Location is required"),
            contact_person_name: Yup.string().required("Contact person name is required"),
            // contact_number: Yup.string()
            //     .required("Phone number is required")
            //     .matches(/^[0-9]{11}$/, "Phone number must be 11 digits"),
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
                    setEditProfile(false);
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
                    setEditProfile(false);
                    fetchData()
                    setLoading(false);
                }
            }
        },
    });
    const fetchData = async () => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`api/employer_company_profile?user_id=${user_id}`);
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
    const [image, setImage] = useState(localStorage.user_image);
    const [imageLoader, setImageLoader] = useState(false);
    const handleFileChange = async (event) => {
        setImageLoader(true);
        const file = event.currentTarget.files[0];
        const formData = new FormData();
        formData.append("row_id", user_id);
        formData.append("user_image", file);
        try {
            const response = await axiosInstance.post(`/api/job_seeker_basic_info/upload_user_image`, formData);
            if (response) {
                toast.success("Profile Picture Saved")
                getProfilePic();
            }
        } catch (error) {
            handleError(error);
        }
    };
    const getProfilePic = async () => {
        try {
            const response = await axiosInstance.get(`/api/get_user_image`);
            if (response) {
                setImage(response?.data)
                localStorage.setItem("user_image", response?.data)
            }
        } catch (error) {
            handleError(error);
        } finally {
            setImageLoader(false);
            window.location?.reload();
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className="flex justify-center px-4 sm:px-6 lg:px-8 min-h-screen">
                <div className="p-4 w-full max-w-5xl rounded-lg">
                    <div className={`border rounded-lg shadow-lg ${profileCollapsed ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-start p-4 border-b cursor-pointer bg-white rounded-lg"
                            onClick={handleCollapseToggle}
                        >
                            <h3 className="py-2.5 font-bold text-xl text-[#ff0000]">{localStorage.role_id == 3 ? "Employee Profile" : "Company Profile"}</h3>
                        </div>

                        {/* Card Body */}
                        <div className={`overflow-x-hidden bg-white relative transition-all duration-300 ease-in-out ${profileCollapsed ? "max-h-0 p-0" : "max-h-screen p-4 sm:p-6"}`}>
                            {tableLoader ? <Skeleton /> :
                                <> {(!editProfile && !profileCollapsed) && (
                                    <button
                                        type="button"
                                        onClick={() => setEditProfile(true)}
                                        className="absolute right-4 top-4 bg-white hover:bg-white rounded-full p-2 focus:outline-none transition-colors"
                                    >
                                        <PencilIcon className="h-5 w-5 text-blue-500" />
                                    </button>
                                )
                                }

                                    {!editProfile && (
                                        data ? (
                                            <>
                                                <div className="flex flex-col sm:flex-row gap-6 items-center">
                                                    <div className="relative group">
                                                        {imageLoader ? (
                                                            <div className='p-4'><RotatingLines height="70"
                                                                width="70"
                                                                color="green" />
                                                            </div>
                                                        ) : (
                                                            <img
                                                                src={
                                                                    data?.logo &&
                                                                        data?.logo !== 'undefined' &&
                                                                        data?.logo !== 'null'
                                                                        ? `${app_vars?.domain?.fileURL}${data?.logo}`
                                                                        : userLogo
                                                                }
                                                                alt="User Profile"
                                                                className="h-28 w-28 rounded-full"
                                                            />
                                                        )}


                                                        {/* Pencil Icon on Hover */}
                                                        {/* <div onClick={handleIconClick} className="absolute bottom-5 right-8 translate-x-1/2 translate-y-1/2 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                            <PencilSquareIcon className="h-5 w-5 text-blue-500" />
                                                        </div>
                                                        <input
                                                            type="file"
                                                            ref={fileInputRef}
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={handleFileChange}
                                                        /> */}
                                                    </div>
                                                    <div className="text-center sm:text-left">
                                                        <strong className="text-sm text-gray-600">{data?.company_name}</strong>
                                                        <h1 className="font-semibold text-xl sm:text-2xl">{data?.company_name}</h1>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-10 mt-4">
                                                    <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                                                        <MapPinIcon className="w-5 h-5" />
                                                        {data?.location}
                                                    </p>
                                                    <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                                                        <UserCircleIcon className="w-5 h-5" />
                                                        {data?.contact_person_name}
                                                    </p>
                                                    <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                                                        <EnvelopeOpenIcon className="w-5 h-5" />
                                                        {data?.contact_email}
                                                    </p>
                                                    <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                                                        <PhoneIcon className="w-5 h-5" />
                                                        {data?.contact_number}
                                                    </p>
                                                </div>

                                                <div className="mt-6 border-t pt-4">
                                                    <label className="block font-semibold">Description</label>
                                                    <p className="text-sm text-gray-600 mt-2">
                                                        {parser.parseFromString(data?.description, "text/html").body.textContent.trim()}
                                                    </p>
                                                </div>

                                                {/* <div className="mt-6 border-t pt-4">
                                                    <label className="block font-semibold">Required Skills</label>
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                                                        {["JavaScript", "Reactjs", "Nextjs", "PHP", "HTML", "CSS", "Bootstrap"].map((skill) => (
                                                            <span key={skill} className="bg-red-100 p-2 rounded text-center text-sm">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="mt-6 border-t pt-4">
                                                    <label className="block font-semibold">Tags</label>
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                                                        {["Machine Learning", "Virtual Assistant", "AI Chatbot"].map((tag) => (
                                                            <span key={tag} className="bg-red-100 p-2 rounded text-center text-sm">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div> */}
                                            </>
                                        ) : (
                                            <div>Profile Information not added yet</div>
                                        )
                                    )
                                    }
                                </>
                            }


                            {/* Edit Profile Form */}
                            {editProfile && (
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
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.company_name}
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
                                                {dropDownValues?.job_family?.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item?.id}>
                                                            {item?.job_family}
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
                                        {/* <div>
                                            <label htmlFor="verification_status" className="block text-sm font-medium text-gray-900">
                                                Verification Status *
                                            </label>
                                            <select
                                                id="verification_status"
                                                name="verification_status"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            >
                                                <option>Verified</option>
                                                <option>Unverified</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="date_of_registration" className="block text-sm font-medium text-gray-900">
                                                Date of Registration *
                                            </label>
                                            <input
                                                id="date_of_registration"
                                                name="date_of_registration"
                                                type="date"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-900">
                                                Status *
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            >
                                                <option>Active</option>
                                                <option>Inactive</option>
                                            </select>
                                        </div> */}

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
                                        {/* <div className="col-span-full">
                                            <label htmlFor="company_description" className="block text-sm font-medium text-gray-900">
                                                Company Description
                                            </label>
                                            <textarea
                                                id="company_description"
                                                name="company_description"
                                                rows={4}
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div> */}
                                    </div>
                                    {loading ? <div className="flex justify-center mr-5 mt-18"><InfinitySpin width={150} color="green" /></div> :
                                        <div className="flex justify-center gap-4 mt-15">
                                            <Button
                                                type="button"
                                                color="gradient"
                                                variant="outline"
                                                onClick={() => setEditProfile(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                color="gradient"
                                                variant="solid"
                                                className="text-white"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    }
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
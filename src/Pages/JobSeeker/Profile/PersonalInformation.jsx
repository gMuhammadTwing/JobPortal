import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MinusIcon, PlusIcon, PencilIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "../../../Components/Button";
import userLogo from '../../../assets/user.jpeg';
import ReactQuill from "react-quill";
import { toast } from 'sonner';
import axiosInstance, { handleError } from '../../../axiosInstance';
import { Grid, InfinitySpin, RotatingLines } from 'react-loader-spinner';
import { useRef } from 'react';
import app_vars from '../../../config';
export default function PersonalInformation() {
    const [profileCollapsed, setProfileCollapsed] = useState(false);
    const [editProfile, setEditProfile] = useState(false);

    const handleCollapseToggle = () => {
        setProfileCollapsed(!profileCollapsed);
        if (!profileCollapsed) {
            setEditProfile(false);
        }
    };
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const user_id = localStorage.user_id;
    const formik = useFormik({
        initialValues: {
            father_name: data?.data[0]?.father_name,
            dob: data?.data[0]?.dob,
            gender: data?.data[0]?.gender,
            contact_number: data?.data[0]?.contact_number,
            years_experience: data?.data[0]?.years_experience,
            expected_salary: data?.data[0]?.expected_salary,
            address: data?.data[0]?.address,
            user_id: user_id,

        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            father_name: Yup.string().required("Father's Name is required"),
            dob: Yup.date().required("Date of Birth is required"),
            gender: Yup.string().required("Gender is required"),
            contact_number: Yup.string().required("Contact_number is required"),
            years_experience: Yup.string().required("Years_experience is required"),
            expected_salary: Yup.string().required("Expected Salary is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            if (data) {
                try {
                    const response = await axiosInstance.post(`api/job_seeker_basic_info/update/${data?.data?.id}`, values);
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
                    const response = await axiosInstance.post(`api/job_seeker_basic_info/store`, values);
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
        try {
            const response = await axiosInstance.get(`api/job_seeker_basic_info?user_id=${user_id}`);
            if (response) {
                setData(response)
            }
        } catch (error) {
            handleError(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const fileInputRef = useRef(null);
    // const imageFormik = useFormik({
    //     initialValues: {
    //         profileImage: null,
    //     },
    //     onSubmit: (values) => {
    //         console.log(values.profileImage);
    //     },
    // });

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

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
        //  finally {
        //     setEditProfile(false);
        //     fetchData()
        //     setLoading(false);
        // }
    };
    const getProfilePic = async () => {
        try {
            const response = await axiosInstance.get(`/api/get_user_image`);
            if (response) {
                setImage(response?.data)
                localStorage.setItem("user_image",response?.data)
            }
        } catch (error) {
            handleError(error);
        }finally{
            setImageLoader(false);
            window.location?.reload();
        }
    };

    return (
        <div className="flex justify-center sm:px-0">
            <div className="p-4 w-full max-w-5xl">
                <div className={`border rounded-md shadow-lg ${profileCollapsed ? "overflow-hidden" : ""}`}>
                    {/* Header Section */}
                    <div
                        className="flex justify-between items-center p-4 border-b cursor-pointer text-orange-600 bg-white"
                        onClick={handleCollapseToggle}
                    >
                        <h3 className="font-bold text-xl">Personal Information</h3>
                        <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                            {profileCollapsed ? (
                                <PlusIcon className="block h-6 w-6 text-blue-500 hover:scale-[160%] duration-300" />
                            ) : (
                                <MinusIcon className="block h-6 w-6 text-red hover:scale-[160%] duration-300" />
                            )}
                        </button>
                    </div>

                    {/* Card Body */}
                    <div className={`overflow-x-hidden bg-white relative transition-all duration-300 ease-in-out ${profileCollapsed ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                        {!editProfile && !profileCollapsed && (
                            <button
                                type="button"
                                onClick={() => setEditProfile(true)}
                                className="absolute right-4 hover:bg-white rounded-full p-2 focus:outline-none transition-colors"
                            >
                                <PencilIcon className="h-5 w-5 text-blue-500" />
                            </button>
                        )}

                        {!editProfile && (
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
                                                localStorage?.user_image &&
                                                    localStorage.user_image !== 'undefined' &&
                                                    localStorage.user_image !== 'null' &&
                                                    localStorage.user_image.trim() !== ''
                                                    ? `${app_vars?.domain?.fileURL}${image}`
                                                    : userLogo
                                            }
                                            alt="User Profile"
                                            className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-2 border-white"
                                        />
                                    )}


                                    {/* Pencil Icon on Hover */}
                                    {/* <form onSubmit={imageFormik.handleSubmit}> */}
                                    <div onClick={handleIconClick} className="absolute bottom-5 right-8 translate-x-1/2 translate-y-1/2 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <PencilSquareIcon className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <div className="text-center sm:text-left">
                                    <h4 className="font-semibold text-lg">{localStorage.user_name}</h4>
                                    <p className="text-sm text-gray-600">{localStorage.email}</p>
                                    <p className="text-sm text-gray-600">{data?.contact_number}</p>
                                    <p className="text-sm text-gray-600">{data?.address}</p>
                                </div>
                            </div>
                        )}
                        {/* Edit Profile Form */}
                        {editProfile && (
                            <form onSubmit={formik.handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label htmlFor="father_name" className="block text-sm font-medium text-gray-900">Father's Name</label>
                                        <input
                                            id="father_name"
                                            name="father_name"
                                            type="text"
                                            value={formik.values.father_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        />
                                        {formik.touched.father_name && formik.errors.father_name && (
                                            <div className="text-red-600 text-sm">{formik.errors.father_name}</div>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="dob" className="block text-sm font-medium text-gray-900">Date of Birth</label>
                                        <input
                                            id="dob"
                                            name="dob"
                                            type="date"
                                            value={formik.values.dob}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        />
                                        {formik.touched.dob && formik.errors.dob && (
                                            <div className="text-red-600 text-sm">{formik.errors.dob}</div>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="gender" className="block text-sm font-medium text-gray-900">Gender</label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={formik.values.gender}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        >
                                            <option value={""}>Select</option>
                                            <option value={1}>Male</option>
                                            <option value={2}>Female</option>
                                            <option value={3}>Other</option>
                                        </select>
                                        {formik.touched.gender && formik.errors.gender && (
                                            <div className="text-red-600 text-sm">{formik.errors.gender}</div>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="contact_number" className="block text-sm font-medium text-gray-900">Contact_number</label>
                                        <input
                                            id="contact_number"
                                            name="contact_number"
                                            type="text"
                                            value={formik.values.contact_number}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        />
                                        {formik.touched.contact_number && formik.errors.contact_number && (
                                            <div className="text-red-600 text-sm">{formik.errors.contact_number}</div>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="years_experience" className="block text-sm font-medium text-gray-900">Years_experience</label>
                                        <input
                                            id="years_experience"
                                            name="years_experience"
                                            type="text"
                                            value={formik.values.years_experience}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        />
                                        {formik.touched.years_experience && formik.errors.years_experience && (
                                            <div className="text-red-600 text-sm">{formik.errors.years_experience}</div>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="expected_salary" className="block text-sm font-medium text-gray-900">Expected Salary</label>
                                        <input
                                            id="expected_salary"
                                            name="expected_salary"
                                            type="text"
                                            value={formik.values.expected_salary}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                        />
                                        {formik.touched.expected_salary && formik.errors.expected_salary && (
                                            <div className="text-red-600 text-sm">{formik.errors.expected_salary}</div>
                                        )}
                                    </div>
                                    <div className='col-span-full'>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-900">Postal Address</label>
                                        <ReactQuill
                                            id="address"
                                            theme="snow"
                                            value={formik.values.address}
                                            onBlur={formik.handleBlur}
                                            onChange={(value) => formik.setFieldValue("address", value)}
                                            style={{
                                                height: "150px",
                                            }}
                                            modules={{
                                                toolbar: [
                                                    ["bold", "italic", "underline", "strike"],
                                                    [{ header: [1, 2, 3, false] }],
                                                    [{ list: "ordered" }, { list: "bullet" }],
                                                    ["clean"],
                                                ],
                                            }}
                                            formats={[
                                                "header",
                                                "bold",
                                                "italic",
                                                "underline",
                                                "strike",
                                                "list",
                                                "bullet",
                                            ]}
                                            placeholder="Write something"
                                        />
                                        {formik.touched.address && formik.errors.address && (
                                            <div className="text-red-600 text-sm">{formik.errors.address}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-center gap-4 mt-17">
                                    {loading ? <div className="flex justify-center mr-5"><InfinitySpin width={150} color="green" /></div> :
                                        <>
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
                                        </>
                                    }
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

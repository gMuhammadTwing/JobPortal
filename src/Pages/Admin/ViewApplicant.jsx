import {
    PencilSquareIcon,
    MapPinIcon,
    UserCircleIcon,
    EnvelopeOpenIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import userLogo from "../../assets/user.jpeg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance, { handleError } from "../../axiosInstance";
import { ViewProfileSkeleton } from "../../Components/ViewProfileSkeleton";
import app_vars from "../../config";

export default function ViewApplicant() {
    const [data, setData] = useState();
    const id = useParams();
    const [loader, setLoader] = useState(false);
    const fetchData = async () => {
        setLoader(true)
        try {
            const response = await axiosInstance.get(`api/job_seeker_basic_info?user_id=${id?.id}`);
            if (response) {
                setData(response)
                console.log(response?.data);

            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoader(false)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="flex justify-center px-4 sm:px-6 lg:px-8 bg-gray-100 mt-4 min-h-[33rem]">
            <div className="p-6 w-full max-w-5xl bg-white rounded-lg">
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="font-bold text-xl text-[#ff0000]">View Applicant Profile</h3>
                </div>

                {/* Profile Section */}
                {loader ? <ViewProfileSkeleton /> :
                    <div className="mt-6">
                        {data?.data.length > 0 ?
                            <>
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    {/* Profile Picture */}
                                    <div className="relative">
                                        <img
                                            src={app_vars?.domain?.fileURL + data?.data[0]?.user_id?.user_image}
                                            alt="Applicant Profile"
                                            className="h-32 w-32 rounded-lg"
                                        />
                                    </div>

                                    {/* Applicant Details */}
                                    <div className="text-center sm:text-left">
                                        <h4 className="font-semibold text-xl text-gray-800">
                                            Name: {data?.data[0]?.user_id?.unique_name || "NA"}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium text-gray-700">Email:</span> {data?.data[0]?.user_id?.email || "NA"}
                                        </p>
                                        {/* <p className="text-sm text-gray-600">
                                            <span className="font-medium text-gray-700">Phone:</span> {data?.data[0]?.user_id?.phone || "NA"}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium text-gray-700">Address:</span> {data?.data[0]?.user_id?.name || "NA"}
                                        </p> */}
                                    </div>
                                </div>

                                {/* Grid Section */}
                                <div className="mt-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div>
                                            <h3 className="font-bold text-gray-700">Father's Name</h3>
                                            <p className="text-sm text-gray-600">{data?.data[0]?.father_name || "NA"}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-700">Date of Birth</h3>
                                            <p className="text-sm text-gray-600">{data?.data[0]?.dob || "NA"}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-700">Gender</h3>
                                            <p className="text-sm text-gray-600">{data?.data[0]?.gender_label || "NA"}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-700">Occupation</h3>
                                            <p className="text-sm text-gray-600">
                                                {data?.data[0]?.occupation?.occupation || "NA"}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-700">Years of Experience</h3>
                                            <p className="text-sm text-gray-600">{data?.data[0]?.years_experience || "NA"}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-700">Expected Salary</h3>
                                            <p className="text-sm text-gray-600">{data?.data[0]?.expected_salary || "NA"}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <div>No Data Available</div>
                        }
                    </div>
                }
            </div>
        </div>
    );
}

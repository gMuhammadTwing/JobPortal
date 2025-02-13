import {
    PencilSquareIcon,
    MapPinIcon,
    UserCircleIcon,
    EnvelopeOpenIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import { RotatingLines } from "react-loader-spinner";
import userLogo from "../../assets/user.jpeg";
import { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../axiosInstance";
import { useParams } from "react-router-dom";
import app_vars from "../../config";
import { ViewProfileSkeleton } from "../../Components/ViewProfileSkeleton";

export default function ViewEmployer() {

    const [data, setData] = useState()
    const id = useParams();
    const [loader, setLoader] = useState(false);
    const fetchData = async () => {
        setLoader(true)
        try {
            const response = await axiosInstance.get(`api/employer_company_profile?user_id=${id?.id}`);
            if (response) {
                setData(response?.data[0])
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
        <div className="flex justify-center px-4 sm:px-6 lg:px-8 min-h-[33rem] bg-gray-100 mt-4">
            <div className="p-6 w-full max-w-5xl bg-white rounded-lg">
                <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="font-bold text-xl text-[#ff0000]">View Employer Profile</h3>
                </div>
                {loader ? <ViewProfileSkeleton /> :
                    <div className="mt-6">
                        {/* {data ? ( */}
                            <>
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    {/* Profile Picture */}
                                    <div className="relative group">
                                        <img
                                            src={
                                                data?.logo?
                                                (app_vars?.domain?.fileURL + data?.logo) :
                                                userLogo
                                            }
                                            alt="Company Logo"
                                            className="h-32 w-32 rounded-lg"
                                        />
                                        {/* Pencil Icon */}


                                    </div>

                                    {/* Employer Details */}
                                    <div className="text-center sm:text-left">
                                        <strong className="text-sm text-gray-600 block">
                                            {data?.user_id?.name}
                                        </strong>
                                        <h1 className="font-semibold text-2xl">{data?.user_id?.name}</h1>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-10 mt-6">
                                    <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                                        <MapPinIcon className="w-5 h-5" />
                                        {data?.location || "NA"}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                                        <UserCircleIcon className="w-5 h-5" />
                                        {data?.contact_person_name || "N/A"}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                                        <EnvelopeOpenIcon className="w-5 h-5" />
                                        {data?.contact_email || "N/A"}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                                        <PhoneIcon className="w-5 h-5" />
                                        {data?.contact_number || "N/A"}
                                    </p>
                                </div>

                                {/* Description Section */}
                                <div className="mt-6 border-t pt-4">
                                    <label className="block font-semibold text-gray-800">Description</label>
                                    <div>
                                        {data?.description ? (
                                            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                                        ) : (
                                            <p>NA</p>
                                        )}
                                    </div>
                                </div>
                            </>
                        {/* ) :
                            <div>No Data Available</div>
                        } */}
                    </div>
                }
            </div>
        </div>
    );
}

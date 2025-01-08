import { MinusIcon, PlusIcon, PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "../../../Components/Skeleton";
export default function Education() {
    const [Education, setEducation] = useState(true);
    const [editEducation, setEditEducation] = useState(false);
    const handleEducation = () => {
        setEducation(!Education);
        if (!Education) {
            setEditEducation(false);
        }
    };

    const [data, setData] = useState();
    const param = useParams();
    const [tableLoader, setTableLoader] = useState(false);

    const fetchData = async () => {
        setTableLoader(true)
        try {
            const response = await axiosInstance.get(`api/job_seeker_education_institute?user_id=${param?.id}`);
            if (response) {
                setData(response?.data)
            }
        } catch (error) {
            handleError(error);
        } finally {
            setEditEducation(false);
            setTableLoader(false);
        }
    }


    return (
        <>
            <div className="flex justify-center sm:px-0">
                <div className="p-4 w-full max-w-[66rem]">
                    <div className={`border rounded-md shadow-lg ${Education ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 border-b cursor-pointer text-[#ff0000] bg-white"
                            onClick={() => {
                                handleEducation();
                                fetchData();
                            }}
                        >
                            <h3 className="font-bold text-xl">Education</h3>

                        </div>

                        {/* Card Body */}
                        <div className={`relative space-y-2 overflow-x-hidden bg-white transition-all duration-300 ease-in-out ${Education ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {/* Edit Button in Body */}


                            {/* Profile Information */}
                            {tableLoader ? (
                                <Skeleton />
                            ) : (
                                <>
                                    {!editEducation && !Education && (
                                        (data?.length > 0 ? (
                                            data.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-col sm:flex-row sm:justify-between p-4 sm:items-center relative"
                                                >

                                                    {/* Education Information */}
                                                    <div className="flex flex-col gap-1">
                                                        <h4 className="font-semibold text-lg">{item?.institute}</h4>
                                                        <p className="text-gray-700">
                                                            Degree: {item?.degree_title}
                                                        </p>
                                                        <p className="text-gray-700">
                                                            From: {item?.year_from} To {item?.year_to}
                                                        </p>
                                                        <p className="text-gray-600">
                                                            Grade Obtained: {item?.obtained_grade}
                                                        </p>
                                                    </div>
                                                </div>

                                            ))
                                        ) : (
                                            <div>No Educations have been added yet</div>
                                        ))
                                    )}



                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

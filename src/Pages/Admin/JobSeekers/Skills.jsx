import { MinusIcon, PlusIcon, PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { InfinitySpin } from "react-loader-spinner";
import { Button } from "../../../Components/Button";
import { Skeleton } from "../../../Components/Skeleton";
import { useParams } from "react-router-dom";
export default function Skills() {
    const param = useParams();
    const [skill, setSkill] = useState(true);
    const [editSkill, setEditSkill] = useState(false);
    const handleSkill = () => {
        setSkill(!skill);
        if (!skill) {
            setEditSkill(false);
        }
    };
    const [data, setData] = useState();
    const [loader, setLoader] = useState(false);
    const fetchData = async () => {
        setLoader(true)
        try {
            const response = await axiosInstance.get(`api/job_seeker_skills?user_id=${param?.id}`);
            if (response) {
                setData(response?.data)
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoader(false);
            setEditSkill(false);
        }
    }
    return (
        <>
            <div className="flex justify-center sm:px-0">
                <div className="p-4 w-full max-w-[66rem]">
                    <div className={`border rounded-md shadow-lg ${skill ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 text-[#ff0000] bg-white border-b cursor-pointer"
                            onClick={() => {
                                handleSkill();
                                fetchData();
                            }}
                        >
                            <h3 className="font-bold text-xl">Skills</h3>
                        </div>

                        {/* Card Body */}
                        <div className={`relative space-y-2 overflow-x-hidden bg-white transition-all duration-300 ease-in-out ${skill ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {/* Edit Button in Body */}

                            {loader ? (
                                <Skeleton />
                            ) : (
                                <>
                                    {(!editSkill && !skill) && (
                                        data?.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {data.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="relative border p-2 rounded-md shadow-sm hover:bg-gray-50 group transition-colors"
                                                    >
                                                        {/* Skill Information */}
                                                        {!editSkill && (
                                                            <div>
                                                                <h4 className="font-semibold text-lg inline-block">{item?.skill}</h4>
                                                                <span className="text-sm text-gray-600"> ({item?.skill_experience_label})</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                        ) : (
                                            <div>No Skills have been added yet</div>
                                        )
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
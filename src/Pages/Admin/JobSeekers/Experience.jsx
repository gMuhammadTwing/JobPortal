import { MinusIcon, PlusIcon, PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "../../../Components/Button";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { toast } from "sonner";
import { InfinitySpin } from "react-loader-spinner";
import DeleteModal from "../../../Components/DeleteModal";
import { LoaderTable } from "../../../Components/LoaderTable";
import { Skeleton } from "../../../Components/Skeleton";
import { useParams } from "react-router-dom";
export default function Experience() {
    const param = useParams();
    const [exp, setExp] = useState(true);
    const [editExp, setEditExp] = useState(false);
    const handleExp = () => {
        setExp(!exp);
        if (!exp) {
            setEditExp(false);
        }
    };
    const [data, setData] = useState();
    const [tableLoader, setTableLoader] = useState(false);
    const [updateData, setUpdateData] = useState(null)
    
    const fetchData = async () => {
        setTableLoader(true)
        try {
            const response = await axiosInstance.get(`api/job_seeker_experience?user_id=${param?.id}`);
            if (response) {
                setData(response?.data)
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
        }
    }
    return (
        <>
            <div className="flex justify-center sm:px-0">
                <div className="p-4 w-full max-w-[66rem]">
                    <div className={`border rounded-md shadow-lg ${exp ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 text-[#ff0000] bg-white border-b cursor-pointer"
                            onClick={() => {
                                handleExp()
                                fetchData();
                            }}
                        >
                            <h3 className="font-bold text-xl">Experience</h3>
                        </div>

                        {/* Card Body */}
                        <div className={`relative space-y-7 overflow-x-hidden bg-white transition-all duration-300 ease-in-out ${exp ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {/* Edit Button in Body */}
                            {tableLoader ? (
                                <Skeleton />
                            ) : (
                                <>
                                    {!editExp && !exp && (
                                        data?.length > 0 ? (
                                            data.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="p-3 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center relative"
                                                >
                                                    {/* Profile Information */}
                                                    {!editExp && (
                                                        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 sm:items-center">
                                                            {/* Job Details */}
                                                            <div>
                                                                <h4 className="font-semibold text-lg">{item?.job_title}</h4>
                                                                <p className="text-sm text-gray-600">
                                                                    {item?.company} - {item?.industry}
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    {item?.start_date} - {item?.currently_working_here ? "Present" : item?.end_date} | {item?.location}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                            ))
                                        ) : (
                                            <div>No Experiences have been added yet</div>
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
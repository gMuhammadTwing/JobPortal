import { MinusIcon, PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
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
export default function Projects() {
    const param = useParams();
    const [Project, setProject] = useState(true);
    const [editProject, setEditProject] = useState(false);
    const parser = new DOMParser();
    const handleProject = () => {
        setProject(!Project);
        if (!Project) {
            setEditProject(false);
        }
    };
    const [value, setValue] = useState("");
    const [data, setData] = useState();
    const [updateData, setUpdateData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [tableLoader, setTableLoader] = useState(false);
    const fetchData = async () => {
        setTableLoader(true)
        try {
            const response = await axiosInstance.get(`api/job_seeker_project?user_id=${param?.id}`);
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
                    <div className={`border rounded-md shadow-lg ${Project ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 border-b cursor-pointer text-[#ff0000] bg-white"
                            onClick={() => {
                                handleProject();
                                fetchData();
                            }}
                        >
                            <h3 className="font-bold text-xl">Projects</h3>
                            
                        </div>

                        {/* Card Body */}
                        <div className={`overflow-x-hidden bg-white relative transition-all duration-300 ease-in-out ${Project ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {/* Icons at Top-Right */}
                            {/* {(!editProject && !Project) && (
                                
                            )} */}
                            {tableLoader ? (
                                <Skeleton />
                            ) : (
                                <>
                                    {/* Profile Information */}
                                    {!editProject && (
                                        data?.length > 0 ? (
                                            data.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-col sm:flex-row sm:justify-between gap-4 p-2 sm:items-center relative"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div>
                                                            <div className="flex justify-between items-center">
                                                                <h4 className="font-semibold text-lg">Project Title: {item?.project_name}</h4>
                                                            </div>
                                                            <a href={item?.project_url} target="_blank"
                                                                rel="noopener noreferrer" className="text-blue-600 underline">{item?.project_url}</a>
                                                            <p>{item?.start_date} - {item?.on_going ? "Ongoing" : item?.end_date}</p>
                                                            <p>{parser.parseFromString(item?.description, "text/html").body.textContent.trim()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div>No Projects have been added yet</div>
                                        )
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

import { MinusIcon, PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { Skeleton } from "../../../Components/Skeleton";
import { useParams } from "react-router-dom";

export default function Summary() {
    const param = useParams();
    const [summary, setSummary] = useState(true);
    const [editSummary, setEditSummary] = useState(false);
    const parser = new DOMParser();

    const handleSummary = () => {
        setSummary(!summary);
        if (!summary) {
            setEditSummary(false);
        }
    };

    const [data, setData] = useState();
    const [tableLoader, setTableLoader] = useState(false);

    const fetchData = async () => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`api/job_seeker_summary?user_id=${param?.id}`);
            if (response) {
                setData(response);
            }
        } catch (error) {
            setEditSummary(false);
            handleError(error);
        } finally {
            setTableLoader(false);
        }
    };

    return (
        <div className="w-full max-w-[66rem] mx-auto">
            <div className="p-4">
                <div className={`border rounded-md shadow-lg ${summary ? "overflow-hidden" : ""}`}>
                    {/* Header Section */}
                    <div
                        className="flex justify-between items-center p-4 border-b cursor-pointer text-[#ff0000] bg-white"
                        onClick={() => {
                            handleSummary();
                            fetchData();
                        }}
                    >
                        <h3 className="font-bold text-xl">Summary</h3>
                    </div>

                    {/* Card Body */}
                    <div
                        className={`relative bg-white transition-all duration-300 ease-in-out ${summary ? "max-h-0 p-0" : "max-h-screen p-4"
                            }`}
                    >
                        {/* Display Summary */}
                        {tableLoader ? (
                            <Skeleton />
                        ) : (
                            <>
                                {!editSummary && !summary && (
                                    <div className="relative">
                                        <p className="sm:text-lg">
                                            {parser
                                                .parseFromString(data?.data[0]?.summary ?? "", "text/html")
                                                .body.textContent.trim() !== ""
                                                ? parser
                                                    .parseFromString(data?.data[0]?.summary, "text/html")
                                                    .body.textContent.trim()
                                                : 
                                                <div className="">No Summary has been added yet</div>}
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

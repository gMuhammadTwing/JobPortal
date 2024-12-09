import { MinusIcon, PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button } from "../Button";
import axiosInstance, { handleError } from "../../axiosInstance";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { InfinitySpin } from "react-loader-spinner";
export default function Summary() {
    const [summary, setSummary] = useState(false);
    const [editSummary, setEditSummary] = useState(false);
    const [value, setValue] = useState("");
    const parser = new DOMParser();

    const handleSummary = () => {
        setSummary(!summary);
        if (!summary) {
            setEditSummary(false);
        }
    };
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const user_id = localStorage.user_id;
    const formik = useFormik({
        initialValues: {
            summary: data?.data[0]?.summary,
            user_id: user_id,
        },
        validationSchema: Yup.object({
            summary: Yup.string()
                .required("Summary is required")
            // .min(20, "Summary must be at least 20 characters long"),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true)
            if (data) {
                try {
                    const response = await axiosInstance.post(`/api/job_seeker_summary/update/${data?.data[0]?.id}`, values);
                    if (response) {
                        toast.success("Summary saved successfully");
                        formik.resetForm();
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("An error occurred while saving the summary");
                } finally {
                    setEditSummary(false);
                    fetchData();
                }
            }
            else {
                try {
                    const response = await axiosInstance.post(`/api/job_seeker_summary/store`, values);
                    if (response) {
                        toast.success("Summary saved successfully");
                        formik.resetForm();
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("An error occurred while saving the summary");
                } finally {
                    fetchData();
                }
            }
        },
    });
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`api/job_seeker_summary?user_id=${user_id}`);
            if (response) {
                setData(response)

            }
        } catch (error) {
            setEditSummary(false);
            handleError(error);
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex justify-center sm:px-0">
            <div className="p-4 w-full max-w-5xl">
                <div className={`border rounded-md shadow-lg ${summary ? "overflow-hidden" : ""}`}>
                    {/* Header Section */}
                    <div
                        className="flex justify-between items-center p-4 border-b cursor-pointer text-orange-600 bg-white"
                        onClick={handleSummary}
                    >
                        <h3 className="font-bold text-xl">Summary</h3>
                        <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                            {summary ? (
                                <PlusIcon className="block h-6 w-6 text-blue-500 hover:scale-[160%] duration-300" />
                            ) : (
                                <MinusIcon className="block h-6 w-6 text-red-500 hover:scale-[160%] duration-300" />
                            )}
                        </button>
                    </div>

                    {/* Card Body */}
                    <div
                        className={`relative bg-white transition-all duration-300 ease-in-out ${summary ? "max-h-0 p-0" : "max-h-screen p-4"
                            }`}
                    >
                        {/* Display Summary */}
                        {!editSummary && !summary && (
                            <div className="relative">
                                <p className="text-gray-600 text-base sm:text-lg">
                                    {parser.parseFromString(data?.data[0]?.summary, "text/html").body.textContent.trim() != "" ? parser.parseFromString(data?.data[0]?.summary, "text/html").body.textContent.trim() : 'No Summary has been added yet'}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setEditSummary(true)}
                                    className="absolute top-0 right-4 hover:bg-gray-100 rounded-full p-2 transition"
                                >
                                    <PencilIcon className="h-5 w-5 text-blue-500" />
                                </button>
                            </div>
                        )}

                        {/* Edit Summary Form */}
                        {editSummary && (
                            <form className="" onSubmit={formik.handleSubmit}>
                                <div className="relative">
                                    <ReactQuill
                                        id="summary-editor"
                                        value={formik.values.summary}
                                        onChange={(value) => formik.setFieldValue("summary", value)}
                                        theme="snow"
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
                                        placeholder="Write something about yourself..."
                                    />
                                    {formik.touched.summary && formik.errors.summary && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.summary}</p>
                                    )}
                                </div>
                                {loading ? <div className="flex justify-center mr-5 mt-12"><InfinitySpin width={150} color="green" /></div> :
                                    <div className="flex justify-center gap-4 mt-15">
                                        <Button
                                            type="button"
                                            color="gradient"
                                            variant="outline"
                                            onClick={() => setEditSummary(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="gradient" variant="solid" className="text-white">
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
    );
}

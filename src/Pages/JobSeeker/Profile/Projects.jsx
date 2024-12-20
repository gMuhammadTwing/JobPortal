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
export default function Projects() {
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
    const user_id = localStorage.user_id;
    const formik = useFormik({
        initialValues: {
            project_name: updateData?.project_name || "",
            project_url: updateData?.project_url || "",
            start_date: updateData?.start_date || "",
            end_date: updateData?.end_date || "",
            on_going: updateData?.on_going || false,
            description: updateData?.description || "",
            user_id: user_id,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            project_name: Yup.string().required("Project Name is required"),
            start_date: Yup.date().required("Start Date is required"),
            // end_date: Yup.date().when("on_going", {
            //     is: false,
            //     then: Yup.date().required("End Date is required"),
            // }),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            if (updateData) {
                try {
                    const response = await axiosInstance.post(`api/job_seeker_project/update/${updateData?.id}`, values);
                    if (response) {
                        toast.success("Project Data Saved")
                        formik.resetForm();
                    }
                } catch (error) {
                    handleError(error);
                } finally {
                    setEditProject(false);
                    fetchData()
                    setLoading(false);
                    setUpdateData(null)
                }
            }
            else {
                try {
                    const response = await axiosInstance.post(`api/job_seeker_project/store`, values);
                    if (response) {
                        toast.success("Project Data Saved")
                        formik.resetForm();
                    }
                } catch (error) {
                    handleError(error);
                } finally {
                    setEditProject(false);
                    fetchData()
                    setLoading(false);
                    setUpdateData(null)
                }
            }
        },
    });
    const fetchData = async () => {
        setTableLoader(true)
        try {
            const response = await axiosInstance.get(`api/job_seeker_project?user_id=${user_id}`);
            if (response) {
                setData(response?.data)
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
        }
    }
    const update = (item) => {
        setEditProject(true)
        setUpdateData(item)
    }
    const [isDelete, setIsDelete] = useState(false)
    const [endpoint, setEndpoint] = useState()
    const deleteHandler = (data) => {
        setEndpoint(`api/job_seeker_project/destroy/${data?.id}`)
        setIsDelete(true)

    }
    const closeDeleteModal = () => {
        setIsDelete(false);
        fetchData();
    }
    // useEffect(() => {
    //     fetchData();
    // }, [isDelete]);
    return (
        <>
            <div className="flex justify-center sm:px-0">
                <DeleteModal
                    isOpen={isDelete}
                    onClose={closeDeleteModal}
                    name="Project"
                    endpoint={endpoint}
                />
                <div className="p-4 w-full max-w-5xl">
                    <div className={`border rounded-md shadow-lg ${Project ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 border-b cursor-pointer text-orange-600 bg-white"
                            // onClick={handleProject}
                        >
                            <h3 className="font-bold text-xl">Projects</h3>
                            <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                                {Project ? (
                                    <PlusIcon onClick={()=>{
                                        handleProject();
                                        fetchData();
                                    }} className="block h-6 w-6 text-blue-500 hover:scale-[160%] duration-300" />
                                ) : (
                                    <MinusIcon onClick={()=>handleProject()} className="block h-6 w-6 text-red hover:scale-[160%] duration-300" />
                                )}
                            </button>
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
                                                    className="flex flex-col sm:flex-row sm:justify-between gap-4 border-b p-2 sm:items-center relative"
                                                >
                                                    <div className="flex sm:absolute sm:right-4 sm:top-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => update(item)}
                                                            className="hover:bg-gray-100 rounded-full p-2 focus:outline-none transition-colors"
                                                        >
                                                            <PencilIcon className="h-5 w-5 text-blue-500" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteHandler(item)}
                                                            className="hover:bg-gray-100 rounded-full p-2 focus:outline-none transition-colors"
                                                        >
                                                            <TrashIcon className="h-5 w-5 text-red-600" />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div>
                                                            <div className="flex justify-between items-center">
                                                                <h4 className="font-semibold text-lg">Project Title: {item?.project_name}</h4>
                                                            </div>
                                                            <a href={item?.project_url} target="_blank"
                                                                rel="noopener noreferrer" className="text-blue-600 underline">Project URL</a>
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

                                    {/* Add Project Button */}
                                    {!editProject && (
                                        <div className="mt-4 flex justify-center py-2">
                                            <button
                                                type="button"
                                                onClick={() => setEditProject(true)}
                                                className="bg-orange-600 hover:bg-orange-600 rounded-full p-1 text-white shadow-md transition-all"
                                            >
                                                <PlusIcon className=" h-5 w-5" />
                                            </button>
                                        </div>
                                    )}

                                </>
                            )}

                            {/* Edit Profile Form */}
                            {editProject && (
                                <form onSubmit={formik.handleSubmit} className="">
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        {/* Project Name */}
                                        <div>
                                            <label htmlFor="project_name" className="block text-sm font-medium text-gray-900">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="project_name"
                                                name="project_name"
                                                value={formik.values.project_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                            {formik.touched.project_name && formik.errors.project_name && (
                                                <div className="text-red-500 text-sm mt-1">{formik.errors.project_name}</div>
                                            )}
                                        </div>

                                        {/* Project URL */}
                                        <div>
                                            <label htmlFor="project_url" className="block text-sm font-medium text-gray-900">
                                                Project URL
                                            </label>
                                            <input
                                                type="url"
                                                id="project_url"
                                                name="project_url"
                                                value={formik.values.project_url}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                        </div>

                                        {/* Start Date */}
                                        <div>
                                            <label htmlFor="start_date" className="block text-sm font-medium text-gray-900">
                                                Start Date *
                                            </label>
                                            <input
                                                type="date"
                                                id="start_date"
                                                name="start_date"
                                                value={formik.values.start_date}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                            {formik.touched.start_date && formik.errors.start_date && (
                                                <div className="text-red-500 text-sm mt-1">{formik.errors.start_date}</div>
                                            )}
                                        </div>

                                        {/* End Date */}
                                        <div>
                                            <label htmlFor="end_date" className="block text-sm font-medium text-gray-900">
                                                End Date
                                            </label>
                                            <input
                                                type="date"
                                                id="end_date"
                                                name="end_date"
                                                value={formik.values.end_date}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            />
                                            {formik.touched.end_date && formik.errors.end_date && (
                                                <div className="text-red-500 text-sm mt-1">{formik.errors.end_date}</div>
                                            )}
                                        </div>

                                        {/* On_going Checkbox */}
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="on_going"
                                                name="on_going"
                                                checked={formik.values.on_going}
                                                onChange={formik.handleChange}
                                                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <label htmlFor="on_going" className="ml-2 text-sm font-medium text-gray-900">
                                                Ongoing
                                            </label>
                                        </div>

                                        {/* Description */}
                                        <div className="col-span-full">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                                Description
                                            </label>
                                            <ReactQuill
                                                id="description"
                                                theme="snow"
                                                value={formik.values.description}
                                                onChange={(content) => {
                                                    formik.setFieldValue("description", content);
                                                }}
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
                                    </div>

                                    {/* Action Buttons */}
                                    {loading ? <div className="flex justify-center mr-5 mt-16"><InfinitySpin width={150} color="green" /></div> :
                                        <div className="flex justify-center gap-4 mt-17">
                                            <Button
                                                type="button"
                                                color="gradient"
                                                variant="outline"
                                                onClick={() => {
                                                    setEditProject(false)
                                                    setUpdateData(null)
                                                }}
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
        </>
    );
}

import { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../../axiosInstance";
import ReactQuill from "react-quill";
import { Button } from "../../../Components/Button";
import { InfinitySpin } from "react-loader-spinner";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { toast } from "sonner";
export default function About() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            description: data?.description || '',
            our_mission: data?.our_mission || '',
            our_vision: data?.our_vision || '',
            our_values: data?.our_values || '',
        },
        validationSchema: Yup.object({
            // description: Yup.string()
            //     .required("Description is required"),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            
            try {
                const response = await axiosInstance.post(`/api/about_us/store`, values);
                if (response) {
                    toast.success("Career Data saved successfully");
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while saving the description");
            } finally {
                fetchData(2);
                
                formik.resetForm();
            }
        },
    });
    const fetchData = async () => {
        setLoading(true)
        try {
            const { data } = await axiosInstance.get(`/api/about_us`);
            if (data) {
                setData(data[0]);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="container mx-auto max-w-5xl min-h-screen mt-4">
            <div className="pb-15">
                <>
                    <div className="border rounded-lg p-4 bg-white">
                        <div className="text-center p-4 font-semibold">About Us</div>
                        {!loading &&
                            <form onSubmit={formik.handleSubmit}>
                                <div className="relative mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                        Write Description
                                    </label>
                                    <ReactQuill
                                        id="description"
                                        value={formik.values.description}
                                        onChange={(value) => formik.setFieldValue("description", value)}
                                        theme="snow"
                                        style={{ height: "250px" }}
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
                                        placeholder="Write here..."
                                    />
                                </div>

                                <div className="relative mb-4 mt-25">
                                    <label htmlFor="our_mission" className="block text-sm font-medium text-gray-900">
                                        Write Our Mission
                                    </label>
                                    <ReactQuill
                                        id="our_mission"
                                        value={formik.values.our_mission}
                                        onChange={(value) => formik.setFieldValue("our_mission", value)}
                                        theme="snow"
                                        style={{ height: "250px" }}
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
                                        placeholder="Write here..."
                                    />
                                </div>

                                <div className="relative mb-4 mt-25">
                                    <label htmlFor="our_vision" className="block text-sm font-medium text-gray-900">
                                        Write Our Vision
                                    </label>
                                    <ReactQuill
                                        id="our_vision"
                                        value={formik.values.our_vision}
                                        onChange={(value) => formik.setFieldValue("our_vision", value)}
                                        theme="snow"
                                        style={{ height: "250px" }}
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
                                        placeholder="Write here..."
                                    />
                                </div>

                                <div className="relative mb-4 mt-25">
                                    <label htmlFor="our_values" className="block text-sm font-medium text-gray-900">
                                        Write Our Values
                                    </label>
                                    <ReactQuill
                                        id="our_values"
                                        value={formik.values.our_values}
                                        onChange={(value) => formik.setFieldValue("our_values", value)}
                                        theme="snow"
                                        style={{ height: "250px" }}
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
                                        placeholder="Write here..."
                                    />
                                </div>

                                {/* Buttons */}
                                {loading ? (
                                    <div className="flex justify-center sm:mt-15 mt-25">
                                        <InfinitySpin width={150} color="green" />
                                    </div>
                                ) : (
                                    <div className="flex justify-center gap-4 sm:mt-17 mt-25">
                                        {/* <Button
                                            type="button"
                                            color="gradient"
                                            variant="outline"
                                            onClick={() => setEditDescription(false)}
                                        >
                                            Cancel
                                        </Button> */}
                                        <Button type="submit" color="gradient" variant="solid" className="text-white">
                                            Update
                                        </Button>
                                    </div>
                                )}
                            </form>
                        }
                    </div>
                </>
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../../axiosInstance";
import ReactQuill from "react-quill";
import { Button } from "../../../Components/Button";
import { InfinitySpin } from "react-loader-spinner";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { toast } from "sonner";
export default function Index() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false)
    const formik = useFormik({
        initialValues: {
            description_public: data?.description_public || '',
            description_private: data?.description_private || '',
        },
        validationSchema: Yup.object({
            // description: Yup.string()
            //     .required("Description is required"),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoader(true)
            try {
                const response = await axiosInstance.post(`/api/veritas_kwd_idea_incubators/store`, values);
                if (response) {
                    toast.success("Idea Incubator Data saved successfully");
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while saving the description");
            } finally {
                fetchData(2);
                setLoader(false)
                formik.resetForm();
            }
        },
    });
    const fetchData = async () => {
        setLoading(true)
        try {
            const { data } = await axiosInstance.get(`/api/veritas_kwd_idea_incubators`);
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

    const parser = new DOMParser();

    return (
        <div className="container mx-auto max-w-5xl min-h-screen mt-4">
            <div className="pb-15">
                <>
                    <div className="border rounded-lg p-4 bg-white">
                        <div className="text-center p-4 font-semibold">VeritasKWD Idea Incubator</div>
                        {!loading &&
                            <form onSubmit={formik.handleSubmit}>
                                <div className="relative mb-4">
                                    <label htmlFor="description_public" className="block text-sm font-medium text-gray-900">
                                        Write Description for Public
                                    </label>
                                    <ReactQuill
                                        id="description_public"
                                        value={formik.values.description_public}
                                        onChange={(value) => formik.setFieldValue("description_public", value)}
                                        theme="snow"
                                        style={{ height: "250px" }}
                                        modules={{
                                            toolbar: [
                                                ["bold", "italic", "underline", "strike"],
                                                [{ header: [1, 2, 3, false] }],
                                                [{ list: "ordered" }, { list: "bullet" }],
                                                ["link", "image"],
                                                ["clean"],
                                            ],
                                            // table: true,
                                        }}
                                        formats={[
                                            "header",
                                            "bold",
                                            "italic",
                                            "underline",
                                            "strike",
                                            "list",
                                            "bullet",
                                            "link",
                                            "image",
                                        ]}
                                        placeholder="Write here..."
                                    />
                                </div>

                                <div className="relative mb-4 sm:mt-20 mt-25">
                                    <label htmlFor="description_private" className="block text-sm font-medium text-gray-900">
                                        Write Description for Private
                                    </label>
                                    <ReactQuill
                                        id="description_private"
                                        value={formik.values.description_private}
                                        onChange={(value) => formik.setFieldValue("description_private", value)}
                                        theme="snow"
                                        style={{ height: "250px" }}
                                        modules={{
                                            toolbar: [
                                                ["bold", "italic", "underline", "strike"],
                                                [{ header: [1, 2, 3, false] }],
                                                [{ list: "ordered" }, { list: "bullet" }],
                                                ["link", "image"],
                                                ["clean"],
                                            ],
                                            // table: true,
                                        }}
                                        formats={[
                                            "header",
                                            "bold",
                                            "italic",
                                            "underline",
                                            "strike",
                                            "list",
                                            "bullet",
                                            "link",
                                            "image",
                                        ]}
                                        placeholder="Write here..."
                                    />
                                </div>

                                {/* Buttons */}
                                {loader ? (
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
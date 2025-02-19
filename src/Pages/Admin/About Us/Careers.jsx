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
    const formik = useFormik({
        initialValues: {
            description: data?.description || '',
        },
        validationSchema: Yup.object({
            // description: Yup.string()
            //     .required("Description is required"),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const response = await axiosInstance.post(`/api/veritas_kwd_careers/store`, values);
                if (response) {
                    toast.success("Career Data saved successfully");
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while saving the description");
            } finally {
                fetchData(2);
                setLoading(false)
                formik.resetForm();
            }
        },
    });
    const fetchData = async () => {
        try {
            const { data } = await axiosInstance.get(`/api/veritas_kwd_careers`);
            if (data) {
                setData(data[0]);
            }
        } catch (error) {
            handleError(error);
        } finally {
            // setTableLoader(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    const parser = new DOMParser();

    return (
        <div className="container mx-auto max-w-5xl h-screen mt-4">
            <div className="pb-15">
                <>
                    <div className="border rounded-lg p-4 bg-white">
                        <div className="text-center p-4 font-semibold">VeritasKWD Careers</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="relative mb-4">
                                {/* <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                        Write Description
                                    </label> */}
                                <ReactQuill
                                    id="description-editor"
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
                                {formik.touched.description && formik.errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
                                )}
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
                    </div>
                </>
            </div>
        </div>
    );
}
import { useEffect, useRef, useState } from "react";
import axiosInstance, { handleError } from "../../../axiosInstance";
import ReactQuill from "react-quill";
import { Button } from "../../../Components/Button";
import { InfinitySpin } from "react-loader-spinner";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { toast } from "sonner";
import JoditEditor from "jodit-react";
export default function Index() {
    const editor = useRef(null);
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
                const response = await axiosInstance.post(`/api/veritas_kwd_investors/store`, values);
                if (response) {
                    toast.success("Investors Data saved successfully");
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
            const { data } = await axiosInstance.get(`/api/veritas_kwd_investors`);
            if (data) {
                setData(data[0]);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false)
            // setTableLoader(false);
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
                        <div className="text-center p-4 font-semibold">Veritas Endless Possibities for Investors</div>
                        {!loading &&
                            <form onSubmit={formik.handleSubmit}>
                                <div className="relative mb-4">
                                    <label htmlFor="description_public" className="block text-sm font-medium text-gray-900">
                                        Write Description for Public
                                    </label>
                                    <JoditEditor
                                        ref={editor}
                                        value={formik.values.description_public}
                                        config={{
                                            toolbarSticky: false,
                                            buttons: "bold,italic,underline,|,ul,ol,|,table,link,|,align,fontsize,undo,redo",
                                            style: {
                                                fontSize: ["10px", "12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "36px"],
                                            },
                                        }}
                                        onBlur={(value) => formik.setFieldValue("description_public", value)}
                                    />
                                </div>

                                <div className="relative mb-4 sm:mt-20 mt-25">
                                    <label htmlFor="description_private" className="block text-sm font-medium text-gray-900">
                                        Write Description for Private
                                    </label>
                                    <JoditEditor
                                        ref={editor}
                                        value={formik.values.description_private}
                                        config={{
                                            toolbarSticky: false,
                                            buttons: "bold,italic,underline,|,ul,ol,|,table,link,|,align,fontsize,undo,redo",
                                            style: {
                                                fontSize: ["10px", "12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "36px"],
                                            },
                                        }}
                                        onBlur={(value) => formik.setFieldValue("description_private", value)}
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
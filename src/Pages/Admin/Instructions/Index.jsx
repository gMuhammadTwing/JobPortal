import { MinusIcon, PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button } from "../../../Components/Button";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { InfinitySpin } from "react-loader-spinner";
import { LoaderTable } from "../../../Components/LoaderTable";
import { Skeleton } from "../../../Components/Skeleton";
export default function Index() {
    const [instructions, setInstructions] = useState(false);
    const [editInstructions, setEditInstructions] = useState(false);
    const parser = new DOMParser();

    const handleInstructions = () => {
        setInstructions(!instructions);
        if (!instructions) {
            setEditInstructions(false);
        }
    };
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableLoader, setTableLoader] = useState(false);
    const user_id = localStorage.user_id;
    const [role_id, setRoleId] = useState(2);
    const formik = useFormik({
        initialValues: {
            instructions: data?.data[0]?.instructions,
            amount: data?.data[0]?.amount,
            role_id: role_id,
        },
        validationSchema: Yup.object({
            instructions: Yup.string()
                .required("Instructions is required")
            // .min(20, "Instructions must be at least 20 characters long"),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log(values);

            setLoading(true)
            if (data) {
                try {
                    const response = await axiosInstance.post(`/api/admin_payment_instruction/update/${data?.data[0]?.id}`, values);
                    if (response) {
                        toast.success("Instructions saved successfully");
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("An error occurred while saving the instructions");
                } finally {
                    setEditInstructions(false);
                    fetchData(2);
                    setLoading(false)
                    formik.resetForm();
                }
            }
            else {
                try {
                    const response = await axiosInstance.post(`/api/admin_payment_instruction/store`, values);
                    if (response) {
                        toast.success("Instructions saved successfully");
                        formik.resetForm();
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("An error occurred while saving the instructions");
                } finally {
                    fetchData(2);
                    setLoading(false)
                }
            }
        },
    });
    const fetchData = async (role_id) => {
        setTableLoader(true)
        try {
            const response = await axiosInstance.get(`/api/admin_payment_instruction?role_id=${role_id}`);
            if (response) {
                setData(response)
                console.log("res: ", response.data);

            }
        } catch (error) {
            setEditInstructions(false);
            handleError(error);
            setLoading(false)
        }
        finally {
            setTableLoader(false)
        }
    }
    useEffect(() => {
        fetchData(role_id);
    }, []);

    return (
        <div className="flex justify-center sm:px-0 min-h-screen">
            <div className="p-4 w-full max-w-5xl">
                <div className={`border rounded-full shadow-lg ${instructions ? "overflow-hidden" : ""}`}>
                    {/* Header Section */}
                    <div
                        className="flex justify-between items-center p-4 border-b text-orange-600 bg-white"
                    // onClick={handleInstructions}
                    >
                        <h3 className="font-bold text-xl">Instructions for Payment</h3>
                        <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                            <select
                                id="role_id"
                                name="role_id"
                                value={role_id}
                                onChange={(e) => {
                                    setRoleId(e.target.value);
                                    fetchData(e.target.value);
                                }}
                                onBlur={formik.handleBlur}
                                className="block py-1.5 px-3 border text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                            >
                                <option value="2">Job Seeker</option>
                                <option value="4">Employer Agency</option>
                            </select>
                        </button>
                    </div>

                    {/* Card Body */}
                    <div
                        className={`relative bg-white transition-all duration-300 ease-in-out ${instructions ? "max-h-0 p-0" : "max-h-screen p-4"
                            }`}
                    >
                        {/* Display Instructions */}
                        {tableLoader ? (
                            <Skeleton />
                        ) : (
                            <>
                                {!editInstructions && !instructions && (
                                    <div className="relative space-y-2">
                                        <div className="font-semibold text-xl">Instructions and Amount</div>
                                        <p className=" sm:text-lg pl-5">
                                            {parser.parseFromString(data?.data[0]?.instructions || '', "text/html").body.textContent.trim()} - {data?.data[0]?.amount}

                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => setEditInstructions(true)}
                                            className="absolute top-0 right-4 hover:bg-gray-100 rounded-full p-2 transition"
                                        >
                                            <PencilIcon className="h-5 w-5 text-blue-500" />
                                        </button>
                                    </div>
                                )}

                                {/* Edit Instructions Form */}
                                {editInstructions && (
                                    <form className="" onSubmit={formik.handleSubmit}>
                                        <div className="mb-2">
                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-900">
                                                Amount
                                            </label>
                                            <input
                                                id="amount"
                                                name="amount"
                                                type="amount"
                                                value={formik.values.amount}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={`block py-1.5 px-3 border ${formik.touched.amount && formik.errors.amount ? "border-red-500" : "border-gray-300"
                                                    } text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:outline-none hover:border-blue-500 mt-2`}
                                            />
                                            {formik.touched.amount && formik.errors.amount && (
                                                <p className="mt-1 text-xs text-red-500">{formik.errors.amount}</p>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                                Instructions
                                            </label>
                                            <ReactQuill
                                                id="instructions-editor"
                                                value={formik.values.instructions}
                                                onChange={(value) => formik.setFieldValue("instructions", value)}
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
                                            {formik.touched.instructions && formik.errors.instructions && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors.instructions}</p>
                                            )}
                                        </div>
                                        {loading ? <div className="flex justify-center mr-5 mt-15"><InfinitySpin width={150} color="green" /></div> :
                                            <div className="flex justify-center gap-4 mt-17">
                                                <Button
                                                    type="button"
                                                    color="gradient"
                                                    variant="outline"
                                                    onClick={() => setEditInstructions(false)}
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

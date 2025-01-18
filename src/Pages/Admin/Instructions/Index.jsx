// import { MinusIcon, PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
// import { useEffect, useState } from "react";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";
// import { Button } from "../../../Components/Button";
// import axiosInstance, { handleError } from "../../../axiosInstance";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast } from "sonner";
// import { InfinitySpin } from "react-loader-spinner";
// import { LoaderTable } from "../../../Components/LoaderTable";
// import { Skeleton } from "../../../Components/Skeleton";
// export default function Index() {
//     const [instructions, setInstructions] = useState(false);
//     const [editInstructions, setEditInstructions] = useState(false);
//     const parser = new DOMParser();

//     const handleInstructions = () => {
//         setInstructions(!instructions);
//         if (!instructions) {
//             setEditInstructions(false);
//         }
//     };
//     const [data, setData] = useState();
//     const [loading, setLoading] = useState(false);
//     const [tableLoader, setTableLoader] = useState(false);
//     const user_id = localStorage.user_id;
//     const [role_id, setRoleId] = useState(2);
//     const formik = useFormik({
//         initialValues: {
//             instructions: data?.data[0]?.instructions,
//             amount: data?.data[0]?.amount,
//             role_id: role_id,
//         },
//         validationSchema: Yup.object({
//             instructions: Yup.string()
//                 .required("Instructions is required")
//             // .min(20, "Instructions must be at least 20 characters long"),
//         }),
//         enableReinitialize: true,
//         onSubmit: async (values) => {

//             setLoading(true)
//             if (data?.data?.length) {
//                 try {
//                     const response = await axiosInstance.post(`/api/admin_payment_instruction/update/${data?.data[0]?.id}`, values);
//                     if (response) {
//                         toast.success("Instructions saved successfully");
//                     }
//                 } catch (error) {
//                     console.error(error);
//                     toast.error("An error occurred while saving the instructions");
//                 } finally {
//                     setEditInstructions(false);
//                     fetchData(2);
//                     setLoading(false)
//                     formik.resetForm();
//                 }
//             }
//             else {
//                 try {
//                     const response = await axiosInstance.post(`/api/admin_payment_instruction/store`, values);
//                     if (response) {
//                         toast.success("Instructions saved successfully");
//                         formik.resetForm();
//                     }
//                 } catch (error) {
//                     console.error(error);
//                     toast.error("An error occurred while saving the instructions");
//                 } finally {
//                     fetchData(2);
//                     setLoading(false)
//                     setEditInstructions(false);
//                 }
//             }
//         },
//     });
//     const fetchData = async (role_id) => {
//         setTableLoader(true)
//         try {
//             const response = await axiosInstance.get(`/api/admin_payment_instruction?role_id=${role_id}`);
//             if (response) {
//                 setData(response)
//             }
//         } catch (error) {
//             setEditInstructions(false);
//             handleError(error);
//             setLoading(false)
//         }
//         finally {
//             setTableLoader(false)
//         }
//     }
//     useEffect(() => {
//         fetchData(role_id);
//     }, []);

//     return (
//         <div className="flex justify-center sm:px-0 min-h-screen">
//             <div className="p-4 w-full max-w-5xl">
//                 <div className={`border-b rounded-b-lg shadow-lg ${instructions ? "overflow-hidden" : ""}`}>
//                     {/* Header Section */}
//                     <div
//                         className="flex justify-between items-center p-3 border-b text-[#ff0000] bg-white rounded-t-lg"
//                     // onClick={handleInstructions}
//                     >
//                         <h3 className="font-bold text-xl">Instructions for Payment</h3>
//                         <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
//                             <select
//                                 id="role_id"
//                                 name="role_id"
//                                 value={role_id}
//                                 onChange={(e) => {
//                                     setRoleId(e.target.value);
//                                     fetchData(e.target.value);
//                                 }}
//                                 onBlur={formik.handleBlur}
//                                 className="block py-1.5 px-3 border text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:outline-none hover:border-blue-500 mt-2"
//                             >
//                                 <option value="2">Job Seeker</option>
//                                 <option value="4">Employer Agency</option>
//                             </select>
//                         </button>
//                     </div>

//                     {/* Card Body */}
//                     <div
//                         className={` rounded-b-lg relative bg-white transition-all duration-300 ease-in-out ${instructions ? "max-h-0 p-0" : "max-h-screen p-4"
//                             }`}
//                     >
//                         {/* Display Instructions */}
//                         {tableLoader ? (
//                             <Skeleton />
//                         ) : (
//                             <>
//                                 {!editInstructions && !instructions && (
//                                     <div className="relative space-y-2">
//                                         <div className="font-semibold text-xl">Instructions and Amount</div>
//                                         <p className=" sm:text-lg pl-5">
//                                             {parser.parseFromString(data?.data[0]?.instructions || '', "text/html").body.textContent.trim()} - {data?.data[0]?.amount}

//                                         </p>
//                                         <button
//                                             type="button"
//                                             onClick={() => setEditInstructions(true)}
//                                             className="absolute top-0 right-4 hover:bg-gray-100 rounded-full p-2 transition"
//                                         >
//                                             <PencilIcon className="h-5 w-5 text-blue-500" />
//                                         </button>
//                                     </div>
//                                 )}

//                                 {/* Edit Instructions Form */}
//                                 {editInstructions && (
//                                     <form className="" onSubmit={formik.handleSubmit}>
//                                         <div className="mb-2">
//                                             <label htmlFor="amount" className="block text-sm font-medium text-gray-900">
//                                                 Amount
//                                             </label>
//                                             <input
//                                                 id="amount"
//                                                 name="amount"
//                                                 type="amount"
//                                                 value={formik.values.amount}
//                                                 onChange={formik.handleChange}
//                                                 onBlur={formik.handleBlur}
//                                                 className={`block py-1.5 px-3 border ${formik.touched.amount && formik.errors.amount ? "border-red-500" : "border-gray-300"
//                                                     } text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:outline-none hover:border-blue-500 mt-2`}
//                                             />
//                                             {formik.touched.amount && formik.errors.amount && (
//                                                 <p className="mt-1 text-xs text-red-500">{formik.errors.amount}</p>
//                                             )}
//                                         </div>
//                                         <div className="relative">
//                                             <label htmlFor="email" className="block text-sm font-medium text-gray-900">
//                                                 Instructions
//                                             </label>
//                                             <ReactQuill
//                                                 id="instructions-editor"
//                                                 value={formik.values.instructions}
//                                                 onChange={(value) => formik.setFieldValue("instructions", value)}
//                                                 theme="snow"
//                                                 style={{
//                                                     height: "150px",
//                                                 }}
//                                                 modules={{
//                                                     toolbar: [
//                                                         ["bold", "italic", "underline", "strike"],
//                                                         [{ header: [1, 2, 3, false] }],
//                                                         [{ list: "ordered" }, { list: "bullet" }],
//                                                         ["clean"],
//                                                     ],
//                                                 }}
//                                                 formats={[
//                                                     "header",
//                                                     "bold",
//                                                     "italic",
//                                                     "underline",
//                                                     "strike",
//                                                     "list",
//                                                     "bullet",
//                                                 ]}
//                                                 placeholder="Write something about yourself..."
//                                             />
//                                             {formik.touched.instructions && formik.errors.instructions && (
//                                                 <p className="text-red-500 text-sm mt-1">{formik.errors.instructions}</p>
//                                             )}
//                                         </div>
//                                         {loading ? <div className="flex justify-center mr-5 mt-15"><InfinitySpin width={150} color="green" /></div> :
//                                             <div className="flex justify-center gap-4 mt-17">
//                                                 <Button
//                                                     type="button"
//                                                     color="gradient"
//                                                     variant="outline"
//                                                     onClick={() => setEditInstructions(false)}
//                                                 >
//                                                     Cancel
//                                                 </Button>
//                                                 <Button type="submit" color="gradient" variant="solid" className="text-white">
//                                                     Save
//                                                 </Button>
//                                             </div>
//                                         }
//                                     </form>
//                                 )}
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



import {
    PencilIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { LoaderTable } from "../../../Components/LoaderTable";
import ReactQuill from "react-quill";
import { Button } from "../../../Components/Button";
import { InfinitySpin } from "react-loader-spinner";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { toast } from "sonner";
export default function Index() {
    const [editInstructions, setEditInstructions] = useState(false);
    const [updateData, setUpdateData] = useState();
    const [payments, setPayments] = useState();
    const [tableLoader, setTableLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [updateCheck, setUpdateCheck] = useState(false);
    const formik = useFormik({
        initialValues: {
            instructions: updateData?.instructions || '',
            amount: updateData?.amount || '',
            role_id: updateData?.role_id || '',
        },
        validationSchema: Yup.object({
            instructions: Yup.string()
                .required("Instructions is required"),
            // .min(20, "Instructions must be at least 20 characters long"),
            role_id: Yup.string()
                .required("Required"),
            amount: Yup.string()
                .required("Required")
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true)
            if (updateCheck) {
                try {
                    const response = await axiosInstance.post(`/api/admin_payment_instruction/update/${updateData?.id}`, values);
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
                    setEditInstructions(false);
                }
            }
        },
    });
    const fetchData = async () => {
        setEditInstructions(false)
        setTableLoader(true);
        try {
            const { data } = await axiosInstance.get(`/api/admin_payment_instruction`);
            if (data) {
                setPayments(data);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    const parser = new DOMParser();
    const updateHandler = (item) => {
        setUpdateData(item)
        setUpdateCheck(true);
    }

    return (
        <div className="container mx-auto max-w-5xl h-screen mt-4">
            <div className="pb-15">
                {tableLoader ? <LoaderTable /> :
                    !editInstructions ?
                        <>
                            <div className="overflow-x-auto ring-1 ring-black ring-opacity-5 rounded-lg">
                                <div className="inline-block min-w-full align-middle">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-white">
                                                <tr className="border-b border-gray-300">
                                                    <th
                                                        scope="col"
                                                        className="pl-4 py-5.5 text-left text-[#ff0000] font-bold text-xl"
                                                    >
                                                        Instructions for Payment
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                    </th>
                                                    <th scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">

                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                                                    >
                                                        <Button
                                                            color="gradient"
                                                            variant="solid"
                                                            onClick={() => {
                                                                setEditInstructions(!editInstructions);
                                                                setUpdateData(null)
                                                                setUpdateCheck(false)
                                                            }}
                                                        >Add Instruction</Button>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                                        Instruction
                                                    </th>
                                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Amount
                                                    </th>
                                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Role
                                                    </th>
                                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Action
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {payments?.length > 0 ? (
                                                    payments?.map((payment, index) => (
                                                        <tr key={index}>
                                                            <td className="py-4 pl-4 pr-3 text-sm w-[30rem]">
                                                                {parser.parseFromString(payment?.instructions || '', "text/html").body.textContent.trim()}
                                                            </td>
                                                            <td className="px-3 py-4 text-sm">
                                                                {payment?.amount}
                                                            </td>
                                                            <td className="px-3 py-4 text-sm">
                                                                <span>
                                                                    {(() => {
                                                                        switch (payment?.role_id) {
                                                                            case 1:
                                                                                return 'Admin';
                                                                            case 2:
                                                                                return 'Job Seeker';
                                                                            case 3:
                                                                                return 'Employer';
                                                                            case 4:
                                                                                return 'Employment Agency';
                                                                            default:
                                                                                return 'Unknown Role';
                                                                        }
                                                                    })()}
                                                                </span>

                                                            </td>

                                                            <td className="px-3 py-4 text-sm">
                                                                <PencilIcon className="w-5 h-5 text-blue-500 cursor-pointer"
                                                                    onClick={() => {
                                                                        setEditInstructions(true);
                                                                        updateHandler(payment)
                                                                    }}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center py-4">
                                                            <span className="inline-flex text-xl items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                                No Payment Instructions Data Found
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </>
                        :
                        <>
                            <div className="border rounded-lg p-4 bg-white">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-2 flex items-center gap-4">
                                        {/* Dropdown for Role */}
                                        <div className="w-1/2">
                                            <label htmlFor="role_id" className="block text-sm font-medium text-gray-900">
                                                Instructions for
                                            </label>
                                            <select
                                                id="role_id"
                                                name="role_id"
                                                value={formik.values.role_id}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={`block py-1.5 px-3 border ${formik.touched.role_id && formik.errors.role_id ? "border-red-500" : "border-gray-300"
                                                } text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:outline-none hover:border-blue-500 mt-2`}
                                                // className="block py-1.5 px-3 border text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                            >
                                                <option value="">Select</option>
                                                <option value="2">Job Seeker</option>
                                                <option value="4">Employer Agency</option>
                                            </select>
                                            {formik.touched.role_id && formik.errors.role_id && (
                                                <p className="mt-1 text-xs text-red-500">{formik.errors.role_id}</p>
                                            )}
                                        </div>

                                        {/* Input for Amount */}
                                        <div className="w-1/2">
                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-900">
                                                Amount
                                            </label>
                                            <input
                                                id="amount"
                                                name="amount"
                                                type="text"
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
                                    </div>

                                    {/* Instructions */}
                                    <div className="relative mb-4">
                                        <label htmlFor="instructions" className="block text-sm font-medium text-gray-900">
                                            Write Instructions
                                        </label>
                                        <ReactQuill
                                            id="instructions-editor"
                                            value={formik.values.instructions}
                                            onChange={(value) => formik.setFieldValue("instructions", value)}
                                            theme="snow"
                                            style={{ height: "150px" }}
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

                                    {/* Buttons */}
                                    {loading ? (
                                        <div className="flex justify-center mt-15">
                                            <InfinitySpin width={150} color="green" />
                                        </div>
                                    ) : (
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
                                    )}
                                </form>
                            </div>
                        </>

                }
            </div>
        </div>
    );
}
import { MinusIcon, PlusIcon, PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "../../../Components/Button";
import { toast, Toaster } from "sonner";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InfinitySpin } from "react-loader-spinner";
import axiosInstance, { handleError } from "../../../axiosInstance";
import DeleteModal from "../../../Components/DeleteModal";
import { LoaderTable } from "../../../Components/LoaderTable";
import AddCoursework from "../Coursework/AddCoursework";
import { Skeleton } from "../../../Components/Skeleton";
export default function Education() {
    const [Education, setEducation] = useState(true);
    const [editEducation, setEditEducation] = useState(false);
    const handleEducation = () => {
        setEducation(!Education);
        if (!Education) {
            setEditEducation(false);
        }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const ToastSuccess = (str) => toast.success(str);
    const ToastError = (str) => toast.error(str);
    const validationSchema = Yup.object({
        degree_title: Yup.string().required('Degree title is required'),
        institute: Yup.string().required('Institute is required'),
        completion_year: Yup.string().required('Completion year is required'),
        cgpa_obtained: Yup.number()
            .required('CGPA obtained is required')
            .positive('Must be a positive number')
            .test(
                'is-less-than-total',
                'CGPA obtained must be less than or equal to CGPA out of',
                function (value) {
                    const { cgpa_total } = this.parent;
                    return value <= cgpa_total;
                }
            ),
        cgpa_total: Yup.number()
            .required('CGPA out of is required')
            .positive('Must be a positive number'),
    });

    const [data, setData] = useState();
    const user_id = localStorage.user_id;
    const [tableLoader, setTableLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(null);
    const formik = useFormik({
        initialValues: {
            degree_title: update?.degree_title || '',
            institute: update?.institute || '',
            completion_year: update?.completion_year || '',
            cgpa_obtained: update?.cgpa_obtained || '',
            cgpa_total: update?.cgpa_total || '',
            user_id: user_id,
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            if (update) {
                try {
                    const response = await axiosInstance.post(`api/job_seeker_education_institute/update/${update?.id}`, values);
                    if (response) {
                        toast.success("Education Data Saved")
                        formik.resetForm();
                    }
                } catch (error) {
                    handleError(error);
                } finally {
                    fetchData()
                    setUpdate(null)
                    setEditEducation(false);
                }
            }
            else {
                try {
                    const response = await axiosInstance.post(`api/job_seeker_education_institute/store`, values);
                    if (response) {
                        toast.success("Education Data Saved")
                        formik.resetForm();
                    }
                } catch (error) {
                    handleError(error);
                } finally {
                    fetchData()
                    setUpdate(null)
                    setEditEducation(false);
                }
            }
        },
    });

    const fetchData = async () => {
        setTableLoader(true)
        try {
            const response = await axiosInstance.get(`api/job_seeker_education_institute?user_id=${user_id}`);
            if (response) {
                setData(response?.data)
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false)
            setEditEducation(false);
            setTableLoader(false);
        }
    }
    const [isDelete, setIsDelete] = useState(false)
    const [endpoint, setEndpoint] = useState()
    const deleteHandler = (data) => {
        setEndpoint(`api/job_seeker_education_institute/destroy/${data?.id}`)
        setIsDelete(true)
    }
    const closeDeleteModal = () => {
        setIsDelete(false);
        fetchData();
    }
    // useEffect(() => {
    //     fetchData();
    // }, [isDelete]);

    const updateEducation = (item) => {
        setEditEducation(true)
        setUpdate(item)
    }

    return (
        <>
            <div className="flex justify-center sm:px-0">
                <DeleteModal
                    isOpen={isDelete}
                    onClose={closeDeleteModal}
                    name="Education"
                    endpoint={endpoint}
                />
                <AddCoursework isOpen={isModalOpen} onClose={closeModal} success={ToastSuccess} error={ToastError} />
                <Toaster richColors />
                <div className="p-4 w-full max-w-5xl">
                    <div className={`border rounded-md shadow-lg ${Education ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 border-b cursor-pointer text-orange-600 bg-white"
                        // onClick={handleEducation}
                        >
                            <h3 className="font-bold text-xl">Education</h3>
                            <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                                {Education ? (
                                    <PlusIcon onClick={() => {
                                        handleEducation();
                                        fetchData();
                                    }} className="block h-6 w-6 text-blue-500 hover:scale-[160%] duration-300" />
                                ) : (
                                    <MinusIcon onClick={() => {
                                        handleEducation();
                                    }} className="block h-6 w-6 text-red hover:scale-[160%] duration-300" />
                                )}
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className={`relative space-y-2 overflow-x-hidden bg-white transition-all duration-300 ease-in-out ${Education ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {/* Edit Button in Body */}


                            {/* Profile Information */}
                            {tableLoader ? (
                                <Skeleton />
                            ) : (
                                <>
                                    {!editEducation && !Education && (
                                        (data?.length > 0 ? (
                                            data.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-col sm:flex-row sm:justify-between border-b p-4 sm:items-center relative"
                                                >
                                                    {/* Action Buttons */}
                                                    <div className="flex sm:absolute sm:right-4 sm:top-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => updateEducation(item)}
                                                            className="hover:bg-gray-100 rounded-full p-1 focus:outline-none transition-colors"
                                                        >
                                                            <PencilIcon className="h-5 w-5 text-blue-500" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteHandler(item)}
                                                            className="hover:bg-gray-100 rounded-full file:p-1 focus:outline-none transition-colors"
                                                        >
                                                            <TrashIcon className="h-5 w-5 text-red-600" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            // onClick={() => ()}
                                                            className="hover:bg-gray-100 rounded-full p-1 focus:outline-none transition-colors"
                                                        >
                                                            <EyeIcon className="h-6 w-6 text-black-600" />
                                                        </button>
                                                        <Button
                                                            type="button"
                                                            color="gradient"
                                                            variant="outline"
                                                            onClick={() => openModal()}
                                                            className="hidden sm:block"
                                                        >
                                                            Add Course
                                                        </Button>
                                                    </div>

                                                    {/* Education Information */}
                                                    <div className="flex flex-col gap-1">
                                                        <h4 className="font-semibold text-lg">{item?.institute}</h4>
                                                        <p className="text-gray-700">
                                                            {item?.degree_title} - {item?.completion_year}
                                                        </p>
                                                        <p className="text-gray-600">
                                                            CGPA {item?.cgpa_obtained} out of {item?.cgpa_total}
                                                        </p>
                                                    </div>

                                                    {/* Add Course Button for Small Screens */}
                                                    <Button
                                                        type="button"
                                                        color="gradient"
                                                        variant="outline"
                                                        onClick={() => openModal()}
                                                        className="block sm:hidden mt-2"
                                                    >
                                                        Add Course
                                                    </Button>
                                                </div>

                                            ))
                                        ) : (
                                            <div>No Educations have been added yet</div>
                                        ))
                                    )}


                                    {/* Add Course Button */}
                                    {!editEducation && (
                                        <div className=" flex justify-center">

                                            <div className="mt-4 flex justify-center py-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditEducation(true)}
                                                    className="bg-orange-600 hover:bg-orange-600 rounded-full p-1 text-white shadow-md transition-all"
                                                >
                                                    <PlusIcon className=" h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Edit Profile Form */}
                            {editEducation && (
                                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Degree Title Dropdown */}
                                        <div>
                                            <label htmlFor="degree_title" className="block text-sm font-medium text-gray-900">
                                                Degree Title *
                                            </label>
                                            <input
                                                type="text"
                                                id="degree_title"
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                value={formik.values.degree_title}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.degree_title && formik.errors.degree_title && (
                                                <div className="text-sm text-red-500 mt-1">{formik.errors.degree_title}</div>
                                            )}
                                        </div>

                                        {/* Institute Dropdown */}
                                        <div>
                                            <label htmlFor="institute" className="block text-sm font-medium text-gray-900">
                                                Institute *
                                            </label>
                                            <input
                                                type="text"
                                                id="institute"
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                value={formik.values.institute}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.institute && formik.errors.institute && (
                                                <div className="text-sm text-red-500 mt-1">{formik.errors.institute}</div>
                                            )}
                                        </div>

                                        {/* Completion Year Dropdown */}
                                        <div>
                                            <label htmlFor="completion_year" className="block text-sm font-medium text-gray-900">
                                                Completion Year *
                                            </label>
                                            <input
                                                type="number"
                                                id="completion_year"
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                value={formik.values.completion_year}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.completion_year && formik.errors.completion_year && (
                                                <div className="text-sm text-red-500 mt-1">{formik.errors.completion_year}</div>
                                            )}
                                        </div>

                                        {/* CGPA Obtained and Out Of */}
                                        <div>
                                            <label htmlFor="completion_year" className="block text-sm font-medium text-gray-900">
                                                CGPA Obtained*
                                            </label>
                                            <input
                                                type="text"
                                                id="cgpa_obtained"
                                                name="cgpa_obtained"
                                                placeholder="Obtained"
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                // className={`block py-1.5 px-3 border ${formik.touched.cgpa_obtained && formik.errors.cgpa_obtained
                                                //     ? 'border-red-500'
                                                //     : 'border-gray-300'
                                                //     } text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2`}
                                                value={formik.values.cgpa_obtained}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.cgpa_obtained && formik.errors.cgpa_obtained && (
                                                <div className="text-sm text-red-500 mt-1">{formik.errors.cgpa_obtained}</div>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="cgpa" className="block text-sm font-medium text-gray-900">
                                                CGPA Out Of *
                                            </label>
                                            <input
                                                type="text"
                                                id="cgpa_total"
                                                name="cgpa_total"
                                                placeholder="Out Of"
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                // className={`block py-1.5 px-3 border ${formik.touched.cgpa_total && formik.errors.cgpa_total
                                                //     ? 'border-red-500'
                                                //     : 'border-gray-300'
                                                //     } text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500`}
                                                value={formik.values.cgpa_total}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.cgpa_total && formik.errors.cgpa_total && (
                                                <div className="text-sm text-red-500 mt-1">{formik.errors.cgpa_total}</div>
                                            )}
                                        </div>


                                    </div>

                                    {/* Action Buttons */}
                                    {loading ? <div className="flex justify-center mr-5"><InfinitySpin width={150} color="green" /></div> :
                                        <div className="flex justify-center gap-4 mt-5">
                                            <Button type="submit" color="gradient" variant="solid">
                                                Save
                                            </Button>
                                            <Button
                                                type="button"
                                                color="red"
                                                variant="outline"
                                                onClick={() => {
                                                    setEditEducation(false)
                                                    setUpdate(null)
                                                }}
                                            >
                                                Cancel
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

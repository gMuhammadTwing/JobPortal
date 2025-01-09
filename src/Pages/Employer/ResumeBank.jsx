import {
    CalendarIcon,
    AdjustmentsVerticalIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { Switch } from "@headlessui/react";
import axiosInstance, { handleError } from "../../axiosInstance";
import { LoaderTable } from "../../Components/LoaderTable";
import Pagination from "../../Components/Pagination";
import { useFormik } from "formik";
import { useDropdownContext } from "../../DropdownProvider";
import { Link } from "react-router-dom";
import Select from 'react-select'
export default function ResumeBank() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false)
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUpdateData(null)
    };

    const [data, setData] = useState([])
    const [updateData, setUpdateData] = useState(null);
    const user_id = localStorage.user_id;
    const dropDownValues = useDropdownContext();
    const [tableLoader, setTableLoader] = useState(false);
    const [filters, setFilters] = useState({
        occupation: "",
        year_from: "",
        year_to: "",
        institute: "",
        job_status: "",
    })
    const fetchData = async (page, filters) => {
        setTableLoader(true)
        try {
            const response = await axiosInstance.get(`/api/employer_resume_bank?occupation=${filters?.occupation}&year_from=${filters?.year_from}&year_to=${filters?.year_to}&institute=${filters?.institute}&job_status=${filters?.job_status}&page=${page}`);
            if (response) {
                setData(response?.data)
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false)
        }
    }
    const [endpoint, setEndpoint] = useState()
    useEffect(() => {
        fetchData(1, filters);
    }, []);

    const pageNumber = async (pageNum) => {
        fetchData(pageNum, filters);
    }
    const formik = useFormik({
        initialValues: {
            occupation: "",
            year_from: "",
            year_to: "",
            institute: "",
            job_status: "",
        },
        onSubmit: async (values) => {
            setFilters(values);
            fetchData(1, values);

        },
    });

    const clearFilter = () => {
        formik.resetForm();
        setFilters({
            occupation: "",
            year_from: "",
            year_to: "",
            institute: "",
            job_status: "",
        })
        fetchData(1, {
            occupation: "",
            year_from: "",
            year_to: "",
            institute: "",
            job_status: "",
        })
    }
    return (
        <div className="container mx-auto max-w-5xl min-h-screen mt-4">
            <div className="pb-15">
                <Toaster richColors />
                <form onSubmit={formik.handleSubmit} className="bg-white border rounded-lg p-4 mb-2">
                    <div className="py-2 px-1 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                        <div className="col-span-full text-[#ff0000] mb-5 font-bold text-xl">Manage Resume Bank</div>
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Year From
                            </label>
                            <input
                                type="number"
                                name="year_from"
                                id="year_from"
                                onChange={formik.handleChange}
                                value={formik.values.year_from}
                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Year To
                            </label>
                            <input
                                type="number"
                                name="year_to"
                                id="year_to"
                                onChange={formik.handleChange}
                                value={formik.values.year_to}
                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Occupation
                            </label>
                            <Select
                                options={dropDownValues?.job_family.map((value) => ({
                                    value: value.id,
                                    label: value.occupation,
                                }))}
                                isClearable={true}
                                isSearchable={true}
                                className=" text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                onChange={(selectedOption) => {
                                    formik.setFieldValue(
                                        "occupation",
                                        selectedOption ? selectedOption.value : ""
                                    );
                                }}
                            />
                            {/* <select
                                name="occupation"
                                onChange={formik.handleChange}
                                value={formik.values.occupation}
                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                            >
                                <option value="">Select</option>
                                {dropDownValues?.job_family?.map((item) => {
                                    return (
                                        <option key={item.id} value={item?.id}>
                                            {item?.occupation}
                                        </option>
                                    );
                                })}
                            </select> */}
                        </div>

                        {/* Institute */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Institute
                            </label>
                            <input
                                type="text"
                                name="institute"
                                onChange={formik.handleChange}
                                value={formik.values.institute}
                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                            />
                        </div>
                        <div className="sm:col-span-2 mt-2 flex gap-2">
                            <button
                                onClick={clearFilter}
                                type="button"
                                className="flex mt-5 border border-gray-300 p-[5px] px-5 rounded-lg hover:bg-[#ff0000] hover:text-white"
                            >
                                Clear Filter
                            </button>
                            <button
                                type="submit"
                                className="flex mt-5 border bg-[#ff0000] p-[5px] px-5 rounded-lg hover:border-[#ff0000] text-white"
                            >
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </form>
                {tableLoader ? <LoaderTable /> :
                    <>

                        <div className="overflow-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-white hidden sm:table-header-group">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                    Applicant Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                    Applicant Email
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {data?.data?.length > 0 ? (
                                                data?.data?.map((item, index) => (
                                                    <tr
                                                        key={index}
                                                        className="flex flex-col sm:table-row sm:flex-row sm:items-center"
                                                    >
                                                        <td className="py-5.5 pl-4 pr-3 text-smsm:pl-6">
                                                            {item?.unique_name}
                                                        </td>
                                                        <td className="py-4 pl-4 pr-3 text-smsm:pl-6">
                                                            <h1 className="text-blue-500 font-semibold">
                                                                {item?.email}
                                                            </h1>
                                                        </td>

                                                        <td className="py-4 pl-4 pr-3 text-smsm:pl-6">
                                                            <Link to={"view-applicant/" + item?.id}><EyeIcon className="w-5 h-5 cursor-pointer" title="View" /></Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center py-4">
                                                        <span className="inline-flex text-xl items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                            No Record Found
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
                }
                <div className="mt-2">
                    <Pagination page={pageNumber} total={data?.total} page_size={data?.per_page} />
                </div>
            </div>
        </div>

    );
}

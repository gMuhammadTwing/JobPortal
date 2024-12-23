import { ArrowDownCircleIcon, ArrowDownOnSquareIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon, EllipsisVerticalIcon, EnvelopeIcon, MagnifyingGlassCircleIcon, PhoneIcon, PlusCircleIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { Button } from '../../Components/Button';
import { toast, Toaster } from 'sonner';
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { InfinitySpin } from 'react-loader-spinner';
import ReactQuill from 'react-quill';
import axiosInstance, { handleError } from '../../axiosInstance';
import { LoaderTable } from '../../Components/LoaderTable';
import Pagination from '../../Components/Pagination';
import { useDropdownContext } from '../../DropdownProvider';
export default function ManageJobs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const dropDownValues = useDropdownContext();
  const user_id = localStorage.user_id;
  const company_id = localStorage?.company_id;
  const [tableLoader, setTableLoader] = useState(false);
  const parser = new DOMParser();
  const [data, setData] = useState();
  const [updateData, setUpdateData] = useState(null);
  const formik = useFormik({
    initialValues: {
      job_title: updateData?.job_title || "",
      job_type: updateData?.job_type?.id || "",
      job_description: updateData?.job_description || "",
      job_qualification: updateData?.job_qualification || "",
      job_responsibilities: updateData?.job_responsibilities || "",
      expected_salary: updateData?.expected_salary || "",
      location: updateData?.location || "",
      job_status: updateData?.job_status?.id,
      veritas_to_short_list: updateData?.veritas_to_short_list,
      job_instructions_to_apply: updateData?.job_instructions_to_apply || "",
      user_id: user_id,
      company_id: company_id,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      job_title: Yup.string().required("Job title is required"),
      job_type: Yup.string().required("Job type is required"),
      expected_salary: Yup.string().required("Salary range is required"),
      location: Yup.string().required("Location is required"),
      job_status: Yup.string().required("Job status is required"),
      // veritas_to_short_list: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values) => {
      setTableLoader(true);
      if (updateData) {
        try {
          const response = await axiosInstance.post(`api/employer_company_job_posting/update/${updateData?.id}`, values);
          if (response) {
            toast.success("Job Record updated")

          }
        } catch (error) {
          handleError(error);
        } finally {
          closeModal();
          fetchData(1)
          setUpdateData(null)
          formik.resetForm();
        }
      }
      else {
        try {
          const response = await axiosInstance.post(`api/employer_company_job_posting/store`, values);
          if (response) {
            toast.success("Job Record created")
            closeModal();
            formik.resetForm();

          }
        } catch (error) {
          handleError(error);
        } finally {
          fetchData(1)
          setTableLoader(false);
        }
      }
    },
  });

  const fetchData = async (page) => {
    if (company_id != "undefined") {
      setTableLoader(true);
      try {
        const response = await axiosInstance.get(`api/employer_company_job_posting?user_id=${user_id}&company_id=${company_id}&page=${page}`);
        if (response) {
          setData(response.data)
          console.log(response.data);

        }
      } catch (error) {
        handleError(error);
      } finally {
        setTableLoader(false)
      }
    }
  }
  useEffect(() => {
    fetchData(1);
  }, []);

  const update = (item) => {
    openModal();
    setUpdateData(item)
  }
  const [view, setView] = useState(false);
  const viewDetails = (item) => {
    openModal();
    setUpdateData(item)
    setView(true)
  }
  const pageNumber = (pageNum) => {
    fetchData(pageNum);
  };

  return (
    <>
      <div className=" mx-auto bg-gray-100 lg:px-8 max-w-5xl pb-15 mb-8 min-h-screen">
        {!isModalOpen && (
          <div>
            <div className="">
              <h2 className="text-4xl font-semibold tracking-tight text-[#ff0000] sm:text-5xl text-center m-2">Manage Jobs</h2>
              {company_id != "undefined" ? (
                <div>
                  <Button
                    type="button"
                    color="gradient"
                    variant="solid"
                    className={"mb-4"}
                    onClick={() => {
                      setUpdateData(null)
                      openModal()
                    }}
                  >
                    <PlusCircleIcon className="w-6 h-6 text-white" />
                    Create New Job</Button>
                </div>
              ) :
                (<div className='text-red font-semibold border text-center mt-10 bg-red-100 border-red-100'>Please Update Profile Information First</div>)
              }
              {/* <p className="mt-2 text-lg text-gray-600">Find your dream job among these opportunities.</p> */}
            </div>
            {company_id != "undefined" && (
              tableLoader ? <LoaderTable /> :
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-1 lg:grid-cols-1">
                  {data?.data?.length > 0 ? (
                    data?.data?.map((item) => (
                      <>
                        <article className="border rounded-lg p-4 shadow bg-white">
                          {/* Post Date and Category */}
                          <div className="flex flex-wrap items-center justify-between text-xs sm:gap-x-4">
                            <span
                              className={`relative rounded-full px-3 py-1.5 font-medium ${item?.job_status?.id === 1
                                ? "bg-green-100 text-green-600 hover:bg-green-100"
                                : "bg-red-100 text-red-600 hover:bg-red-100"
                                }`}
                            >
                              {item?.job_status?.id === 1 ? "Open" : "Closed"}
                            </span>

                            <h3 className="text-xl font-semibold text-gray-900 items-center text-center">Job Title: {item?.job_title}</h3>
                            <div className="flex flex-wrap sm:flex-row gap-2">
                              <button onClick={() => viewDetails(item)} className="bg-red-50 text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                View Details
                              </button>
                              <button
                                onClick={() => update(item)}
                                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out"
                              >
                                Update Details
                              </button>
                            </div>
                          </div>

                          {/* Title and Description */}
                          <div className="mt-3 border-t p-2">
                            {/* <h3 className="text-xl font-semibold text-gray-900 items-center text-center">Job Title: {item?.job_title}</h3> */}
                            <p className='mt-2'>Description</p>
                            <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                              {parser.parseFromString(item?.job_description, "text/html").body.textContent.trim()}
                            </p>
                          </div>

                          {/* Additional Info */}
                          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm border-t p-2">
                            <div className="text-gray-600">
                              <span>Job Type</span>
                              <div className="text-black font-semibold">{item?.job_type?.job_family}</div>
                            </div>
                            <div className="text-gray-600">
                              <span>Salary</span>
                              <div className="text-black font-semibold">{item?.expected_salary}</div>
                            </div>
                            <div className="text-gray-600">
                              <span>Location</span>
                              <div className="text-black font-semibold">{item?.location}</div>
                            </div>
                            {/* <div className="text-gray-600">
                              <span>Expiry</span>
                              <div className="text-black font-semibold">4 Days Left</div>
                            </div> */}
                          </div>
                        </article>
                      </>
                    ))
                  ) : (
                    <table className="min-w-full divide-y divide-gray-300 border bg-white">
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          <span className="inline-flex text-xl items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            No Record Found
                          </span>
                        </td>
                      </tr>
                    </table>

                  )}
                  <Pagination
                    page={pageNumber}
                    total={data?.total}
                    page_size={data?.per_page}
                  />
                </div>
            )}
          </div>
        )}

        {isModalOpen && (
          <form onSubmit={formik.handleSubmit} className='border p-4 bg-white mt-3 rounded-lg'>
            {view && (
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  setView(false);
                }
                }
                className='border rounded-full p-1 px-4'
              >
                Back
              </button>
            )}
            <h1
              className=" font-semibold leading-6 text-gray-900 text-center text-2xl pb-5 mt-5"
            >
              {view ? (<div>View Job</div>) : (
                updateData ? "Update Job" : "Add Job"
              )}
            </h1>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              {/* Job Title */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-900">
                  Job Title
                </label>
                <input
                  type="text"
                  name="job_title"
                  onChange={formik.handleChange}
                  value={formik.values.job_title}
                  disabled={view}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                />
                {formik.errors.job_title && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.job_title}</p>
                )}
              </div>

              {/* Job Type */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-900">
                  Job Type
                </label>
                <select
                  name="job_type"
                  onChange={formik.handleChange}
                  disabled={view}
                  value={formik.values.job_type}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                >
                  <option value="">Select</option>
                  {dropDownValues?.job_family?.map((item) => {
                    return (
                      <option key={item.id} value={item?.id}>
                        {item?.job_family}
                      </option>
                    );
                  })}
                </select>
                {formik.errors.job_type && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.job_type}</p>
                )}
              </div>
              {/* Salary Range */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-900">
                  Salary Range
                </label>
                <input
                  type="text"
                  name="expected_salary"
                  onChange={formik.handleChange}
                  value={formik.values.expected_salary}
                  disabled={view}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                />
                {formik.errors.expected_salary && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.expected_salary}</p>
                )}
              </div>

              {/* Location */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-900">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                  disabled={view}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                />
                {formik.errors.location && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.location}</p>
                )}
              </div>

              {/* Job Status */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-900">
                  Job Status
                </label>
                <select
                  name="job_status"
                  onChange={formik.handleChange}
                  value={formik.values.job_status}
                  disabled={view}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                >
                  <option value="">Select</option>
                  <option value={1}>Open</option>
                  <option value={0}>Closed</option>
                </select>
                {formik.errors.job_status && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.job_status}</p>
                )}
              </div>


              {/* Veritas To Shortlist */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-900">
                  Veritas To Shortlist
                </label>
                <select
                  name="veritas_to_short_list"
                  onChange={formik.handleChange}
                  disabled={view}
                  value={formik.values.veritas_to_short_list}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                >
                  <option value="">Select</option>
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </select>
                {formik.errors.veritas_to_short_list && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.veritas_to_short_list}
                  </p>
                )}
              </div>
              {/* Job Description */}
              <div className="sm:col-span-full">
                <label className="block text-sm font-medium text-gray-900">
                  Job Description
                </label>
                <ReactQuill
                  id="job_description"
                  theme="snow"
                  value={formik.values.job_description}
                  readOnly={view}
                  onChange={(value) => formik.setFieldValue("job_description", value)}
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
                  placeholder="Write something"
                />
                {formik.errors.job_description && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.job_description}</p>
                )}
              </div>

              {/* Job_qualification */}
              <div className="sm:col-span-full mt-7">
                <label className="block text-sm font-medium text-gray-900">
                  Job Qualification
                </label>
                <ReactQuill
                  id="job_qualification"
                  readOnly={view}
                  theme="snow"
                  value={formik.values.job_qualification}
                  onChange={(value) => formik.setFieldValue("job_qualification", value)}
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
                  placeholder="Write something"
                />
                {formik.errors.job_qualification && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.job_qualification}</p>
                )}
              </div>
              <div className="sm:col-span-full mt-7">
                <label className="block text-sm font-medium text-gray-900">
                  Job Responsibilities
                </label>
                <ReactQuill
                  id="job_responsibilities"
                  theme="snow"
                  readOnly={view}
                  value={formik.values.job_responsibilities}
                  onChange={(value) => formik.setFieldValue("job_responsibilities", value)}
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
                  placeholder="Write something"
                />
                {formik.errors.job_responsibilities && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.job_responsibilities}</p>
                )}
              </div>

              {/* Instruction to Apply */}
              <div className="sm:col-span-full mt-7">
                <label className="block text-sm font-medium text-gray-900">
                  Instruction to Apply
                </label>
                <ReactQuill
                  id="job_instructions_to_apply"
                  theme="snow"
                  readOnly={view}
                  value={formik.values.job_instructions_to_apply}
                  onChange={(value) => formik.setFieldValue("job_instructions_to_apply", value)}
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
                  placeholder="Write something"
                />
                {formik.errors.job_instructions_to_apply && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.job_instructions_to_apply}
                  </p>
                )}
              </div>

            </div>


            <div className="mt-15 sm:mt-15 sm:flex sm:flex-row-reverse">
              {!view && (
                formik.isSubmitting ? (
                  <InfinitySpin height={120} width={120} color="green" />
                ) : (
                  <>
                    <Button type="submit" color="gradient" variant="solid">
                      Save
                    </Button>
                    <Button
                      type="button"
                      onClick={() => closeModal()}
                      color="gradient"
                      variant="outline"
                      className="mr-1"
                    >
                      Cancel
                    </Button>
                  </>
                )
              )}
            </div>

          </form>
        )}

      </div>
    </>
  );
};


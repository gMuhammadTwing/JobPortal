import { ArrowDownCircleIcon, ArrowDownOnSquareIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon, EllipsisVerticalIcon, EnvelopeIcon, MagnifyingGlassCircleIcon, PhoneIcon, PlusCircleIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { Button } from '../../Components/Button';
import { toast, Toaster } from 'sonner';
import AddJob from './AddJob';
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { DialogTitle } from '@headlessui/react';
import { FallingLines } from 'react-loader-spinner';
import ReactQuill from 'react-quill';
export default function ManageJobs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const ToastSuccess = (str) => toast.success(str);
  const ToastError = (str) => toast.error(str);
  const posts = [
    {
      "id": 1,
      "title": "Boost your conversion rate",
      "href": "#",
      "description": "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      "date": "Mar 16, 2020",
      "datetime": "2020-03-16",
      "category": {
        "title": "Sales",
        "href": "#"
      },
      "expectedSalary": "100K - 120K",
      "skills": [
        "HTML",
        "JavaScript",
        "React JS"
      ],
      "experienceRequired": "3+ Years",
      "location": "Islamabad"
    },
    {
      "id": 2,
      "title": "Frontend Developer - React",
      "href": "#",
      "description": "We are looking for a talented Frontend Developer to join our team and work with cutting-edge technologies to build modern web applications.",
      "date": "Mar 20, 2020",
      "datetime": "2020-03-20",
      "category": {
        "title": "Software Development",
        "href": "#"
      },
      "expectedSalary": "80K - 100K",
      "skills": [
        "React JS",
        "HTML",
        "CSS3"
      ],
      "experienceRequired": "2+ Years",
      "location": "Lahore"
    },
    {
      "id": 3,
      "title": "Senior Frontend Developer - React JS",
      "href": "#",
      "description": "We are looking for a senior developer with extensive experience in React JS to lead our frontend development team and build scalable web applications.",
      "date": "Mar 22, 2020",
      "datetime": "2020-03-22",
      "category": {
        "title": "Engineering",
        "href": "#"
      },
      "expectedSalary": "120K - 150K",
      "skills": [
        "React JS",
        "Redux",
        "JavaScript",
        "CSS3"
      ],
      "experienceRequired": "5+ Years",
      "location": "Karachi"
    },
  ]
  const formik = useFormik({
    initialValues: {
      job_title: "",
      job_type: "",
      job_description: "",
      qualifications: "",
      responsibilities: "",
      salary_range: "",
      location: "",
      job_status: "",
      date_posted: "",
      expiration_date: "",
      veritasto_shortlist: "",
      instruction_to_apply: "",
    },
    validationSchema: Yup.object({
      job_title: Yup.string().required("Job title is required"),
      job_type: Yup.string().required("Job type is required"),
      job_description: Yup.string().required("Job description is required"),
      qualifications: Yup.string().required("Qualifications are required"),
      responsibilities: Yup.string().required("Responsibilities are required"),
      salary_range: Yup.string().required("Salary range is required"),
      location: Yup.string().required("Location is required"),
      job_status: Yup.string().required("Job status is required"),
      date_posted: Yup.date().required("Date posted is required"),
      expiration_date: Yup.date().required("Expiration date is required"),
      instruction_to_apply: Yup.string().required("Instructions to apply are required"),
      veritasto_shortlist: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("Form submitted:", values);
        toast.success("Job added successfully");
        closeModal();
      } catch (err) {
        console.error("Error submitting form:", err);
        toast.error("Failed to add job");
      } finally {
        formik.resetForm();
      }
    },
  });
  return (
    <>
      <div className=" mx-auto bg-gray-100 lg:px-8 max-w-5xl pb-15 mb-8">
        {/* <AddJob isOpen={isModalOpen} onClose={closeModal} success={ToastSuccess} error={ToastError} /> */}
        <Toaster richColors />
        {!isModalOpen && (
          <div>
            <div className="">
              <h2 className="text-4xl font-semibold tracking-tight text-orange-500 sm:text-5xl text-center m-2">Manage Jobs</h2>
              <div>
                <Button
                  type="button"
                  color="gradient"
                  variant="solid"
                  className={"mb-4"}
                  onClick={() => openModal()}
                >
                  <PlusCircleIcon className="w-6 h-6 text-white" />
                  Create New Job</Button>
              </div>
              {/* <p className="mt-2 text-lg text-gray-600">Find your dream job among these opportunities.</p> */}
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-1">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col items-start justify-between border rounded-lg p-4 shadow bg-white"
                >
                  {/* Post Date and Category */}
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.datetime} className="text-gray-500">
                      {post.date}
                    </time>
                    <a
                      href={post.category.href}
                      className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.category.title}
                    </a>
                  </div>

                  {/* Title and Description */}
                  <div className="">
                    <div className="mt-3 flex justify-between">
                      <span className="text-2xl font-semibold">{post.title}</span>
                      <button className="bg-orange-50 text-orange-600 p-2 px-5 rounded-lg hover:bg-orange-600 hover:text-white transition duration-200 ease-in-out">
                        View Details
                      </button>
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                      {post.description}
                    </p>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-4 space-x-10 flex">
                    <div className="text-sm text-gray-600">
                      <span>Experience</span>
                      <div className="text-black font-semibold text-[1.1rem]">
                        {post.experienceRequired}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>Salary</span>
                      <div className="text-black font-semibold text-[1.1rem]">
                        {post.expectedSalary}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>Location</span>
                      <div className="text-black font-semibold text-[1.1rem]">
                        {post.location}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>Expiry</span>
                      <div className="text-black font-semibold text-[1.1rem]">
                        4 Days left
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {isModalOpen && (
          <form onSubmit={formik.handleSubmit} className='border p-4 bg-white'>
            <h1
              className=" font-semibold leading-6 text-gray-900 text-center text-2xl pb-5 mt-5"
            >
              Add Job
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
                  value={formik.values.job_type}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                >
                  <option value="">Select</option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
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
                  name="salary_range"
                  onChange={formik.handleChange}
                  value={formik.values.salary_range}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                />
                {formik.errors.salary_range && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.salary_range}</p>
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
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                >
                  <option value="">Select</option>
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                </select>
                {formik.errors.job_status && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.job_status}</p>
                )}
              </div>

              {/* Date Posted */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-900">
                  Date Posted
                </label>
                <input
                  type="date"
                  name="date_posted"
                  onChange={formik.handleChange}
                  value={formik.values.date_posted}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                />
                {formik.errors.date_posted && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.date_posted}</p>
                )}
              </div>

              {/* Expiration Date */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-900">
                  Expiration Date
                </label>
                <input
                  type="date"
                  name="expiration_date"
                  onChange={formik.handleChange}
                  value={formik.values.expiration_date}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                />
                {formik.errors.expiration_date && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.expiration_date}
                  </p>
                )}
              </div>


              {/* Veritas To Shortlist */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-900">
                  Veritas To Shortlist
                </label>
                <select
                  name="veritasto_shortlist"
                  onChange={formik.handleChange}
                  value={formik.values.veritasto_shortlist}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {formik.errors.veritasto_shortlist && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.veritasto_shortlist}
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
                  onChange={formik.handleChange}
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
                {/* <textarea
                  name="job_description"
                  onChange={formik.handleChange}
                  value={formik.values.job_description}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                  rows={4}
                /> */}
                {formik.errors.job_description && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.job_description}</p>
                )}
              </div>

              {/* Qualifications */}
              <div className="sm:col-span-full mt-7">
                <label className="block text-sm font-medium text-gray-900">
                  Qualifications
                </label>
                <ReactQuill
                  id="qualifications"
                  theme="snow"
                  value={formik.values.qualifications}
                  onChange={formik.handleChange}
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
                {/* <textarea
                  name="qualifications"
                  onChange={formik.handleChange}
                  value={formik.values.qualifications}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                  rows={4}
                /> */}
                {formik.errors.qualifications && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.qualifications}</p>
                )}
              </div>

              {/* Responsibilities */}
              <div className="sm:col-span-full mt-7">
                <label className="block text-sm font-medium text-gray-900">
                  Responsibilities
                </label>
                <ReactQuill
                  id="responsibilities"
                  theme="snow"
                  value={formik.values.responsibilities}
                  onChange={formik.handleChange}
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
                {/* <textarea
                  name="responsibilities"
                  onChange={formik.handleChange}
                  value={formik.values.responsibilities}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                  rows={4}
                /> */}
                {formik.errors.responsibilities && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.responsibilities}</p>
                )}
              </div>

              {/* Instruction to Apply */}
              <div className="sm:col-span-full mt-7">
                <label className="block text-sm font-medium text-gray-900">
                  Instruction to Apply
                </label>
                <ReactQuill
                  id="instruction_to_apply"
                  theme="snow"
                  value={formik.values.instruction_to_apply}
                  onChange={formik.handleChange}
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
                {/* <textarea
                  name="instruction_to_apply"
                  onChange={formik.handleChange}
                  value={formik.values.instruction_to_apply}
                  className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                  rows={4}
                /> */}
                {formik.errors.instruction_to_apply && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.instruction_to_apply}
                  </p>
                )}
              </div>

            </div>

            <div className="mt-15 sm:mt-15 sm:flex sm:flex-row-reverse">
              {formik.isSubmitting ? (
                <FallingLines height={40} width={40} color="purple" />
              ) : (
                <Button type="submit" color="gradient" variant="solid">
                  Save
                </Button>
              )}
              <Button
                type="button"
                onClick={() => closeModal()}
                color="gradient"
                variant="outline"
                className="mr-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

      </div>
    </>
  );
};


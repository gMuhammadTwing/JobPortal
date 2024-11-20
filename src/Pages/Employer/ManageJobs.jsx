import { ArrowDownCircleIcon, ArrowDownOnSquareIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon, EllipsisVerticalIcon, EnvelopeIcon, MagnifyingGlassCircleIcon, PhoneIcon, PlusCircleIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { Button } from '../../Components/Button';
import { toast, Toaster } from 'sonner';
import AddJob from '../../Components/Employer/AddJob';
import { useState } from 'react';
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
  return (
    <>
      <div className=" mx-auto bg-gray-100 max-w-7xl py-6 px-6 lg:px-8">
      <AddJob isOpen={isModalOpen} onClose={closeModal} success={ToastSuccess} error={ToastError} />
      <Toaster richColors />
        <div className=" ">
          <h2 className="text-4xl font-semibold tracking-tight text-orange-500 sm:text-5xl text-center m-2">Manage Jobs</h2>
          <div>
            <Button
              type="button"
              color="gradient"
              variant="solid"
              className={"mb-4"}
            onClick={()=>openModal()}
            >
              <PlusCircleIcon className="w-6 h-6 text-white" />
              Create New Job</Button>
          </div>
          {/* <p className="mt-2 text-lg text-gray-600">Find your dream job among these opportunities.</p> */}
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col items-start justify-between border rounded-lg p-4 shadow bg-white border-transparent hover:border-orange-500"
            >
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
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm text-gray-600">{post.description}</p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="text-sm text-gray-600">
                  <strong>Experience:</strong>
                  <a className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {post.experienceRequired}
                  </a>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Salary:</strong> {post.expectedSalary}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Location:</strong> {post.location}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Skills:</strong>
                  {post.skills.map((skill) => (
                    <a
                      key={skill}
                      className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-sm text-gray-500 hover:bg-gray-100"
                    >
                      {skill}
                    </a>
                  ))}
                </div>
                <div className="py-2 flex gap-2">
                  {/* <div className=""> */}
                    <Button
                      type="button"
                      color="blue"
                      variant="outline"
                      className={""}
                    // onClick={()=>openModal()}
                    >
                      {/* <ArrowDownCircleIcon aria-hidden="true" className="size-5 text-gray-400" /> */}
                      View
                    </Button>
                    <Button
                      type="button"
                      color="gradient"
                      variant="outline"
                      className={""}
                    // onClick={()=>openModal()}
                    >
                      {/* <ViewColumnsIcon aria-hidden="true" className="size-5 text-gray-400" /> */}
                      Update
                    </Button>
                  {/* </div> */}
                  <div className="">
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


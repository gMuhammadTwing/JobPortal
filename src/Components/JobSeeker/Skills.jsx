import { MinusIcon, PlusIcon, PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Button } from "../../Components/Button";
import userLogo from '../../assets/user.jpeg'
import axiosInstance, { handleError } from "../../axiosInstance";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { InfinitySpin } from "react-loader-spinner";
export default function Skills() {
    const [skill, setSkill] = useState(false);
    const [editSkill, setEditSkill] = useState(false);
    const handleSkill = () => {
        setSkill(!skill);
        if (!skill) {
            setEditSkill(false);
        }
    };
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const user_id = localStorage.user_id;
    const formik = useFormik({
        initialValues: {
            skill: '',
            skill_experience: '',
            user_id: user_id,
        },
        validationSchema: Yup.object({
            skill: Yup.string().required("Skill Name is required"),
            skill_experience: Yup.string().required("Skill Experience is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await axiosInstance.post(`api/job_seeker_skills/store`, values);
                if (response) {
                    toast.success("Skill Data Saved")
                    formik.resetForm();
                }
            } catch (error) {
                handleError(error);
            } finally {
                fetchData()

            }
        },
    });
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`api/job_seeker_skills?user_id=${user_id}`);
            if (response) {
                setData(response?.data)
                console.log(response?.data);

            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
            setEditSkill(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className="flex justify-center sm:px-0">
                <div className="p-4 w-full max-w-5xl">
                    <div className={`border rounded-md shadow-lg ${skill ? "overflow-hidden" : ""}`}>
                        {/* Header Section */}
                        <div
                            className="flex justify-between items-center p-4 text-orange-600 bg-white border-b cursor-pointer"
                            onClick={handleSkill}
                        >
                            <h3 className="font-bold text-xl">Skills</h3>
                            <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                                {skill ? (
                                    <PlusIcon className="block h-6 w-6 text-blue-500 hover:scale-[160%] duration-300" />
                                ) : (
                                    <MinusIcon className="block h-6 w-6 text-red hover:scale-[160%] duration-300" />
                                )}
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className={`relative space-y-2 overflow-x-hidden bg-white transition-all duration-300 ease-in-out ${skill ? "max-h-0 p-0" : "max-h-screen p-4"}`}>
                            {/* Edit Button in Body */}

                            {(!editSkill && !skill) && (
                                data?.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {data.map((item) => (
                                            <div
                                                key={item.id}
                                                className="relative border p-4 rounded-md shadow-sm hover:bg-gray-50 group transition-colors"
                                            >
                                                {/* Action Buttons (Visible on Hover) */}
                                                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditSkill(true)}
                                                        className="hover:bg-gray-200 rounded-full p-2 focus:outline-none transition-colors"
                                                    >
                                                        <PencilIcon className="h-5 w-5 text-blue-500" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => console.log("Delete clicked")}
                                                        className="hover:bg-gray-200 rounded-full p-2 focus:outline-none transition-colors"
                                                    >
                                                        <TrashIcon className="h-5 w-5 text-red-600" />
                                                    </button>
                                                </div>

                                                {/* Skill Information */}
                                                {!editSkill && (
                                                    <div>
                                                        <h4 className="font-semibold text-lg inline-block">{item?.skill}</h4>
                                                        <span className="text-sm text-gray-600"> ({item?.skill_experience_label})</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                ) : (
                                    <div>No Skills have been added yet</div>
                                )
                            )}


                            {!editSkill && (
                                <div className="mt-4 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setEditSkill(true)}
                                        className="bg-orange-600 hover:bg-orange-600 rounded-full p-1 text-white shadow-md transition-all"
                                    >
                                        <PlusIcon className=" h-5 w-5" />
                                    </button>
                                </div>
                            )}

                            {/* Edit Profile Form */}
                            {editSkill && (
                                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        <div>
                                            <label htmlFor="skill" className="block text-sm font-medium text-gray-900">Add a new skill *</label>
                                            <input
                                                type="text"
                                                id="skill"
                                                required
                                                className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                value={formik.values.skill}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.skill && formik.errors.skill && (
                                                <p className="text-red-500 text-sm">{formik.errors.skill}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="skill_experience" className="block text-sm font-medium text-gray-900">Experience with this skill</label>
                                            <select id="skill_experience" name="skill_experience" required className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                                value={formik.values.skill_experience}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option>Select</option>
                                                <option value={"1"}>Beginner</option>
                                                <option value={"2"}>Intermediate</option>
                                                <option value={"3"}>Expert</option>
                                            </select>
                                            {formik.touched.skill_experience && formik.errors.skill_experience && (
                                                <p className="text-red-500 text-sm">{formik.errors.skill_experience}</p>
                                            )}
                                        </div>
                                    </div>

                                    {loading ? <div className="flex justify-center mr-5"><InfinitySpin width={150} color="green" /></div> :
                                        <div className="flex justify-center gap-4 mt-5">
                                            <Button
                                                type="button"
                                                color="gradient"
                                                variant="outline"
                                                onClick={() => setEditSkill(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                color="gradient"
                                                variant="solid"
                                                className="text-white"
                                            >
                                                Save
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
    )
}
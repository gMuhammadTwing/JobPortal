import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    Switch,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FallingLines, InfinitySpin } from "react-loader-spinner";
import { useState } from "react";
import { Button } from "../../../Components/Button";
import axiosInstance, { handleError } from "../../../axiosInstance";
import { toast } from "sonner";
import ReactQuill from "react-quill";

const ApplyInstructionsModal = ({ isOpen, onClose, data }) => {
    const user_id = localStorage.user_id;
    // const parser = new DOMParser();
    // const [loader, setLoader] = useState(false);
    // const formik = useFormik({
    //     initialValues: {
    //         cover_letter: '',
    //         user_id: user_id,
    //         job_id: data?.id
    //     },
    //     enableReinitialize: true,
    //     validationSchema: Yup.object({

    //     }),
    //     onSubmit: async (values) => {
    //         setLoader(true);
    //         try {
    //             const response = await axiosInstance.post(`api/job_application/store`, values);
    //             if (response) {
    //                 toast.success("Job Applied Successfully")
    //                 formik.resetForm();
    //             }
    //         } catch (error) {
    //             handleError(error);
    //         } finally {
    //             setLoader(false);
    //             onClose()
    //         }

    //     },
    // });
    return (
        <Dialog
            open={isOpen}
            onClose={() => onClose(false)}
            className="relative z-10"
        >
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-[40rem] sm:p-6">
                        <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                            <button
                                type="button"
                                onClick={() => onClose(false)}
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <form>
                            <div className="mt-3 sm:mt-0">
                                <DialogTitle
                                    as="h3"
                                    className="text-base font-semibold leading-6 text-gray-900"
                                >
                                    <div className="col-span-full">
                                        <h3 className="text-xl font-semibold text-gray-900 items-start text-start">{data?.job_title} ({data?.expected_salary})</h3>
                                        <p className=''> {data?.company_id?.company_name} , {data?.location}</p>
                                    </div>
                                </DialogTitle>

                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                    <div className="sm:col-span-full">
                                        <label className="block text-sm font-medium text-gray-900">
                                            Job Instructions to Apply
                                        </label>
                                        <ReactQuill
                                            id="instructions"
                                            theme="bubble"
                                            value={data?.job_instructions_to_apply}
                                            // onChange={(value) => formik.setFieldValue("cover_letter", value)}
                                            style={{
                                                height: "250px",
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
                                        />
                                    
                                    </div>
                                </div>
                            </div>

                            {/* <div className="mt-15 sm:flex sm:flex-row-reverse">
                                {loader ? (
                                    <InfinitySpin height={120} width={120} color="green" />
                                ) : (
                                    <>
                                        <Button
                                            type="submit"
                                            color="gradient"
                                            variant="solid"
                                        >
                                            Submit Application
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => onClose(false)}
                                            color="gradient"
                                            variant="outline"
                                            className={"mr-1"}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                )}

                            </div> */}
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default ApplyInstructionsModal;

import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FallingLines } from "react-loader-spinner";
import { useState } from "react";
import { Button } from "../../../Components/Button";

const AddPayment = ({ isOpen, onClose, success, error }) => {
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const formik = useFormik({
        initialValues: {
            subscription_id: "",
            user_id: "",
            payment_reference: "",
            payment_method: "",
            amount_paid: "",
            payment_date: "",
            upload_file: null,
        },
        validationSchema: Yup.object({
            subscription_id: Yup.string().required("Subscription ID is required"),
            user_id: Yup.string().required("User ID is required"),
            payment_reference: Yup.string().required("Payment reference is required"),
            payment_method: Yup.string().required("Payment method is required"),
            amount_paid: Yup.number()
                .required("Amount paid is required")
                .positive("Amount must be positive"),
            payment_date: Yup.date().required("Payment date is required"),
            upload_file: Yup.mixed().required("File is required"),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                formData.append(key, key === "upload_file" ? file : values[key]);
            });

            try {
                // API call to submit data
                console.log("Form submitted:", formData);
                success("Payment added successfully");
                onClose(false);
            } catch (error) {
                console.error("Error submitting form:", error);
                error("Failed to add payment");
            } finally {
                formik.resetForm();
                setFile(null);
            }
        },
    });

    return (
        <Dialog
            open={isOpen}
            onClose={() => onClose(false)}
            className="relative z-10"
        >
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                            <button
                                type="button"
                                onClick={() => onClose(false)}
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <DialogTitle
                                as="h3"
                                className="text-base font-semibold leading-6 text-gray-900"
                            >
                                Add Payment
                            </DialogTitle>
                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-12">
                                {/* Subscription ID */}
                                {/* <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Subscription ID
                                    </label>
                                    <input
                                        type="text"
                                        name="subscription_id"
                                        onChange={formik.handleChange}
                                        value={formik.values.subscription_id}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.subscription_id && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.subscription_id}
                                        </p>
                                    )}
                                </div> */}

                                {/* User ID */}
                                {/* <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        User ID
                                    </label>
                                    <input
                                        type="text"
                                        name="user_id"
                                        onChange={formik.handleChange}
                                        value={formik.values.user_id}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.user_id && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.user_id}
                                        </p>
                                    )}
                                </div> */}

                                {/* Payment Reference */}
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Payment Reference
                                    </label>
                                    <input
                                        type="text"
                                        name="payment_reference"
                                        onChange={formik.handleChange}
                                        value={formik.values.payment_reference}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.payment_reference && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.payment_reference}
                                        </p>
                                    )}
                                </div>

                                {/* Payment Method */}
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Payment Method
                                    </label>
                                    <input
                                        type="text"
                                        name="payment_method"
                                        onChange={formik.handleChange}
                                        value={formik.values.payment_method}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.payment_method && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.payment_method}
                                        </p>
                                    )}
                                </div>

                                {/* Amount Paid */}
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Amount Paid
                                    </label>
                                    <input
                                        type="number"
                                        name="amount_paid"
                                        onChange={formik.handleChange}
                                        value={formik.values.amount_paid}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.amount_paid && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.amount_paid}
                                        </p>
                                    )}
                                </div>

                                {/* Payment Date */}
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Payment Date
                                    </label>
                                    <input
                                        type="date"
                                        name="payment_date"
                                        onChange={formik.handleChange}
                                        value={formik.values.payment_date}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.payment_date && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.payment_date}
                                        </p>
                                    )}
                                </div>

                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        onChange={formik.handleChange}
                                        value={formik.values.status}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    >
                                        <option>Pending</option>
                                        <option>Completed</option>
                                    </select>
                                    {formik.errors.subscription_id && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.subscription_id}
                                        </p>
                                    )}
                                </div>

                                {/* Upload File */}
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Upload File
                                    </label>
                                    <input
                                        type="file"
                                        name="upload_file"
                                        onChange={(event) => {
                                            handleFileChange(event);
                                            formik.setFieldValue("upload_file", event.target.files[0]);
                                        }}
                                        className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                    />
                                    {formik.errors.upload_file && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {formik.errors.upload_file}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                {formik.isSubmitting ? (
                                    <FallingLines height={40} width={40} color="purple" />
                                ) : (
                                    <Button
                                        type="submit"
                                        color="gradient"
                                        variant="solid"
                                    >
                                        Save
                                    </Button>
                                )}
                                <Button
                                    type="button"
                                    onClick={() => onClose(false)}
                                    color="gradient"
                                    variant="outline"
                                    className={"mr-1"}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default AddPayment;

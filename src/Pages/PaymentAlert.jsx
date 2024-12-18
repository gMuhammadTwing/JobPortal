import { Link } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import { Button } from "../Components/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance, { handleError } from "../axiosInstance";
import { toast } from "sonner";
import { InfinitySpin } from "react-loader-spinner";
import { useState } from "react";

export default function PaymentAlert() {
    const [registered, setRegistered] = useState(false);
    const [loader, setLoader] = useState(false);
    return (
        <div className="flex items-center justify-center dark:bg-neutral-700">
            <div className="w-full sm:max-w-md mx-auto p-4 sm:p-6 md:p-10">
                <div className="rounded-lg bg-white border dark:bg-neutral-800 shadow-lg">
                    <div className="p-5">
                        <div className="text-center">
                            <h4 className="mb-4 text-xl font-semibold">
                                Payment Instructions
                            </h4>
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full text-gray-600">
                                <ul className="list-disc pl-5 space-y-4">
                                    <li>You should pay the following amount to access profile</li>
                                    <li>Bank Details: </li>
                                    <li>Account No: 03120376631</li>
                                    <li>Account Title: Joe Joe</li>
                                    <li>Bank of Kenya</li>
                                </ul>
                            </div>

                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Amount
                                </label>
                                <input
                                    type="text"
                                    name="amount"
                                    value={500}
                                    disabled
                                    className="block py-1.5 px-3 border border-gray-300 text-gray-900 text-sm rounded-md w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mt-2"
                                />
                            </div>

                            <div className="col-span-full sm:col-span-2 flex items-center justify-center sm:justify-start">
                                {loader ? (
                                    <div className="mt-5">
                                        <InfinitySpin height={80} width={80} color="green" />
                                    </div>
                                ) : (
                                    <div className="mt-5">
                                        <Button
                                            type="button"
                                            color="gradient"
                                            variant="solid"
                                            onClick={() => setLoader(true)}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

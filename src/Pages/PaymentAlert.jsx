import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";
import axiosInstance, { handleError } from "../axiosInstance";
import { toast } from "sonner";
import { InfinitySpin } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { Skeleton } from "../Components/Skeleton";

export default function PaymentAlert() {
    const [registered, setRegistered] = useState(false);
    const [loader, setLoader] = useState(false);
    const [tableLoader, setTableLoader] = useState(false);
    const [paymentInstructions, setPaymentInstructions] = useState();
    const parser = new DOMParser();
    const navigate = useNavigate();
    const role_id = localStorage?.role_id;
    const user_id = localStorage?.user_id;

    const getPaymentInstructions = async () => {
        setTableLoader(true);
        try {
            const response = await axiosInstance.get(`api/admin_payment_instruction?role_id=${role_id}`);
            if (response) {
                setPaymentInstructions(response?.data[0]);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setTableLoader(false);
        }
    };

    const submitPayment = async () => {
        setLoader(true);
        const json = {
            user_id: user_id,
            amount: paymentInstructions?.amount,
        };
        try {
            const response = await axiosInstance.post(`api/user_payment_history/store`, json);
            if (response) {
                toast.success("Payment submitted successfully");
                localStorage.setItem("payment", false);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoader(false);
            navigate("/home");
        }
    };

    useEffect(() => {
        getPaymentInstructions();
    }, []);

    const handleBackHome = () => {
        navigate("/home");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-orange-200 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 w-full max-w-xl">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Payment</h1>

                {tableLoader ? (
                    <Skeleton />
                ) : (
                    <div className="grid grid-cols-1 gap-y-6">
                        <div className="text-sm font-medium text-gray-900 ">
                            <ul className="list-disc space-y-2">
                                {parser.parseFromString(paymentInstructions?.instructions || '', "text/html").body.textContent.trim()}
                            </ul>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">Amount</label>
                            <input
                                type="text"
                                name="amount"
                                value={paymentInstructions?.amount}
                                disabled
                                className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4">
                            {loader ? (
                                <div className="flex justify-center">
                                    <InfinitySpin height={80} width={80} color="green" />
                                </div>
                            ) : (
                                <Button
                                    type="button"
                                    color="gradient"
                                    variant="solid"
                                    onClick={submitPayment}
                                    className="w-full md:w-auto"
                                >
                                    Submit
                                </Button>
                            )}
                            {/* <button
                onClick={handleBackHome}
                className="w-full md:w-auto bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 transition duration-200"
              >
                Go Back to Home
              </button> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

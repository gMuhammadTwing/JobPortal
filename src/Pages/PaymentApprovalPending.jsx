
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const PaymentApprovalPending = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate('/home');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-orange-200 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg text-center">
                <ExclamationCircleIcon className="h-24 w-24 text-orange-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Approval Pending</h1>
                <p className="text-gray-600 mb-6">
                    Payment is not being approved yet, please wait...
                </p>
                <button
                    onClick={handleBackHome}
                    className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition duration-200"
                >
                    Go Back to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentApprovalPending;
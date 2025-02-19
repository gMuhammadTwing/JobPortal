import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const iconMap = {
    success: { icon: CheckCircleIcon, color: "bg-green-100 text-green-600", title: "Success" },
    error: { icon: ExclamationTriangleIcon, color: "bg-red-100 text-red-600", title: "Error" },
    info: { icon: InformationCircleIcon, color: "bg-blue-100 text-blue-600", title: "Information" },
};

export default function MessageModal({ isOpen, onClose, message, type = "info" }) {
    const { icon: Icon, color, title } = iconMap[type] || iconMap.info;

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                            <div className="flex flex-col items-center">
                                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${color}`}>
                                    <Icon className="h-10 w-10" aria-hidden="true" />
                                </div>
                                <Dialog.Title className="mt-4 text-lg font-semibold text-gray-900">
                                    {title}
                                </Dialog.Title>
                                <p className="mt-2 text-sm text-gray-600 text-center">
                                    {message}
                                </p>
                            </div>
                            <div className="mt-4 flex justify-center">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-900"
                                >
                                    Close
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

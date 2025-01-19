import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import SubscribeEmail from "./Components/SubscribeEmail";
import { toast } from "sonner";

export default function SubmitResume() {
    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Submit your resume</h1>
                    <p>If you are unemployed or actively searching for a job, please subscribe and submit your resume.</p>
                    <div className="mt-5 flex justify-center cursor-pointer">
                        {localStorage?.token ? (
                            (localStorage.payment == 'true' || localStorage.role_id == 1 || localStorage.role_id == 3) ?
                                <Link
                                    to={"/jobs"}
                                >
                                    <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                        Browse Jobs</span>
                                </Link> :
                                (
                                    localStorage.payment == 'false' ?
                                        <Link
                                            onClick={() => toast.info("Payment Approval Pending")}
                                            to={"/home"}
                                        >
                                            <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                                Browse Jobs</span>
                                        </Link>
                                        :
                                        <Link
                                            onClick={() => toast.info("Payment Approval Pending")}
                                            to={"/payment-alert"}
                                        >
                                            <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                                Browse Jobs</span>
                                        </Link>
                                )
                        ) : (
                            <Link
                                onClick={() => toast.info("Please login first")}
                                to={"/login"}
                            >
                                <span className="bg-white text-[#ff0000] px-4 py-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition duration-200 ease-in-out">
                                    Browse Jobs</span>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="text-start p-13 space-y-4 max-w-4xl mx-auto">
                    <div className="space-y-4">
                        <div className="font-semibold">Why submit your resume with us?</div>
                        <div className="flex"><CheckIcon className="w-6 h-6 text-white bg-green-500 rounded-full p-1 mr-5 mt-1" />
                            Your resume and profile will be searchable by potential employers</div>
                        <div className="flex"><CheckIcon className="w-6 h-6 text-white bg-green-500 rounded-full p-1 mr-5 mt-1" />
                            You will passively receive interview requests by matching employers.
                        </div>
                        <div className="flex"><CheckIcon className="w-6 h-6 text-white bg-green-500 rounded-full p-1 mr-5 mt-1" />
                            You can't win if you don't play. Your resume gets you to play the game and win!
                        </div>

                    </div>
                </div>
                <SubscribeEmail />
            </div>

        </>

    );
}

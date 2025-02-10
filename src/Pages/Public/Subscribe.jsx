import { Link } from "react-router-dom";
import SubscribeEmail from "./Components/SubscribeEmail";
import { toast } from "sonner";

export default function Subscribe() {
    return (
        <>
            <div
                className='bg-white'
            >
                <div className=' text-center bg-[#FFF5F3] p-12'>
                    <h1 className="font-medium text-4xl sm:text-4xl md:text-5xl text-[#ff0000]">Register</h1>
                    <p className="mt-1">Find your next great opportunity! Register to Veritas Kenya Workforce Database.</p>
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
            </div>
            <SubscribeEmail />
        </>

    );
}

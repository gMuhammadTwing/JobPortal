import { ArrowDownCircleIcon, ArrowRightCircleIcon, UserCircleIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { Button } from "../Components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CreateAccount() {
    const [checked, setChecked] = useState(false);
    const [disable, setDisable] = useState(true);
    return (
        <div className="flex items-center justify-center min-h-[50vh] bg-gray-100"> {/* Full-screen center */}
            <div className="container mx-auto p-4 text-center"> {/* Centered main div */}
                <div className="p-4">
                    <h1 className="font-medium text-4xl sm:text-xl md:text-4xl mb-5">Join as a Job Seeker or Employer</h1>
                </div>
                <div className="flex justify-center gap-6"> {/* Flexbox for centering the cards */}
                    <div
                        className="flex flex-col divide-y divide-gray-200 rounded-lg text-center shadow border border-gray-200 hover:border-orange-500 bg-white w-60"
                    >
                        <div className="flex flex-1 flex-col items-center p-4">
                            <div className="flex w-full items-center justify-between">
                                <UserPlusIcon className="h-8 w-8" />
                                <input type="radio" name="accountType" className="form-radio h-6 w-6 text-orange-500 " onClick={() => {setChecked(true); setDisable(false)}} />
                            </div>
                            <h3 className="text-sm font-medium text-gray-900">I'm Job Seeker</h3>
                            <dl className="mt-1 flex grow flex-col justify-between">
                                <dt className="sr-only">Title</dt>
                                <dd className="text-sm text-gray-500">Looking for Job</dd>
                            </dl>
                        </div>
                    </div>
                    <div
                        className="flex flex-col divide-y divide-gray-200 rounded-lg text-center shadow border border-gray-200 hover:border-orange-500 bg-white w-60"
                    >
                        <div className="flex flex-1 flex-col p-4">
                            <div className="flex w-full items-center justify-between">
                                <UserPlusIcon className="h-8 w-8" />
                                <input type="radio" name="accountType" className="form-radio h-6 w-6 text-orange-500" onClick={() => {setChecked(false); setDisable(false)}} />
                            </div>
                            <h3 className=" text-sm font-medium text-gray-900">I'm Employer</h3>
                            <dl className="mt-1 flex grow flex-col justify-between">
                                <dt className="sr-only">Title</dt>
                                <dd className="text-sm text-gray-500">Creating Jobs</dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <Button type="button"
                    color="gradient"
                    variant="solid"
                    className={"mt-6"}
                    disabled={disable}
                >
                    {checked && (
                        <Link to={"/create-account/signup-jobseeker"}>
                            Join Us As Job Seeker
                        </Link>
                    )}
                    {!checked && (
                        <Link to={"/create-account/signup-employee"}>
                            Join Us As Employer
                        </Link>
                    )}

                </Button>
                <div className="mt-6 flex items-center justify-center"> {/* Center align the text and button */}
                    <p className="text-sm">Already have an account?</p>
                    <Link
                        to="/login"
                        className="inline-block px-6 pb-[6px] pt-2 text-xs font-medium uppercase text-danger"
                    >
                        <Button
                            type="button"
                            color="gradient"
                            variant="outline"
                        >
                            Log In
                        </Button>
                    </Link>
                </div>
            </div>
        </div>

    )
}

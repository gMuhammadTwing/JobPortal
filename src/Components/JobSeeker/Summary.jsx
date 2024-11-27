import { MinusIcon, PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button } from "../Button";

export default function Summary() {
    const [summary, setSummary] = useState(false);
    const [editSummary, setEditSummary] = useState(false);
    const [value, setValue] = useState("");

    const handleSummary = () => {
        setSummary(!summary);
        if (!summary) {
            setEditSummary(false);
        }
    };

    return (
        <div className="flex justify-center sm:px-0">
            <div className="p-4 w-full max-w-5xl">
                <div className={`border rounded-md shadow-lg ${summary ? "overflow-hidden" : ""}`}>
                    {/* Header Section */}
                    <div
                        className="flex justify-between items-center p-4 border-b cursor-pointer text-orange-600 bg-white"
                        onClick={handleSummary}
                    >
                        <h3 className="font-semibold text-3xl">Summary</h3>
                        <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none">
                            {summary ? (
                                <PlusIcon className="block h-6 w-6 text-blue-500 hover:scale-[160%] duration-300" />
                            ) : (
                                <MinusIcon className="block h-6 w-6 text-red-500 hover:scale-[160%] duration-300" />
                            )}
                        </button>
                    </div>

                    {/* Card Body */}
                    <div
                        className={`relative bg-white transition-all duration-300 ease-in-out ${summary ? "max-h-0 p-0" : "max-h-screen p-4"
                            }`}
                    >
                        {/* Display Summary */}
                        {!editSummary && !summary && (
                            <div className="relative">
                                <p className="text-gray-600 text-base sm:text-lg">
                                    I'm a software developer with experience in building scalable and efficient web applications.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setEditSummary(true)}
                                    className="absolute top-0 right-4 hover:bg-gray-100 rounded-full p-2 transition"
                                >
                                    <PencilIcon className="h-5 w-5 text-blue-500" />
                                </button>
                            </div>
                        )}

                        {/* Edit Summary Form */}
                        {editSummary && (
                            <form className="">
                                {/* <label
                                    htmlFor="summary-editor"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Edit Summary
                                </label> */}
                                <div className="relative">
                                    <ReactQuill
                                        id="summary-editor"
                                        theme="snow"
                                        value={value}
                                        onChange={setValue}
                                        style={{
                                            height: "150px",
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
                                        placeholder="Write something about yourself..."
                                    />
                                </div>
                                <div className="flex justify-center gap-4 mt-15">
                                    <Button
                                        type="button"
                                        color="gradient"
                                        variant="outline"
                                        onClick={() => setEditSummary(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="gradient" variant="solid" className="text-white">
                                        Save
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

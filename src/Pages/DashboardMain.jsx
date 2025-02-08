import {
    BriefcaseIcon,
    BuildingOfficeIcon,
    ChatBubbleLeftRightIcon,
    ClipboardDocumentCheckIcon,
    ClipboardDocumentListIcon,
    CreditCardIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    NewspaperIcon,
    UserCircleIcon,
    UsersIcon,
    ViewfinderCircleIcon,
    LightBulbIcon,
    HandRaisedIcon,
    HeartIcon,
    GlobeAltIcon,
    AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
import { CustomScroll } from "react-custom-scroll";

export default function DashboardMain() {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const jobSeekerNav = [
        { name: "Job Profile", href: "profile", icon: UserCircleIcon, current: true },
        { name: "Resume/CV", href: "resume", icon: DocumentTextIcon, current: false },
        { name: "Search Jobs", href: "view_job_list", icon: ViewfinderCircleIcon, current: false },
        { name: "Applied Jobs", href: "applied_job_list", single: "applied_job_list", icon: BriefcaseIcon, current: false },
        // { name: "Subscription & Payment", href: "subscription", icon: CreditCardIcon, current: false },
        { name: "Coursework", href: "coursework/all", single: 'coursework', icon: ClipboardDocumentListIcon, current: false },
    ]
    const navigation = [
        { name: "Employer Profile", href: "profile", icon: UserCircleIcon, current: true },
        { name: "Employer Job Management", href: "job_management", single: 'job_management', icon: BriefcaseIcon, current: false },
        { name: "Resume Bank", href: "resume_bank", icon: CreditCardIcon, current: false },
        { name: "Veritas Shortlisting", href: "veritas_shortlisting", icon: ClipboardDocumentCheckIcon, current: false },
        // { name: "Blog/Comments", href: "blog", icon: NewspaperIcon, current: false },
        // { name: "Reports", href: "reports", icon: FlagIcon, current: false },
        // { name: "CMS Pages", href: "cms-pages", icon: CogIcon, current: false },
        // { name: "CMS Section", href: "cms-section", icon: CogIcon, current: false },
    ];
    const adminNav = [
        { name: "Employer", href: "employees", icon: UserCircleIcon, current: true },
        { name: "Job Seekers", href: "job_seekers", icon: UsersIcon, single: "admin_job_seekers", current: true },
        { name: "Employment Agency", href: "agencies_list", single: "agencies_list", icon: BuildingOfficeIcon, current: false },
        { name: "Jobs List", href: "list_job", icon: ClipboardDocumentCheckIcon, current: false },
        { name: "Payment", href: "payments", icon: CurrencyDollarIcon, current: false },
        { name: "Instructions for payment", href: "instructions", icon: ClipboardDocumentListIcon, current: false },
        { name: "Jobs & Applicants", href: "shortlisting", icon: ClipboardDocumentCheckIcon, current: false },
        { name: "Blogs", href: "postblog", icon: NewspaperIcon, current: false },
        { name: "Contact Us", href: "contacts", single: "contacts", icon: ChatBubbleLeftRightIcon, current: false },
        { name: "VertiasKWD Idea Incubator Form", href: "idea_incubator_form", single: "idea_incubator_form", icon: LightBulbIcon, current: false },
        { name: "VertiasKWD Opportunity", href: "admin_opportunity", single: "admin_opportunity", icon: BriefcaseIcon, current: false },
        { name: "VertiasKWD Projects", href: "admin_projects", single: "admin_projects", icon: GlobeAltIcon, current: false },
        { name: "VertiasKWD Investors", href: "admin_investors", single: "admin_investors", icon: CurrencyDollarIcon, current: false },
        { name: "VertiasKWD Charities", href: "admin_charities", single: "admin_charities", icon: HeartIcon, current: false },
        { name: "VertiasKWD Idea Incubators", href: "admin_idea_incubators", single: "admin_idea_incubators", icon: LightBulbIcon, current: false },
        { name: "VertiasKWD Volunteers", href: "admin_volunteers", single: "admin_volunteers", icon: HandRaisedIcon, current: false },
        { name: "VertiasKWD Careers", href: "admin_careers", single: "admin_careers", icon: AcademicCapIcon, current: false },
    ];
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    const navigate = useNavigate();
    if (!localStorage.token) {
        navigate("/home");
    }

    return (
        <div className="container mx-auto flex relative">

            {/* Mobile Sidebar Toggle */}
            <div className="fixed top-12 left-5 md:hidden">
                <button
                    className="m-4 p-2 text-white bg-[#ff0000] rounded-md"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? "Close Menus" : "Open Menus"}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                // className={classNames(
                //     "z-10 fixed inset-y-16 left-0 md:left-[6rem] md:inset-y-10 md:h-[33rem] w-66 bg-white rounded-lg  overflow-y-auto transform transition-transform",
                //     sidebarOpen ? "translate-x-0" : "-translate-x-full",
                //     "md:relative md:translate-x-0 md:w-72"
                // )}
                className={classNames(
                    "z-10 fixed inset-y-16 left-0 xl:left-[6rem] md:left-0 md:top-10 md:h-[33rem] w-[16.5rem] bg-white rounded-lg shadow-lg overflow-y-auto transform transition-transform",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full",
                    "md:translate-x-0 md:w-66 md:relative"
                )}
                // className={classNames(
                //     "z-10 fixed inset-y-16 left-0 xl:left-[8rem] lg:left-[6rem] md:left-0 md:top-10 md:h-[33rem] w-66 bg-white rounded-lg shadow-lg overflow-y-auto transform transition-transform",
                //     sidebarOpen ? "translate-x-0" : "-translate-x-full",
                //     "md:translate-x-0 md:w-64 lg:w-72 xl:w-80 md:relative"
                // )}

            >
                <nav className="p-4">
                    <ul role="list" className="space-y-1">
                        {location.pathname.includes('/employer') && (

                            navigation.map((item) => (
                                <li key={item.name} onClick={() => setSidebarOpen(!sidebarOpen)}>
                                    <Link
                                        to={item.href}
                                        className={classNames(
                                            location.pathname.includes(item.href) || location.pathname.includes(item?.single)
                                                ? "bg-[#ff0000] text-white"
                                                : "text-black hover:bg-[#ff0000] hover:text-white",
                                            "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold"
                                        )}
                                    >
                                        <item.icon
                                            aria-hidden="true"
                                            className={classNames(
                                                location.pathname.includes(item.href) || location.pathname.includes(item?.single)
                                                    ? "text-white"
                                                    : "text-black group-hover:text-white",
                                                "h-6 w-6"
                                            )}
                                        />
                                        {item.name}
                                    </Link>
                                </li>
                            ))

                        )}

                        {location.pathname.includes('/job-seeker') && (
                            jobSeekerNav.map((item) => (
                                <li key={item.name} onClick={() => setSidebarOpen(!sidebarOpen)}>
                                    <Link
                                        to={item.href}
                                        className={classNames(
                                            location.pathname.includes(item.href) || location.pathname.includes(item?.single)
                                                ? "bg-[#ff0000] text-white"
                                                : "text-black hover:bg-[#ff0000] hover:text-white",
                                            "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold"
                                        )}
                                    >
                                        <item.icon
                                            aria-hidden="true"
                                            className={classNames(
                                                location.pathname.includes(item.href) || location.pathname.includes(item?.single)
                                                    ? "text-white"
                                                    : "text-black group-hover:text-white",
                                                "h-6 w-6"
                                            )}
                                        />
                                        {item.name}
                                    </Link>
                                </li>
                            ))
                        )}


                        {location.pathname.includes('/admin') && (

                            adminNav.map((item) => (
                                <li className="" key={item.name} onClick={() => setSidebarOpen(!sidebarOpen)}>
                                    <Link
                                        to={item.href}
                                        className={classNames(
                                            location.pathname.includes(item.href) || location.pathname.includes(item?.single)
                                                ? "bg-[#ff0000] text-white"
                                                : "text-black hover:bg-[#ff0000] hover:text-white",
                                            "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold"
                                        )}
                                    >
                                        <item.icon
                                            aria-hidden="true"
                                            className={classNames(
                                                location.pathname.includes(item.href) || location.pathname.includes(item?.single)
                                                    ? "text-white"
                                                    : "text-black group-hover:text-white",
                                                "h-6 w-6"
                                            )}
                                        />
                                        {item.name}
                                    </Link>
                                </li>
                            ))

                        )}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-6 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}

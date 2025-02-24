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
    UserGroupIcon,
    UserIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
import { CustomScroll } from "react-custom-scroll";

export default function DashboardMain() {
    const getHrefByPermission = (permission) => {
        const navItem = adminNav.find(item => item.permissions == permission);
        return navItem ? (navItem.href) : null;
    };

    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const status = localStorage.status;
    let jobSeekerNav = [
        { name: "Job Profile", href: "profile", icon: UserCircleIcon, current: true },
        { name: "Resume/CV", href: "resume", icon: DocumentTextIcon, current: false },
        { name: "Search Jobs", href: "view_job_list", icon: ViewfinderCircleIcon, current: false },
        { name: "Applied Jobs", href: "applied_job_list", single: "applied_job_list", icon: BriefcaseIcon, current: false },
        { name: "Coursework", href: "coursework/all", single: 'coursework', icon: ClipboardDocumentListIcon, current: false },
    ]
    if (status == 3) {
        jobSeekerNav = jobSeekerNav.filter(item => item.href === "profile");
    }

    let navigation = [
        { name: "Employer Profile", href: "profile", icon: UserCircleIcon, current: true },
        { name: "Employer Job Management", href: "job_management", single: "job_management", icon: BriefcaseIcon, current: false },
        { name: "Resume Bank", href: "resume_bank", icon: CreditCardIcon, current: false },
        { name: "Veritas Shortlisting", href: "veritas_shortlisting", icon: ClipboardDocumentCheckIcon, current: false },
        // { name: "Blog/Comments", href: "blog", icon: NewspaperIcon, current: false },
        // { name: "Reports", href: "reports", icon: FlagIcon, current: false },
        // { name: "CMS Pages", href: "cms-pages", icon: CogIcon, current: false },
        // { name: "CMS Section", href: "cms-section", icon: CogIcon, current: false },
    ];

    // If status is 3, keep only "Employer Job Management"
    if (status == 3) {
        navigation = navigation.filter(item => item.href === "profile");
    }

    const adminNav = [

        { name: "Employer", href: "employees", icon: UserCircleIcon, permissions: 'employer', current: true },
        { name: "Admin Users", href: "user_management", permissions: 'user_management', single: "user_management", icon: UserGroupIcon, current: false },
        { name: "Job Seekers", href: "job_seekers", icon: UsersIcon, permissions: 'job_seeker', single: "admin_job_seekers", current: true },
        { name: "Employment Agency", href: "agencies_list", permissions: 'employment_agency', single: "agencies_list", icon: BuildingOfficeIcon, current: false },
        { name: "Jobs List", href: "list_job", icon: ClipboardDocumentCheckIcon, permissions: 'jobs_list', current: false },
        { name: "Payment", href: "payments", icon: CurrencyDollarIcon, permissions: 'payment', current: false },
        { name: "Instructions for payment", href: "instructions", permissions: 'instructions_for_payment', icon: ClipboardDocumentListIcon, current: false },
        { name: "Jobs & Applicants", href: "shortlisting", permissions: 'jobs_&_applicants', icon: ClipboardDocumentCheckIcon, current: false },
        { name: "Blogs", href: "postblog", icon: NewspaperIcon, permissions: 'blogs', current: false },
        { name: "Contact Us", href: "contacts", single: "contacts", permissions: 'contact_us', icon: ChatBubbleLeftRightIcon, current: false },
        { name: "Reported Jobs", href: "job_report", single: "job_report", permissions: 'job_reports', icon: ChatBubbleLeftRightIcon, current: false },
        { name: "VeritasKWD Idea Incubator Form", href: "idea_incubator_form", permissions: 'veritasKWD_idea_incubator_form', single: "idea_incubator_form", icon: LightBulbIcon, current: false },
        { name: "About Us", href: "about", permissions: 'about_us', single: "about", icon: Bars3Icon, current: false },
        { name: "VeritasKWD Opportunity", href: "admin_opportunity", permissions: 'veritasKWD_opportunity', single: "admin_opportunity", icon: BriefcaseIcon, current: false },
        { name: "VeritasKWD Projects", href: "admin_projects", permissions: 'veritasKWD_projects', single: "admin_projects", icon: GlobeAltIcon, current: false },
        { name: "Veritas Endless Possibities for Investors", href: "admin_investors", permissions: 'veritasKWD_investors', single: "admin_investors", icon: CurrencyDollarIcon, current: false },
        { name: "VeritasKWD Charities", href: "admin_charities", permissions: 'veritasKWD_charities', single: "admin_charities", icon: HeartIcon, current: false },
        { name: "VeritasKWD Idea Incubator", href: "admin_idea_incubators", permissions: 'veritasKWD_idea_incubators', single: "admin_idea_incubators", icon: LightBulbIcon, current: false },
        { name: "VeritasKWD Volunteers", href: "admin_volunteers", permissions: 'veritasKWD_volunteers', single: "admin_volunteers", icon: HandRaisedIcon, current: false },
        { name: "VeritasKWD Careers", href: "admin_careers", permissions: 'veritasKWD_careers', single: "admin_careers", icon: AcademicCapIcon, current: false },

    ];
    // const getUserPermissions = () => {
    //     const storedPermissions = localStorage.getItem("permissions");
    //     if (!storedPermissions) return []; // Return an empty array if no permissions exist

    //     try {
    //         const permissions = JSON.parse(storedPermissions);
    //         return Array.isArray(permissions) ? permissions.map(p => p.permission_name) : [];
    //     } catch (error) {
    //         console.error("Error parsing user permissions:", error);
    //         return [];
    //     }
    // };
    const getUserPermissions = () => {
        // const permissions = JSON.parse(localStorage.getItem("permissions"));
        // console.log("permissions: ", permissions);
        const storedPermissions = localStorage.getItem("permissions");

        const permissions = (storedPermissions && storedPermissions !== "undefined")
            ? JSON.parse(storedPermissions)
            : [];

        return permissions ? permissions.map(p => p.permission_name) : [];
    };
    const userPermissions = getUserPermissions() || [];
    const filteredNavigation = adminNav.filter(item =>
        item.permissions ? userPermissions.includes(item.permissions) : false
    );

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
                // className={classNames(
                //     "z-10 fixed inset-y-16 left-0 xl:left-[6rem] md:left-0 md:top-10 md:h-[33rem] w-[16.5rem] bg-white rounded-lg shadow-lg overflow-y-auto transform transition-transform",
                //     sidebarOpen ? "translate-x-0" : "-translate-x-full",
                //     "md:translate-x-0 md:w-66 md:relative"
                // )}
                // className={classNames(
                //     "z-10 fixed inset-y-16 left-0 xl:left-[8rem] lg:left-[6rem] md:left-0 md:top-10 md:h-[33rem] w-66 bg-white rounded-lg shadow-lg overflow-y-auto transform transition-transform",
                //     sidebarOpen ? "translate-x-0" : "-translate-x-full",
                //     "md:translate-x-0 md:w-64 lg:w-72 xl:w-80 md:relative"
                // )}

                className={classNames(
                    // Base styles for mobile
                    "z-10 fixed inset-y-16 left-0 w-[16.5rem] bg-white rounded-lg shadow-lg overflow-y-auto transform transition-transform",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full", // Toggle visibility on mobile
                    // Medium screens (768px and above)
                    "md:translate-x-0 md:relative md:top-10 md:h-[33rem] md:w-66",
                    // Large screens (1024px and above)
                    "lg:left-[0rem] lg:w-66", // Adjusted for 1024px screens
                    // Extra large screens (1280px and above)
                    "xl:left-[0rem] xl:w-66", // Adjusted for 1440px screens
                    // 2XL screens (1536px and above)
                    "2xl:left-[6rem] 2xl:w-66" // Optional: For even larger screens
                )}
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

                            filteredNavigation.map((item) => (
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
                                                "h-6 w-6 flex-shrink-0 min-w-[1.5rem]"
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
        </div >
    );
}

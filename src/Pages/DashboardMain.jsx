import {
    BriefcaseIcon,
    ClipboardDocumentCheckIcon,
    CogIcon,
    CreditCardIcon,
    DocumentTextIcon,
    FlagIcon,
    HomeModernIcon,
    NewspaperIcon,
    UserCircleIcon,
    ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";

export default function DashboardMain() {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: "Job Profile", href: "profile", single: "profile", icon: UserCircleIcon, current: true },
        { name: "Resume/CV", href: "resume", icon: DocumentTextIcon, current: false },
        { name: "Search Jobs", href: "view-jobs", icon: ViewfinderCircleIcon, current: false },
        { name: "Applied Jobs", href: "applied-jobs", single: "applied-jobs", icon: BriefcaseIcon, current: false },
        { name: "Subscription & Payment", href: "subscription", icon: CreditCardIcon, current: false },
        { name: "Employer Profile", href: "employer-profile", icon: UserCircleIcon, current: true },
        { name: "Employer Job Management", href: "manage-jobs", icon: BriefcaseIcon, current: false },
        { name: "Employer Payment", href: "employer-payment", icon: CreditCardIcon, current: false },
        { name: "Shortlisting Requests", href: "shortlisting", icon: ClipboardDocumentCheckIcon, current: false },
        { name: "Search Coursework", href: "coursework", icon: HomeModernIcon, current: false },
        { name: "Blog/Comments", href: "blog", icon: NewspaperIcon, current: false },
        // { name: "Reports", href: "reports", icon: FlagIcon, current: false },
        // { name: "CMS Pages", href: "cms-pages", icon: CogIcon, current: false },
        // { name: "CMS Section", href: "cms-section", icon: CogIcon, current: false },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <div className="flex">
            
            {/* Mobile Sidebar Toggle */}
            <div className="fixed z-20 top-0 left-0 md:hidden">
                <button
                    className="m-4 p-2 text-white bg-orange-600 rounded-md"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? "Close Menu" : "Open Menu"}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={classNames(
                    " fixed inset-y-0 z-30 w-66 left-0 md:left-[7rem] md:inset-y-10 md:h-[33rem] rounded-lg border border-gray-300 bg-white text-black overflow-y-auto transition-transform transform md:relative md:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <nav className="p-4">
                    <ul role="list" className="space-y-1">
                        {navigation.map((item) => (
                            <li key={item.name} onClick={() => setSidebarOpen(!sidebarOpen)}>
                                <Link
                                    to={item.href}
                                    className={classNames(
                                        location.pathname.includes(item.href) || location.pathname.includes(item?.single)
                                            ? "bg-orange-600 text-white"
                                            : "text-black hover:bg-orange-600 hover:text-white",
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
                        ))}
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
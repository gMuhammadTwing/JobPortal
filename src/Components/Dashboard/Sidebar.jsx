import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Logo from '../../assets/Logo white.png';
import NavigationItem from "./NavigationItem";

// Function to get user permissions from localStorage
// const getUserPermissions = () => {
//   const permissions = JSON.parse(localStorage.getItem("permissions"));
//   return permissions ? permissions.map(p => p.permission_name) : [];
// };

export default function Sidebar ({ sidebarOpen, setSidebarOpen, navigation, expanded, toggleExpand, isCollapsed }) {
  // const userPermissions = getUserPermissions();

  // Filter navigation items based on user permissions
  // const filteredNavigation = navigation.filter(item => 
  //   !item.permissions || userPermissions.includes(item.permissions)
  // );

  return (
    <>
      {/* Mobile Sidebar */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out">
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            {/* Sidebar Navigation */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
              <div className="flex h-16 shrink-0 items-center">
                <img alt="Your Company" src={Logo} className="h-8 w-auto" />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <NavigationItem
                          key={item.name}
                          item={item}
                          expanded={expanded}
                          toggleExpand={toggleExpand}
                          isCollapsed={isCollapsed}
                        />
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop Sidebar */}
      <div className={isCollapsed ? "hidden lg:w-20" : "hidden lg:w-72 lg:fixed lg:inset-y-0 lg:flex lg:flex-col"}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="flex h-16 justify-center shrink-0 items-center">
            <img alt="Your Company" src={Logo} className="h-12 w-auto" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {navigation.map((item) => (
                <NavigationItem
                  key={item.name}
                  item={item}
                  expanded={expanded}
                  toggleExpand={toggleExpand}
                  isCollapsed={isCollapsed}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
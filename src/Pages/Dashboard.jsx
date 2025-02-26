import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import {
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  BellIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  ChartPieIcon,
  ClipboardIcon,
  CogIcon,
  CreditCardIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  FlagIcon,
  FolderIcon,
  HomeIcon,
  HomeModernIcon,
  NewspaperIcon,
  UserCircleIcon,
  UsersIcon,
  ViewfinderCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Link, Outlet, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { Button } from './../Components/Button'
import userLogo from './../assets/user.jpeg'
const navigation = [
  { name: 'Job Profile', href: '/home', single: 'home', icon: UserCircleIcon, current: true },
  { name: 'Resume/CV', href: '/resume', icon: DocumentTextIcon, current: false },
  { name: 'Search Jobs', href: '/view-jobs', icon: ViewfinderCircleIcon, current: false },
  { name: 'Applied Jobs', href: '/applied-jobs', single: 'applied-jobs', icon: BriefcaseIcon, current: false },
  { name: 'Subscription & Payment', href: '/subscription', icon: CreditCardIcon, current: false },
  { name: 'Employer Profile', href: '/employer-profile', icon: UserCircleIcon, current: true },
  { name: 'Employer Job Management', href: '/manage-jobs', icon: BriefcaseIcon, current: false },
  { name: 'Employer Payment', href: '/employer-payment', icon: CreditCardIcon, current: false },
  { name: 'Shortlisting Requests', href: '/shortlisting', icon: ClipboardIcon, current: false },
  { name: 'Search Coursework', href: '/coursework', icon: HomeModernIcon, current: false },
  { name: 'Blog/Comments', href: '/blog', icon: NewspaperIcon, current: false },
  { name: 'Reports', href: '/reports', icon: FlagIcon, current: false },
  { name: 'CMS Pages', href: '/cms-pages', icon: CogIcon, current: false },
  { name: 'CMS Section', href: '/cms-section', icon: CogIcon, current: false },
];

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '/login' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const handleCurrent = (item) => {

  }
  const location = useLocation();
  return (
    <>
      <div>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 bg-gradient-to-r from-orange-500 to-pink-600">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src={logo}
                    className="h-[10rem] w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item, index) => (
                          <li key={item.name}>
                            <Link
                              key={index}
                              onClick={() => handleCurrent(item)}
                              to={"#/" + item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-white hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  item.current ? 'text-indigo-600' : 'text-white group-hover:text-indigo-600',
                                  'h-6 w-6 shrink-0',
                                )}
                              />
                              {item.name}
                            </Link>
                            {/* {item.submenus && (
                              <ul className="pl-8 space-y-1 mt-2">
                                {item.submenus.map((submenu) => (
                                  <li key={submenu.name}>
                                    <Link
                                      href={submenu.href}
                                      className="text-sm text-white hover:text-indigo-600"
                                    >
                                      {submenu.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )} */}
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-gradient-to-r from-orange-500 to-pink-600 px-6 pb-4">
            <div className="flex h-12 shrink-0 items-center">
              <img
                alt="Job Portal"
                src={logo}
                className="h-[10rem] w-auto"
              />

            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            location.pathname.includes(item.href) ||
                              location.pathname.includes(item?.single)
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-white hover:bg-gray-50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              location.pathname.includes(item.href) ||
                                location.pathname.includes(item?.single) ? 'text-indigo-600' : 'text-white group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0',
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Separator */}
            <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

            <div className="flex flex-1 gap-x-2 self-stretch lg:gap-x-4">
              <form action="#" method="GET" className="relative flex flex-1">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                />
                <input
                  id="search-field"
                  name="search"
                  type="search"
                  placeholder="Search..."
                  className="px-2 block h-full w-full border-0 pl-8 text-gray-900 placeholder:text-gray-400 sm:text-sm focus:outline-none"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                {/* Separator */}
                <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={userLogo}
                      className="h-8 w-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">
                        Admin User
                      </span>
                      <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        {item?.name == "Sign out" ? (
                          <Link
                            to={item.href}
                            className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                          >
                            <Button type="button"
                              color="gradient"
                              variant="solid">{item.name} </Button>

                          </Link>
                        ) :
                          <a
                            href={item.href}
                            className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                          >
                            {item.name}
                          </a>}
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

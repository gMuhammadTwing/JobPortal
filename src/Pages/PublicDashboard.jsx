import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CustomScroll } from 'react-custom-scroll'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import { useState } from 'react'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: 'dashboard', current: true },
  { name: 'Teams', href: 'teams', current: false },
  {
    name: 'Projects', href: 'projects', current: false,
    subItems: [
      { name: "Projects", href: 'projects' },
      { name: "Ongoing Projects", href: '' },
    ]
  },
  { name: 'Blogs', href: 'blogs', current: false },
  // { name: 'Reports', href: '#', current: false },
  { name: 'Employer', href: 'employer/profile', single: 'employer', current: false },
  { name: 'Job Seeker', href: 'job-seeker/profile', current: false },
  { name: 'About Us', href: 'about-us', current: false },
  { name: 'Login', href: 'login', current: false },
  { name: 'Register', href: 'create-account', current: false },

]
const navigation2 = [
  { name: 'Dashboard', href: 'dashboard', current: true },
  { name: 'Teams', href: 'teams', current: false },
  {
    name: 'Projects',
    href: 'projects',
    current: false,
  },
  { name: 'Blogs', href: 'blogs', current: false },
  // { name: 'Reports', href: '#', current: false },
  { name: 'Employer', href: 'employer/profile', single: 'employer', current: false },
  { name: 'Job Seeker', href: 'job-seeker/profile', current: false },
  { name: 'About Us', href: 'about-us', current: false },
  { name: 'Login', href: 'login', current: false },
  { name: 'Register', href: 'create-account', current: false },

]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: 'login' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function PublicDashboard() {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="fixed top-0 left-0 right-0 z-10 bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                    className="size-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          location.pathname.includes(item.href) || location.pathname.includes(item?.single) ? 'bg-orange-600 text-white' : 'text-black hover:bg-orange-500 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item?.subItems ? (
                          <div
                            className="relative"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                          >
                            {/* Trigger Button */}

                            <div aria-disabled={true}>
                              {item?.name}
                            </div>

                            {showDropdown && (
                              <div className="absolute left-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                {item?.subItems.map((item1, index) =>
                                  item1?.name === "Add Lookup" ? (
                                    <div
                                      key={index}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 cursor-pointer"
                                    //onClick={lookupHandler} // Uncomment if lookupHandler is defined
                                    >
                                      {item1?.name}
                                    </div>
                                  ) : (
                                    <Link
                                      onClick={() => setShowDropdown(false)}
                                      key={index}
                                      to={item1.href}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-200"
                                    >
                                      {item1.name}
                                    </Link>
                                  )
                                )}
                              </div>
                            )}

                          </div>
                        ) : (
                          item.name
                        )}

                      </Link>
                    ))}

                    {/* {navigation2.length > 0 && (
                      <div
                        className="relative"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                      >
                        <div className="text-black hover:bg-orange-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer">
                          Misc
                        </div>

                        {showDropdown && (
                          <div className="absolute left-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            {navigation2.map((item, index) =>
                              item?.name === "Add Lookup" ? (
                                <div
                                  key={index}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 cursor-pointer"
                                //onClick={lookupHandler} // Uncomment if lookupHandler is defined
                                >
                                  {item?.name}
                                </div>
                              ) : (
                                <Link
                                  onClick={() => setShowDropdown(false)}
                                  key={index}
                                  to={item.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-200"
                                >
                                  {item.name}
                                </Link>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    )} */}

                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-orange-600 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="w-5 h-5 bg-orange-600 text-white" />
                  </button>

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-orange-500 hover:text-white data-[focus]:outline-none"
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-orange-600 p-2 text-gray-400 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600">
                  {/* <span className="absolute -inset-0.5" /> */}
                  {/* <span className="sr-only">Open main menu</span> */}
                  {/* <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" /> */}
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden bg-gray-100 text-black">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-orange-600 text-white' : 'text-black hover:bg-orange-600 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-orange-500 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
                </div>
                <div className="ml-3">
                  {/* <div className="text-base font-medium text-white">{user.name}</div>
                  <div className="text-sm font-medium text-orange-200">{user.email}</div> */}
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-orange-600 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {/* <span className="absolute -inset-1.5" /> */}
                  {/* <span className="sr-only">View notifications</span> */}
                  <BellIcon aria-hidden="true" className="size-5 text-white" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-orange-600 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <main className="pt-[4rem] h-screen bg-gray-100">
          <CustomScroll heightRelativeToParent="100%">
            <Outlet />

            <Footer />
          </CustomScroll>
        </main>
      </div>
    </>
  )
}

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, LockClosedIcon, LockOpenIcon, UserCircleIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CustomScroll } from 'react-custom-scroll'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
import auth from '../auth'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: 'home', current: true },
  // { name: 'Teams', href: 'teams', current: false },
  // {
  //   name: 'Projects', href: 'projects', current: false,
  //   subItems: [
  //     { name: "Projects", href: 'projects' },
  //     { name: "Ongoing Projects", href: '' },
  //   ]
  // },
  { name: 'Blogs', href: 'blogs', single: 'blog', current: false },
  // { name: 'Reports', href: '#', current: false },
  { name: 'Employer', href: 'employer/profile', single: 'employer', current: false },
  { name: 'Job Seeker', href: 'job-seeker/profile', single: 'job-seeker', current: false },
  { name: 'About Us', href: 'about-us', current: false },
  { name: 'Contact Us', href: 'contact-us', current: false },

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
  const role_id = localStorage.getItem("role_id");
  const navigate = useNavigate();


  // useEffect(() => {
  //   window.location.reload();
  // }, [location]);
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
                    {navigation
                      .filter(item => !((role_id == 2 || role_id == undefined) && item.name == 'Employer') &&
                        !((role_id == 3 || role_id == 4 || role_id == undefined) && item.name == 'Job Seeker')) // Exclude "Employer" if role_id 
                      .map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          aria-current={item.current ? 'page' : undefined}
                          className={classNames(
                            location.pathname.includes(item.href) || location.pathname.includes(item?.single)
                              ? 'bg-orange-600 text-white'
                              : 'text-black hover:bg-orange-500 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                        >
                          {item?.subItems ? (
                            <div
                              className="relative"
                              onMouseEnter={() => setShowDropdown(true)}
                              onMouseLeave={() => setShowDropdown(false)}
                            >
                              <div aria-disabled={true}>
                                {item?.name}
                              </div>

                              {showDropdown && (
                                <div className="absolute left-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                  {item?.subItems.map((item1, index) => (
                                    <Link
                                      onClick={() => setShowDropdown(false)}
                                      key={index}
                                      to={item1.href}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-200"
                                    >
                                      {item1.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            item.name
                          )}
                        </Link>
                      ))}
                    {/* {navigation
                      .filter(item => !(role_id == 2 && item.name == 'Employer') &&
                        !((role_id == 3 || role_id == 4) && item.name == 'Job Seeker')) // Exclude "Employer" if role_id is 2
                      .map((item) => (
                        (localStorage.token == 'undefined' && item?.name == "Employer" || item?.name == "Job Seeker") ? (
                          <Link
                            onClick={() => { toast.info("Please login first") }}
                            key={item.name}
                            to={'login'}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                              location.pathname.includes(item.href) || location.pathname.includes(item?.single)
                                ? 'bg-orange-600 text-white'
                                : 'text-black hover:bg-orange-500 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium',
                            )}
                          >
                            {item?.subItems ? (
                              <div
                                className="relative"
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                              >
                                <div aria-disabled={true}>
                                  {item?.name}
                                </div>

                                {showDropdown && (
                                  <div className="absolute left-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    {item?.subItems.map((item1, index) => (
                                      <Link
                                        onClick={() => setShowDropdown(false)}
                                        key={index}
                                        to={item1.href}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-200"
                                      >
                                        {item1.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              item.name
                            )}
                          </Link>
                        ) :
                        <Link
                          key={item.name}
                          to={item.href}
                          aria-current={item.current ? 'page' : undefined}
                          className={classNames(
                            location.pathname.includes(item.href) || location.pathname.includes(item?.single)
                              ? 'bg-orange-600 text-white'
                              : 'text-black hover:bg-orange-500 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                        >
                          {item?.subItems ? (
                            <div
                              className="relative"
                              onMouseEnter={() => setShowDropdown(true)}
                              onMouseLeave={() => setShowDropdown(false)}
                            >
                              <div aria-disabled={true}>
                                {item?.name}
                              </div>

                              {showDropdown && (
                                <div className="absolute left-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                  {item?.subItems.map((item1, index) => (
                                    <Link
                                      onClick={() => setShowDropdown(false)}
                                      key={index}
                                      to={item1.href}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-200"
                                    >
                                      {item1.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            item.name
                          )}
                        </Link>
                      ))} */}


                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <div className='flex gap-2'>
                    <div
                      className={classNames(
                        location.pathname.includes("/register") ? 'bg-orange-600 text-white' : 'text-black hover:bg-orange-500 hover:text-white',
                        'rounded-md py-2 px-2 text-sm font-medium cursor-pointer'
                      )}
                    >
                      <Link
                        to="/create-account"
                        className='flex gap-1 text-center items-center'
                      >
                        <UserIcon className='w-5 h-5' />
                        Register
                      </Link>
                    </div>
                    <div className="border-l border-gray-300 h-8"></div>
                    {(!localStorage.token || localStorage.token == 'undefined') && (
                      <div
                        className={classNames(
                          location.pathname.includes("/login") ? 'bg-orange-600 text-white' : 'text-black hover:bg-orange-500 hover:text-white',
                          'rounded-md py-2 px-2 text-sm font-medium cursor-pointer'
                        )}
                      >
                        <Link
                          to="/login"
                          className='flex gap-1'
                        >
                          <LockClosedIcon className='w-5 h-5' />
                          Login
                        </Link>
                      </div>
                    )}
                    {(localStorage.token && localStorage.token != 'undefined') && (
                      <div
                        className={classNames(
                          location.pathname.includes("/login") ? 'bg-orange-600 text-white' : 'text-black hover:bg-orange-500 hover:text-white',
                          'rounded-md py-2 px-2 text-sm font-medium cursor-pointer'
                        )}
                      >
                        <button
                          onClick={async () => {
                            await auth.logout();
                            navigate("/login");
                          }}
                          className='flex gap-1'
                        >
                          <LockOpenIcon className='w-5 h-5' />
                          Sign out
                        </button>
                      </div>
                    )}

                  </div>

                  {/* <button
                    type="button"
                    className="relative rounded-full bg-orange-600 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="w-5 h-5 bg-orange-600 text-white" />
                  </button> */}

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="p-1 relative flex max-w-xs items-center rounded-full text-sm cursor-default">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {(localStorage.token && localStorage.token != 'undefined') && (
                          <>
                            <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                            <span className='p-1 text-sm font-medium text-gray-700'>{localStorage.getItem("user_name")}</span>
                          </>
                        )}
                      </MenuButton>
                    </div>
                    {/* <MenuItems
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
                    </MenuItems> */}
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <div className='flex gap-2'>
                  <div
                    className={classNames(
                      location.pathname.includes("/register") ? 'bg-orange-600 text-white' : 'text-black hover:bg-orange-500 hover:text-white',
                      'rounded-md py-2 px-2 text-sm font-medium cursor-pointer mr-2'
                    )}
                  >
                    <Link
                      to="/create-account"
                      className='flex gap-1'
                    >
                      <UserIcon className='w-5 h-5' />
                      Register
                    </Link>
                  </div>
                  <div className="border-l border-gray-300 h-8"></div>
                  {(!localStorage.token || localStorage.token == 'undefined') && (
                    <div
                      className={classNames(
                        location.pathname.includes("/login") ? 'bg-orange-600 text-white' : 'text-black hover:bg-orange-500 hover:text-white',
                        'rounded-md py-2 px-2 text-sm font-medium cursor-pointer'
                      )}
                    >
                      <Link
                        to="/login"
                        className='flex gap-1'
                      >
                        <LockClosedIcon className='w-5 h-5' />
                        Login
                      </Link>
                    </div>
                  )}
                  {(localStorage.token && localStorage.token != 'undefined') && (
                    <div
                      className={classNames(
                        location.pathname.includes("/login") ? 'bg-orange-600 text-white' : 'text-black hover:bg-orange-500 hover:text-white',
                        'rounded-md py-2 px-2 text-sm font-medium cursor-pointer'
                      )}
                    >
                      <button
                        onClick={async () => {
                          await auth.logout();

                          navigate("/login");
                        }}
                        className='flex gap-1'
                      >
                        <LockOpenIcon className='w-5 h-5' />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-orange-600 p-2 text-white hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden bg-gray-100 text-black">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.filter(item => !((role_id == 2 || role_id == undefined) && item.name == 'Employer') &&
                !((role_id == 3 || role_id == 4 || role_id == undefined) && item.name == 'Job Seeker'))
                .map((item) => (
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
                  {(localStorage.token && localStorage.token != 'undefined') && (
                    <>
                      <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
                      <span className='p-1 text-sm font-medium text-gray-700'>{localStorage.getItem("user_name")}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <main className="pt-[4rem] h-screen bg-gray-100">
          <CustomScroll heightRelativeToParent="100%">
            <Toaster richColors />
            <Outlet />

            <Footer />
          </CustomScroll>
        </main>
      </div>
    </>
  )
}

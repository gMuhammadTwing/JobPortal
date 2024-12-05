import { StarIcon } from "@heroicons/react/20/solid";
import { AcademicCapIcon, ArrowDownOnSquareIcon, Bars2Icon, ClockIcon, CreditCardIcon, CurrencyDollarIcon, MapIcon, MapPinIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Reviews from "./Reviews";

export default function Teams() {
    const features = [
        {
            name: 'Browse Portfolios',
            title: 'Find professionals you can trust by browsing their samples of previous work .',
            icon: AcademicCapIcon,
        },
        {
            name: 'Fast Bids',
            title: 'Receive obligation free quotes from our talented freelancers fast. 80% of projects get bid',
            icon: CreditCardIcon,
        },
        {
            name: 'Quality Work',
            title: 'Kofejob.com has by far the largest pool of quality freelancers globally- over 50 million to choose from.',
            icon: Bars2Icon,
        },
        {
            name: 'Track Progress',
            title: 'Keep up-to-date and on-the-go with our time tracker Always know what freelancers are up to.',
            icon: ClockIcon,
        },
    ];

    const posts = [
        {
            id: 1,
            title: 'Boost your conversion rate',
            href: '#',
            description:
                'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
            date: 'Mar 16, 2020',
            datetime: '2020-03-16',
            category: { title: 'Sales', href: '#' },
            author: {
                name: 'Michael Foster',
                role: 'Co-Founder / CTO',
                href: '#',
                imageUrl:
                    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            },
        },
        {
            id: 1,
            title: 'Boost your conversion rate',
            href: '#',
            description:
                'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
            date: 'Mar 16, 2020',
            datetime: '2020-03-16',
            category: { title: 'Banking', href: '#' },
            author: {
                name: 'Michael Foster',
                role: 'Co-Founder / CTO',
                href: '#',
                imageUrl:
                    'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        },
        {
            id: 1,
            title: 'Boost your conversion rate',
            href: '#',
            description:
                'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
            date: 'Mar 16, 2020',
            datetime: '2020-03-16',
            category: { title: 'Report Writing', href: '#' },
            author: {
                name: 'Michael Foster',
                role: 'Co-Founder / CTO',
                href: '#',
                imageUrl:
                    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            },
        }
    ]


    return (
        <div
            className='bg-white h-screen'
        >
            <div className='font-medium text-4xl sm:text-4xl md:text-5xl text-center bg-[#FFF5F3] p-20'>
                <h1>Teams</h1>
            </div>

            {/* <div className="text-center p-15 space-y-4 max-w-7xl mx-auto">
                <div className="font-medium text-4xl sm:text-4xl md:text-5xl">
                    About We’re on a mission to empowering Jobs worldwide.
                </div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est modi, saepe hic esse maxime quasi, sapiente ex debitis quis dolorum unde, neque quibusdam eveniet nobis enim porro repudiandae nesciunt quidem.
                </div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni delectus soluta adipisci beatae ullam quisquam, quia recusandae rem assumenda, praesentium porro sequi eaque doloremque tenetur incidunt officiis explicabo optio perferendis.
                </div>
            </div> */}

            {/* <div className="text-center pb-4 max-w-7xl mx-auto flex justify-center items-center gap-x-5">
                <img
                    src="https://kofejob.dreamstechnologies.com/html/template/assets/img/blog/aboutus.jpg"
                    alt="User Profile"
                    className="h-100 w-150 rounded-lg border-2 border-white"
                />
                <img
                    src="https://kofejob.dreamstechnologies.com/html/template/assets/img/blog/aboutus1.jpg"
                    alt="User Profile"
                    className="h-100 w-150  rounded-lg border-2 border-white"
                />
            </div> */}
            {/* <div className=' text-center bg-[#FFF5F3] p-20'>
                <h1 className="font-medium text-3xl sm:text-3xl md:text-4xl p-1">What’s great about it?</h1>
                <div>All the features of Job Portal below</div>
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
                    {features.map((person, index) => (
                        <li
                            key={index}
                            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                        >
                            <div className="flex flex-1 flex-col items-center p-8">
                                <person.icon
                                    aria-hidden="true"
                                    className="h-16 w-16 bg-orange-100 text-orange-600 rounded-full p-2 flex items-center justify-center"
                                />
                                <h3 className="mt-6 text-sm font-medium text-gray-900">{person.name}</h3>
                                <dl className="mt-1 flex grow flex-col justify-between text-center">
                                    <dt className="sr-only">Title</dt>
                                    <dd className="text-sm text-gray-500">{person.title}</dd>
                                </dl>
                            </div>

                        </li>
                    ))}
                </ul>
            </div> */}

            {/* <div className=' text-center p-20'>
                <h1 className="font-medium text-3xl sm:text-3xl md:text-4xl p-1">Client testimonials</h1>
                <div>Learning communicate to global world and build a bright future and career development, increase your skill with our histudy.</div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 sm:mt-10 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="shadow border flex flex-col items-start justify-between bg-white p-4 rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                            <div className="relative flex items-center gap-x-4">
                                <img
                                    alt=""
                                    src={post.author.imageUrl}
                                    className="h-20 w-20 rounded-full bg-gray-50 transition-transform duration-300 transform hover:scale-110"
                                />
                                <div className="text-sm/6">
                                    <p className="font-semibold text-gray-900 text-xl">
                                        <a href={post.author.href}>
                                            <span className="absolute inset-0" />
                                            {post.author.name}
                                        </a>
                                    </p>
                                    <p className="text-gray-600">{post.author.role}</p>
                                </div>
                            </div>
                            <div className="group relative">
                                <p className="mt-5 text-sm/6 text-gray-600 transition-all duration-300 ease-in-out group-hover:text-gray-900">
                                    {post.description}
                                </p>
                            </div>
                            <div className="flex items-center gap-x-4 text-gray-500 mt-2">
                                <time dateTime={post.datetime} className="text-gray-500">
                                    {post.date}
                                </time>
                                <div className="truncate text-sm text-gray-500 flex">
                                    <StarIcon className="w-5 h-5 text-orange-400" />
                                    <StarIcon className="w-5 h-5 text-orange-400" />
                                    <StarIcon className="w-5 h-5 text-orange-400" />
                                    <StarIcon className="w-5 h-5 text-orange-400" />
                                    <StarIcon className="w-5 h-5 text-orange-400" />

                                    <span className="ml-1">5.0</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div> */}

        </div>
    );
}

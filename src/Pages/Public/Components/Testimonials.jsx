import { StarIcon } from "@heroicons/react/20/solid";
export default function Testimonials() {
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
        <div className=' text-center p-20  mx-auto max-w-[85rem]'>
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
        </div>
    )
}
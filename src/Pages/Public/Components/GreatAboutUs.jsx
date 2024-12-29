import { AcademicCapIcon, Bars2Icon, ClockIcon, CreditCardIcon } from "@heroicons/react/24/outline";

export default function GreatAboutUs() {
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
    return (
        <div className=' text-center bg-[#FFF5F3] p-20'>
            <h1 className="font-medium text-3xl sm:text-3xl md:text-4xl p-1 text-[#ff0000]">What’s great about it?</h1>
            <div>All the features of Job Portal below</div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5  mx-auto max-w-[75rem]">
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
        </div>
    )
}
import { AcademicCapIcon, ArrowPathIcon, BellAlertIcon, ChartBarIcon, CloudIcon, CodeBracketIcon, Cog6ToothIcon, CubeIcon, CurrencyDollarIcon, DevicePhoneMobileIcon, EyeIcon, FireIcon, GlobeAltIcon, KeyIcon, LightBulbIcon, PencilSquareIcon, PresentationChartBarIcon, ServerIcon, ShieldCheckIcon, SparklesIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function FeaturedSkills(){
    const skills = [
        {
          name: "Programming",
          icon: <CodeBracketIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Backend Development",
          icon: <ServerIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Web Development",
          icon: <GlobeAltIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Mobile Development",
          icon: <DevicePhoneMobileIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "3D Modeling",
          icon: <CubeIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "UI/UX Design",
          icon: <SparklesIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Data Analysis",
          icon: <ChartBarIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Cloud Computing",
          icon: <CloudIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Content Writing",
          icon: <PencilSquareIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Graphic Design",
          icon: <EyeIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Cybersecurity",
          icon: <ShieldCheckIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Cryptography",
          icon: <KeyIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Project Management",
          icon: <LightBulbIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "DevOps",
          icon: <ArrowPathIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Automation",
          icon: <Cog6ToothIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Game Development",
          icon: <FireIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Research",
          icon: <AcademicCapIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Data Visualization",
          icon: <PresentationChartBarIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Incident Response",
          icon: <BellAlertIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Team Collaboration",
          icon: <UserGroupIcon className="w-6 h-6 text-orange-500" />,
        },
        {
          name: "Finance Management",
          icon: <CurrencyDollarIcon className="w-6 h-6 text-orange-500" />,
        },
      ];
    return (
        <div className='bg-gradient-to-t from-[#F8ECF8] to-[#FFF3EA] rounded-lg p-2 sm:p-8 md:p-16 lg:p-20 bg-white'>
            <div className='px-3 font-medium text-4xl sm:text-5xl md:text-6x text-center pb-5'>
                <h1>Featured <span className='text-orange-500'>Skills</span></h1>
            </div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 mt-5">
                {skills.map((skill, index) => (
                    <li
                        key={index}
                        className="col-span-1 flex text-gray-500 text-xl font-semibold"
                    >
                        <div className="p-1">{skill.icon}</div>
                        <div>{skill.name}</div>
                    </li>

                ))}
            </ul>
        </div>
    )
}
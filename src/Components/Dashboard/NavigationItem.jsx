import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils";

const NavigationItem = ({ item, expanded, toggleExpand, isCollapsed }) => {
  return (
    <>
    <li key={item.name}>
      {item.submenu ? (
        <>
          <button
            onClick={() => toggleExpand(item.name)}
            className={classNames(
                              location.pathname.includes(item.href) ? "bg-gray-800 text-white" : "text-gray-200 hover:bg-gray-800 hover:text-white",
              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full text-left"
                            )}
          >
            <item.icon aria-hidden="true" className="h-6 w-6 shrink-0 text-[#ff9900]" />
            {!isCollapsed && item.name}
            <ChevronDownIcon className={classNames(
              expanded[item.name] ? "rotate-180" : "",
              "ml-auto h-5 w-5 text-gray-400 transition-transform"
            )} />
          </button>
          {expanded[item.name] && (
            <ul className="pl-10 mt-2 space-y-1">
              {item.submenu.map((subItem) => (
                <li key={subItem.name}>
                  <Link to={subItem.href} className="block text-gray-200 hover:bg-gray-800 hover:text-white rounded-md p-2 text-sm font-medium">
                    {subItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <Link
          to={item.href}
          className={classNames(
                              location.pathname.includes(item.href)
                                ? "bg-gray-800 text-white" : "text-gray-200 hover:bg-gray-800 hover:text-white",
            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full text-left"
                            )}
        >
          <item.icon aria-hidden="true" className="h-6 w-6 shrink-0 text-[#ff9900]" />
          {!isCollapsed && item.name}
        </Link>
      )}
    </li>
   
    </>
  );
};

export default NavigationItem;
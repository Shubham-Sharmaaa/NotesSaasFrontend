import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({
  title,
  icon,
  to,
}: {
  title: string;
  icon: React.ReactNode;
  to?: string;
}) => {
  return (
    <li>
      {to && (
        <NavLink
          to={to}
          className={`flex  gap-3 items-center [&.active]:bg-gray-600 rounded text-white px-2 py-1 `}
        >
          {icon} {title}
        </NavLink>
      )}
      {!to && (
        <div className="flex gap-3 items-center">
          {icon} {title}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;

import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({
  title,
  icon,
  to,
  nested = false,
}: {
  title: string;
  icon: React.ReactNode;
  to?: string;
  nested?: boolean;
}) => {
  const base =
    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-150";

  const nestedStyle = nested
    ? "ml-5 text-gray-500"
    : "text-gray-700 font-medium";

  const hover = "hover:bg-gray-300";

  const active = "bg-gray-300 text-blue-600";

  return (
    <li>
      {to ? (
        <NavLink
          to={to}
          className={({ isActive }) =>
            `${base} ${nestedStyle} ${hover} ${isActive ? active : ""}`
          }
        >
          <span className="text-[18px] opacity-80">{icon}</span>
          <span className="truncate">{title}</span>
        </NavLink>
      ) : (
        <div className={`${base} ${nestedStyle}`}>
          <span className="text-[22px] opacity-70">{icon}</span>
          <span>{title}</span>
        </div>
      )}
    </li>
  );
};

export default SidebarItem;

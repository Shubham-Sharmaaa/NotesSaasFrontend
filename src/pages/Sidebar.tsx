import { BsStar } from "react-icons/bs";
import LOGO from "../UI/LOGO";
import SidebarItem from "../UI/SidebarItem";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BiBox, BiFolder, BiFolderOpen, BiTrash } from "react-icons/bi";
import { CiHashtag } from "react-icons/ci";
import Profile from "../UI/Profile";
import { useContext } from "react";
import { NoteContext } from "../App";

const tags = ["Inspiration", "Coding", "Recipes", "Design"];
const Sidebar = () => {
  const context = useContext(NoteContext);

  return (
    <div className="w-50 flex flex-col h-screen bg-[#FAFAFB] border-r border-gray-200 justify-center items-center ">
      <div className="px-5 py-4">
        <LOGO />
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-6 ">
        <div className="">
          <ul className="space-y-1">
            <SidebarItem
              to="/dashboard"
              title="All Notes"
              icon={<IoDocumentTextOutline />}
            />
            <SidebarItem to="/favorites" title="Favorites" icon={<BsStar />} />
            <SidebarItem to="/archive" title="Archive" icon={<BiBox />} />
            <SidebarItem to="/trash" title="Trash" icon={<BiTrash />} />
            <SidebarItem to="/folders" title="My Folders" icon={<BiFolder />} />
          </ul>
        </div>

        {/* FOLDERS */}
        <div>
          <p className="text-[11px] font-semibold text-gray-400 px-3 mb-2 uppercase tracking-wider">
            FOLDERS
          </p>

          <ul className="space-y-1">
            {context?.folders.map((folder, i) => {
              if (i < 5) {
                return (
                  <SidebarItem
                    to={`/folder/${folder._id}`} // ✅ unchanged
                    title={folder.name}
                    icon={<BiFolderOpen />}
                    key={folder._id}
                    nested
                  />
                );
              }
            })}
          </ul>
        </div>

        {/* TAGS */}
        <div>
          <p className="text-[11px] font-semibold text-gray-400 px-3 mb-2 uppercase tracking-wider">
            TAGS
          </p>

          <ul className="space-y-1">
            {tags.map((tag, i) => (
              <SidebarItem title={tag} icon={<CiHashtag />} key={i} nested />
            ))}
          </ul>
        </div>
      </div>

      {/* PROFILE */}
      <div className="px-3 py-3 border-t border-gray-200">
        <Profile pic="profile.png" Name="Shubham" plan="free plan" />
      </div>
    </div>
  );
};

export default Sidebar;

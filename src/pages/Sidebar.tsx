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
    <div className="w-50   flex flex-col  pt-4 border-[#E4E4E8] border-2 h-screen bg-[#F9F9FB]">
      <div className="flex flex-col items-center gap-4 flex-1">
        <LOGO />
        <ul className="flex flex-col gap-2">
          <SidebarItem
            to="/dashboard"
            title="All Notes"
            icon={<IoDocumentTextOutline />}
          />
          <SidebarItem to="/favorites" title="Favorites" icon={<BsStar />} />
          <SidebarItem to="/archive" title="Archive" icon={<BiBox />} />
          <SidebarItem to="/trash" title="Trash" icon={<BiTrash />} />
        </ul>
        <div className="flex flex-col gap-2">
          <SidebarItem to="/folder" title="FOLDERS" icon={<BiFolder />} />
          <ul className="flex flex-col gap-2">
            {context?.folders.map((folder, i) => {
              if (i < 5) {
                return (
                  <SidebarItem
                    to={`/folder/${folder._id}`}
                    title={folder.name}
                    icon={<BiFolderOpen />}
                    key={i}
                  />
                );
              }
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <span>TAGS</span>
          <ul className="flex flex-col gap-2">
            {tags.map((tag, i) => (
              <SidebarItem title={tag} icon={<CiHashtag />} key={i} />
            ))}
          </ul>
        </div>
      </div>
      <div className="h-20 flex items-center justify-center border-t-2 border-[#E7E7ED]">
        <Profile pic="profile.png" Name="Shubham" plan="free plan" />
      </div>
    </div>
  );
};

export default Sidebar;

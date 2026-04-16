import { useContext } from "react";
import { BiBell } from "react-icons/bi";
import { BsArrowDown } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { NoteContext } from "../App";

const Header = () => {
  const context = useContext(NoteContext);

  return (
    <div className="flex gap-2 items-center justify-center h-14 px-4 border-[#EBEBEF] border-b-2">
      <div className="flex-1">
        <input
          onChange={(e) => context?.setquery(() => e.target.value)}
          className="w-full bg-[#F9F9FB] rounded-2xl text-center "
          placeholder={`🔎 Search your notes,folders and tags...`}
        />
      </div>
      <div className="flex gap-2 items-center">
        <button>
          <BiBell />
        </button>
        <span>|</span>
        <div className="flex gap-2 items-center">
          <button className="flex gap-2 items-center border-[#EBEBEF] border-2 px-2 py-1 rounded">
            <FiFilter />
            <span>Filter</span>
          </button>
          <button className="flex gap-2 items-center border-[#EBEBEF] border-2 px-2 py-1 rounded">
            <span>Sort By Date</span>
            <BsArrowDown />
          </button>
          <button
            className="bg-blue-300 border-[#EBEBEF] border-2 px-2 py-1 rounded-md"
            onClick={() => {
              localStorage.removeItem("token");
              context?.setisAuth?.(false);
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";
import type { NoteType } from "../App";

const backendurl = import.meta.env.VITE_BACKEND_URL;
function OptionsItem({
  title,
  id,
  setNotes,
}: {
  title: string;
  id: string;
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
}) {
  const { folderId } = useParams();

  async function AddNoteToFolder() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${backendurl}/private/move-item-to-folder`,
        {
          noteId: id,
          folderId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (res.data.note) {
        setNotes((notes) => [...notes, res.data.note]);
      }
    } catch (err) {
      console.log(err);
    }
    // if(res.data)
  }
  return (
    <li className="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
      <span className="text-sm text-gray-700 truncate">{title}</span>

      <button
        onClick={AddNoteToFolder}
        className="opacity-0 group-hover:opacity-100 transition p-1 rounded-md hover:bg-blue-100 hover:text-blue-600"
      >
        <BiPlus size={18} />
      </button>
    </li>
  );
}
export default OptionsItem;

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
    <div className="bg-gray-400 w-full flex justify-between px-2 py-1">
      <span>{title}</span>
      <button onClick={AddNoteToFolder}>
        <BiPlus />
      </button>
    </div>
  );
}
export default OptionsItem;

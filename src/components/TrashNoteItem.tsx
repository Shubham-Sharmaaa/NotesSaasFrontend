import { useContext } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { NoteContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
const backend_url = import.meta.env.VITE_BACKEND_URL;
const TrashNoteItem = ({
  title,
  body,
  date,
  id,
}: {
  title: string;
  body: string;
  date: string | null;
  id: string;
}) => {
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let diff;
  if (date) {
    diff = formatDistanceToNow(new Date(date));
  }
  async function handleDelete() {
    try {
      const res = await axios.delete(`${backend_url}/private/delete-note`, {
        headers: { Authorization: "Bearer " + token },
        data: { id },
      });
      const data = res.data;
      console.log(data);
      context?.setNotes((notes) =>
        notes.filter((note) => note._id !== res.data.deletedNote._id),
      );
    } catch (e) {
      console.log(e);
    }
  }
  async function removeTrashItem() {
    try {
      const res = await axios.put(
        `${backend_url}/private/remove-trash`,
        { id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      console.log(res.data);

      console.log("notes before ", context?.notes);
      context?.setNotes?.((notes) =>
        notes.map((note) => {
          if (note._id === id) {
            return { ...note, isDeleted: false };
          } else {
            return note;
          }
        }),
      );
      console.log("notes after ", context?.notes);
    } catch (err) {
      console.log("error ", err);
    }
  }
  return (
    <div
      onClick={() => navigate(`/edit-note/${id}`)}
      className="group flex flex-col justify-between h-52 rounded-xl border border-[#EBEBEF] bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {title}
          </h2>
          <div className="flex gap-2 items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <MdDeleteOutline />
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 line-clamp-3">{body}</p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">{date ? diff : "NUll"}</span>

        <span
          className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition"
          onClick={async (e) => {
            e.stopPropagation();
            await removeTrashItem();
          }}
        >
          Remove from Trash
        </span>
      </div>
    </div>
  );
};
export default TrashNoteItem;

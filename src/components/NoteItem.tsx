import { useContext } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { NoteContext } from "../App";
import { useNavigate } from "react-router-dom";
const backend_url = import.meta.env.VITE_BACKEND_URL;
const NoteItem = ({
  title,
  body,
  date,

  id,
}: {
  title: string;
  body: string;
  date: string;

  id: string;
}) => {
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  const cleanDate = new Date(date).toLocaleDateString("en-GB");
  async function handleDelete() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${backend_url}/private/delete-content`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const data = await res.json();
    console.log(data);
    context?.setNotes((notes) => notes.filter((note) => note._id !== id));
  }
  return (
    <div className="group flex flex-col justify-between h-52 rounded-xl border border-[#EBEBEF] bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {title}
          </h2>
          <button onClick={handleDelete}>
            <MdDeleteOutline />
          </button>
        </div>

        <p className="text-sm text-gray-500 line-clamp-3">{body}</p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">{cleanDate}</span>

        <span
          className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition"
          onClick={() => navigate("/edit-note", { state: { title, body, id } })}
        >
          Open →
        </span>
      </div>
    </div>
  );
};
export default NoteItem;

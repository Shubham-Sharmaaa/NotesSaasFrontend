import { useContext, useState } from "react";
import { MdDeleteOutline, MdOutlinePushPin } from "react-icons/md";
import { NoteContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiUnpinLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
const backend_url = import.meta.env.VITE_BACKEND_URL;
const NoteItem = ({
  title,
  body,
  date,
  id,
  isPinned,
  isFavorite,
}: {
  title: string;
  body: string;
  date: string;
  id: string;
  isPinned: boolean;
  isFavorite: boolean;
}) => {
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  const cleanDate = new Date(date).toLocaleDateString("en-GB");
  const token = localStorage.getItem("token");
  const [pin, setPin] = useState(isPinned);
  const [fav, setFav] = useState(isFavorite);
  async function handleDelete() {
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
  async function handlePin() {
    try {
      const res = await axios.put(
        `${backend_url}/private/pin-note`,
        {
          noteId: id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      console.log(res.data);
      const newNote = res.data.newNote;

      context?.setNotes((notes) =>
        notes.map((note) => {
          if (note._id === id) return { ...note, isPinned: newNote.isPinned };
          else {
            return note;
          }
        }),
      );
      setPin((pin) => !pin);
    } catch (err) {
      console.log("err ", err);
    }
  }
  async function handleFav() {
    try {
      const res = await axios.put(
        `${backend_url}/private/add-favorite`,
        {
          noteId: id,
          isFavorite: !fav,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      console.log(res.data);
      const newNote = res.data.newNote;
      context?.setNotes((notes) =>
        notes.map((note) => {
          if (note._id === id)
            return { ...note, isFavorite: newNote.isFavorite };
          else {
            return note;
          }
        }),
      );
      setFav((fav) => !fav);
    } catch (err) {
      console.log("err ", err);
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePin();
              }}
            >
              {pin ? <MdOutlinePushPin /> : <RiUnpinLine />}
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 line-clamp-3">{body}</p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">{cleanDate}</span>

        {/* <span
          className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition"
          onClick={() => navigate(`/edit-note/${id}`)}
        >
          Open →
        </span> */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFav();
          }}
        >
          {fav ? <FaHeart /> : <CiHeart />}
        </button>
      </div>
    </div>
  );
};
export default NoteItem;

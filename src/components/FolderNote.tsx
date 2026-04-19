import { useContext, useState } from "react";
import { MdDeleteOutline, MdOutlinePushPin } from "react-icons/md";
import { NoteContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiUnpinLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
const backend_url = import.meta.env.VITE_BACKEND_URL;
const FolderNote = ({
  title,
  body,
  date,
  id,
  isPinned,
  isFavorite,
  isArchived,
}: {
  title: string;
  body: string;
  date: string;
  id: string;
  isPinned: boolean;
  isFavorite: boolean;
  isArchived?: boolean;
}) => {
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  const cleanDate = new Date(date).toLocaleDateString("en-GB");
  const token = localStorage.getItem("token");
  const [pin, setPin] = useState(isPinned);
  const [fav, setFav] = useState(isFavorite);
  async function handleDelete() {
    const res = await fetch(`${backend_url}/private/move-trash`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const data = await res.json();

    context?.setNotes((notes) =>
      notes.map((note) => {
        if (note._id === data.deletedNote._id) {
          return {
            ...note,
            isDeleted: data.deletedNote.isDeleted,
            deleteDate: data.deletedNote.deleteDate,
          };
        } else {
          return note;
        }
      }),
    );
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
        `${backend_url}/private/toggle-favorite`,
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
  async function handleArchive() {
    try {
      const res = await axios.put(
        `${backend_url}/private/toggle-archive`,
        {
          noteId: id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      const newNote = res.data.newNote;
      context?.setNotes((notes) =>
        notes.map((note) => {
          if (note._id === newNote._id)
            return {
              ...note,
              isArchived: newNote.isArchived,
            };
          else {
            return note;
          }
        }),
      );
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
              onClick={async (e) => {
                e.stopPropagation();
                await handleFav();
              }}
            >
              {fav ? <FaHeart /> : <CiHeart />}
            </button>
            <button
              onClick={async (e) => {
                e.stopPropagation();
                await handleDelete();
              }}
            >
              <MdDeleteOutline />
            </button>
            <button
              onClick={async (e) => {
                e.stopPropagation();
                await handlePin();
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

        <span
          className="text-xs text-center text-blue-500 opacity-0 group-hover:opacity-100 transition"
          onClick={async (e) => {
            e.stopPropagation();
            await handleArchive();
          }}
        >
          {isArchived ? "UnArchive →" : "Archive →"}
        </span>
      </div>
    </div>
  );
};
export default FolderNote;

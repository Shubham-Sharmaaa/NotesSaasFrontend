import axios from "axios";
import type React from "react";
import { NoteContext, type NoteType } from "../App";
import { useContext } from "react";
const backend_url = import.meta.env.VITE_BACKEND_URL;
const CreateContentForm = ({ oncloseModal }: { oncloseModal?: () => void }) => {
  const context = useContext(NoteContext);

  async function createNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      body: formData.get("body"),
      isFavorite: formData.get("isFavorite") === "on",
    };

    const res = await axios.post(
      `${backend_url}/private/create-content`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    const recieveddata = res.data.newContent;
    const newNote: NoteType = {
      _id: recieveddata._id,
      title: recieveddata.title,
      body: recieveddata.body,
      createdAt: recieveddata.createdAt,
      isPinned: recieveddata.isPinned,
      isFavorite: recieveddata.isFavorite,
      isDeleted: recieveddata.isDeleted,
      isArchived: recieveddata.isArchived,
      deleteDate: recieveddata.deleteDate,
    };
    context?.setNotes?.((notes: NoteType[]) => [...notes, newNote]);

    oncloseModal?.();
  }
  return (
    <form onSubmit={createNote} className="flex flex-col gap-2">
      <input
        name="title"
        placeholder="Enter Title"
        className="text-center bg-[#EBEBED] rounded "
        required
      />
      <input
        name="body"
        placeholder="Enter Body"
        className="text-center bg-[#EBEBED] rounded"
        required
      />
      <label className="flex items-center gap-2 cursor-pointer">
        <span className="text-gray-700">Favorite</span>

        <div className="relative">
          <input type="checkbox" name="isFavorite" className="sr-only peer" />

          <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition" />

          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-6" />
        </div>
      </label>
      <button className="bg-[#585858] p-2 rounded">Add</button>
    </form>
  );
};

export default CreateContentForm;

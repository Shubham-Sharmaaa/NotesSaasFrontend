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
    console.log(res.data);
    const recieveddata = res.data.newContent;
    const newNote: NoteType = {
      _id: recieveddata._id,
      title: recieveddata.title,
      body: recieveddata.body,
      createdAt: recieveddata.createdAt,
    };
    context?.setNotes?.((notes: NoteType[]) => [...notes, newNote]);
    console.log("notes: ", context?.notes);
    oncloseModal?.();
  }
  return (
    <form onSubmit={createNote} className="flex flex-col gap-2">
      <input
        name="title"
        placeholder="Enter Title"
        className="text-center bg-[#EBEBED] rounded "
      />
      <input
        name="body"
        placeholder="Enter Body"
        className="text-center bg-[#EBEBED] rounded"
      />
      <button className="bg-[#585858] p-2 rounded">Add</button>
    </form>
  );
};

export default CreateContentForm;

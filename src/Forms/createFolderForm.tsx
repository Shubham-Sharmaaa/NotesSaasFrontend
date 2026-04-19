import axios from "axios";
import type React from "react";
import { NoteContext, type FolderType } from "../App";
import { useContext } from "react";
const backend_url = import.meta.env.VITE_BACKEND_URL;
const CreateFolderForm = ({ oncloseModal }: { oncloseModal?: () => void }) => {
  const context = useContext(NoteContext);

  async function createFolder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData(e.currentTarget);
    const data = {
      folderName: formData.get("name"),
    };

    const res = await axios.post(`${backend_url}/private/create-folder`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    context?.setFolders?.((folder: FolderType[]) => [
      ...folder,
      res.data.newFolder,
    ]);
    oncloseModal?.();
  }
  return (
    <form onSubmit={createFolder} className="flex flex-col gap-2">
      <input
        name="name"
        placeholder="Enter Folder Name"
        className="text-center bg-[#EBEBED] rounded "
        required
      />

      <button className="bg-[#585858] p-2 rounded">Add</button>
    </form>
  );
};

export default CreateFolderForm;

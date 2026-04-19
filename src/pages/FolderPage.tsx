import { useContext, useEffect, useState } from "react";
import { NoteContext, type NoteType } from "../App";

import { useParams } from "react-router-dom";
import axios from "axios";
import FolderNote from "../components/FolderNote";

import AddNoteToFolder from "../components/AddNoteToFolder";

const backendurl = import.meta.env.VITE_BACKEND_URL;
const FolderPage = () => {
  const context = useContext(NoteContext);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const params = useParams();
  const folderId = params.folderId;
  //   const folders = context?.folders.filter((folder) => folder._id === folderId);
  const folder = context?.folders.find(
    (currfolder) => currfolder._id === folderId,
  );
  useEffect(() => {
    async function fetchNotes() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${backendurl}/private/get-folder-notes/${folderId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );

        setNotes(res.data.notes);
      } catch (err) {
        console.log("error ", err);
      }
    }
    fetchNotes();
  }, [folderId]);

  return (
    <div className="grid md:grid-cols-4 p-4 gap-2 sm:grid-cols-3">
      {notes?.map((note) => (
        <FolderNote
          title={note.title}
          body={note.body}
          date={note.createdAt}
          key={note._id}
          id={note._id}
          isPinned={note.isPinned}
          isFavorite={note.isFavorite}
        />
      ))}
      {notes?.length === 0 && (
        <div className="text-4xl flex p-4 col-span-3">
          No item in {folder?.name}
        </div>
      )}
      <AddNoteToFolder setNotes={setNotes} />
    </div>
  );
};

export default FolderPage;

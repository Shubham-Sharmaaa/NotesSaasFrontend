import { useContext } from "react";
import { NoteContext } from "../App";

import TrashNoteItem from "../components/TrashNoteItem";

const Trash = () => {
  const context = useContext(NoteContext);
  const Deleted = context?.notes.filter((note) => note.isDeleted);
  return (
    <div className="grid md:grid-cols-4 p-4 gap-2 sm:grid-cols-3">
      {Deleted?.map((note) => (
        <TrashNoteItem
          title={note.title}
          body={note.body}
          date={note.createdAt}
          key={note._id}
          id={note._id}
          isPinned={note.isPinned}
          isFavorite={note.isFavorite}
        />
      ))}
    </div>
  );
};

export default Trash;

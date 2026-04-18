import { useContext } from "react";
import { NoteContext } from "../App";

import TrashNoteItem from "../components/TrashNoteItem";

const Trash = () => {
  const context = useContext(NoteContext);
  const Deleted = context?.notes.filter((note) => note.isDeleted);
  const query = context?.query?.toLowerCase();
  if (query) {
    const searcharr = Deleted?.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.body.toLowerCase().includes(query),
    );
    return (
      <div className="grid md:grid-cols-4 p-4 gap-2 sm:grid-cols-3">
        {searcharr?.map((note) => (
          <TrashNoteItem
            title={note.title}
            body={note.body}
            date={note.deleteDate}
            key={note._id}
            id={note._id}
          />
        ))}
        {searcharr?.length === 0 && <div>No Result </div>}
      </div>
    );
  }
  return (
    <>
      <div className="grid md:grid-cols-4 p-4 gap-2 sm:grid-cols-3">
        {Deleted?.map((note) => (
          <TrashNoteItem
            title={note.title}
            body={note.body}
            date={note.deleteDate}
            key={note._id}
            id={note._id}
          />
        ))}
      </div>
      {Deleted?.length === 0 && (
        <div className="text-4xl flex p-4">No item in Trash</div>
      )}
    </>
  );
};

export default Trash;

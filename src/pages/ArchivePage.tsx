import { useContext } from "react";
import { NoteContext } from "../App";
import NoteItem from "../components/NoteItem";

const ArchivePage = () => {
  const context = useContext(NoteContext);
  const archive = context?.notes.filter(
    (note) => !note.isDeleted && note.isArchived,
  );
  const query = context?.query?.toLowerCase();
  if (query) {
    const searcharr = archive?.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.body.toLowerCase().includes(query),
    );
    return (
      <div className="grid md:grid-cols-4 p-4 gap-2 sm:grid-cols-3">
        {searcharr?.map((note) => (
          <NoteItem
            title={note.title}
            body={note.body}
            date={note.createdAt}
            key={note._id}
            id={note._id}
            isPinned={note.isPinned}
            isFavorite={note.isFavorite}
            isArchived={note.isArchived}
          />
        ))}
        {searcharr?.length === 0 && <div>No result</div>}
      </div>
    );
  }
  return (
    <>
      <div className="grid md:grid-cols-4 p-4 gap-2 sm:grid-cols-3">
        {archive?.map((note) => (
          <NoteItem
            title={note.title}
            body={note.body}
            date={note.createdAt}
            key={note._id}
            id={note._id}
            isPinned={note.isPinned}
            isFavorite={note.isFavorite}
            isArchived={note.isArchived}
          />
        ))}
      </div>
      {archive?.length === 0 && (
        <div className="text-4xl flex p-4">No Archives</div>
      )}
    </>
  );
};

export default ArchivePage;

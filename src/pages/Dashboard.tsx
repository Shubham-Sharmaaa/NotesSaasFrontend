import CreateNote from "../components/CreateNote";

import { useContext } from "react";
import NoteItem from "../components/NoteItem";
import { NoteContext } from "../App";

const Dashboard = () => {
  const context = useContext(NoteContext);
  const notDeleted = context?.notes.filter(
    (note) => !note.isDeleted && !note.isArchived,
  );
  const query = context?.query;
  if (query) {
    const searcharr = notDeleted?.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.body.toLowerCase().includes(query.toLowerCase()),
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
          />
        ))}
        {searcharr?.length === 0 && <div>No result</div>}
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-4 p-4 gap-2 sm:grid-cols-3">
      {notDeleted?.map((note) => {
        if (note.isPinned) {
          return (
            <NoteItem
              title={note.title}
              body={note.body}
              date={note.createdAt}
              key={note._id}
              id={note._id}
              isPinned={note.isPinned}
              isFavorite={note.isFavorite}
            />
          );
        }
      })}
      {notDeleted?.map((note) => {
        if (!note.isPinned) {
          return (
            <NoteItem
              title={note.title}
              body={note.body}
              date={note.createdAt}
              key={note._id}
              id={note._id}
              isPinned={note.isPinned}
              isFavorite={note.isFavorite}
            />
          );
        }
      })}
      <CreateNote />
    </div>
  );
};

export default Dashboard;

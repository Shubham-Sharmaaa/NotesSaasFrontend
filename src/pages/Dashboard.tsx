import CreateNote from "../components/CreateNote";

import { useContext } from "react";
import NoteItem from "../components/NoteItem";
import { NoteContext } from "../App";

const Dashboard = () => {
  const context = useContext(NoteContext);
  const notDeleted = context?.notes.filter((note) => !note.isDeleted);
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

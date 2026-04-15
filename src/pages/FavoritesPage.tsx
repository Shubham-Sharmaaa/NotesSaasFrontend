import { useContext } from "react";
import { NoteContext } from "../App";
import NoteItem from "../components/NoteItem";

const FavoritesPage = () => {
  const context = useContext(NoteContext);
  return (
    <div className="grid md:grid-cols-4 p-4 gap-2 sm:grid-cols-3">
      {context?.notes?.map((note) => {
        if (note.isFavorite) {
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
    </div>
  );
};

export default FavoritesPage;

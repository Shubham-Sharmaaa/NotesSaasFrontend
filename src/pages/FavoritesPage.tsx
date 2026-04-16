import { useContext } from "react";
import { NoteContext } from "../App";
import NoteItem from "../components/NoteItem";

const FavoritesPage = () => {
  const context = useContext(NoteContext);
  const fav = context?.notes.filter(
    (note) => !note.isDeleted && note.isFavorite && !note.isArchived,
  );
  const query = context?.query?.toLowerCase();
  if (query) {
    const searcharr = fav?.filter(
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
          />
        ))}
        {searcharr?.length === 0 && <div>No Result </div>}
      </div>
    );
  }
  return (
    <>
      <div className="grid md:grid-cols-4 p-4 gap-2 sm:grid-cols-3">
        {fav?.map((note) => (
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
      </div>
      {fav?.length === 0 && (
        <div className="text-4xl flex p-4">No item in Favourites</div>
      )}
    </>
  );
};

export default FavoritesPage;

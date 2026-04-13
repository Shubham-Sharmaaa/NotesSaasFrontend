import CreateNote from "../components/CreateNote";

import { useContext } from "react";
import NoteItem from "../components/NoteItem";
import { NoteContext } from "../App";

const Dashboard = () => {
  const context = useContext(NoteContext);

  return (
    <div className="grid md:grid-cols-4 p-4 gap-2 sm:grid-cols-3">
      {context?.notes?.map((note) => (
        <NoteItem
          title={note.title}
          body={note.body}
          date={note.createdAt}
          key={note._id}
          id={note._id}
        />
      ))}
      <CreateNote />
    </div>
  );
};

export default Dashboard;

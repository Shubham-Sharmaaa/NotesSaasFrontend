import { useContext } from "react";
import CreateFolder from "../components/CreateFolder";
import { NoteContext } from "../App";
import FolderItem from "../components/FolderItem";

const FolderDashboard = () => {
  const context = useContext(NoteContext);
  const folders = context?.folders;
  return (
    <div className="grid md:grid-cols-4 p-4 gap-2 sm:grid-cols-3">
      {folders?.map((folder) => (
        <FolderItem
          id={folder._id}
          name={folder.name}
          date={folder.createdAt}
        />
      ))}
      <CreateFolder />
    </div>
  );
};

export default FolderDashboard;

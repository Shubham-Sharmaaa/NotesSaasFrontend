import { useNavigate } from "react-router-dom";

const FolderItem = ({
  id,
  name,
  date,
}: {
  id: string;
  name: string;
  date: string;
}) => {
  // const context = useContext(NoteContext);
  const navigate = useNavigate();
  const cleanDate = new Date(date).toLocaleDateString("en-GB");
  return (
    <div
      onClick={() => navigate(`/folder/${id}`)}
      className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer group"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className="text-xl">📁</span>
          <h2 className="font-semibold text-lg">{name}</h2>
        </div>

        <button className="opacity-0 group-hover:opacity-100 transition text-gray-500 hover:text-black">
          ⋮
        </button>
      </div>

      <div className="mt-3 text-sm text-gray-500">12 notes</div>

      <div className="text-xs text-gray-400 mt-1">{cleanDate}</div>
    </div>
  );
};
export default FolderItem;

import { IoPersonCircleSharp } from "react-icons/io5";

const Review = ({ author, content }: { author: string; content: string }) => {
  return (
    <div className="w-75 md:w-[50%] border p-2 rounded-md bg-gray-100 flex gap-2 items-center shadow-gray-50">
      <IoPersonCircleSharp size={100} />
      <div>
        <p className="font-semibold text-sm">"{content}"</p>
        <h3 className="text-[#797B8B] text-xs">{author}</h3>
      </div>
    </div>
  );
};

export default Review;

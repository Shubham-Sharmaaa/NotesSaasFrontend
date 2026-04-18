import { CiSettings } from "react-icons/ci";

const Profile = ({
  pic,
  Name,
  plan,
}: {
  pic: string;
  Name: string;
  plan: string;
}) => {
  return (
    <div className="flex gap-4  items-center ">
      <img src={pic} height={"50"} width={"50"} className="rounded-[50%]" />
      <div className="flex flex-col ">
        <span>{Name}</span>
        <span>{plan}</span>
      </div>
      <CiSettings />
    </div>
  );
};

export default Profile;

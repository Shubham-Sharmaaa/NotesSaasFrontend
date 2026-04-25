import { useEffect, useState } from "react";
import LOGO from "../UI/LOGO";
import { BiLeftArrow } from "react-icons/bi";

import { FaCameraRetro } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Window } from "../components/Modal";

const backendurl = import.meta.env.VITE_BACKEND_URL;
import { useParams } from "react-router-dom";

const PublicPage = ({ isAuth }: { isAuth: boolean | null }) => {
  const { hash } = useParams();
  const decodedHash = decodeURIComponent(hash!);
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    async function fetchnote() {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${backendurl}/get-note/${encodeURIComponent(decodedHash)}`,
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + token,
          },
        },
      );
      const data = await res.json();
      setId(data.note.id);
      setTitle(data.note.title);
      setBody(data.note.body);
    }
    fetchnote();
  }, [decodedHash]);

  function redirectEdit() {
    return navigate(`/edit-note/${id}`);
  }
  function Login() {
    return navigate("/auth/signin");
  }
  function WindowPop() {
    setIsOpen(true);
    return;
  }
  if (isAuth === null) return <div>Loading...</div>;

  return (
    <>
      {isAuth && (
        <div className="h-screen w-screen flex flex-col">
          <div className="h-12.5 w-full border-b-2 border-[#E9E9ED] flex justify-between items-center px-4 lg:px-10">
            <div className="flex items-center gap-2">
              <BiLeftArrow onClick={() => navigate("/dashboard")} />
              <LOGO />
            </div>
            <div className="flex gap-2">
              <button
                onClick={redirectEdit}
                className="flex items-center gap-2 bg-[#1FD5F9] text-[#F1FDFF] py-1 px-2 rounded-lg "
              >
                <FaCameraRetro />
                <span>Save Note</span>
              </button>
              <Window isOpen={isOpen} setIsOpen={setIsOpen}>
                <div>
                  <p>Please Login to Save</p>
                  <button onClick={Login}>Login</button>
                </div>
              </Window>
            </div>
          </div>
          <div className="flex-1  mt-20 ml-30">
            <h2>{title}</h2>

            <p>{body}</p>
          </div>
        </div>
      )}
      {!isAuth && (
        <div className="h-screen w-screen flex flex-col">
          <div className="h-12.5 w-full border-b-2 border-[#E9E9ED] flex justify-between items-center px-4 lg:px-10">
            <div className="flex items-center gap-2">
              <LOGO />
            </div>
            <div className="flex gap-2">
              <button
                onClick={WindowPop}
                className="flex items-center gap-2 bg-[#1FD5F9] text-[#F1FDFF] py-1 px-2 rounded-lg "
              >
                <FaCameraRetro />
                <span>Save Note</span>
              </button>
              <Window isOpen={isOpen} setIsOpen={setIsOpen}>
                <div>
                  <p>Please Login to Save</p>
                  <button onClick={Login}>Login</button>
                </div>
              </Window>
              <button onClick={() => navigate("/auth/signin")}>Signin</button>
            </div>
          </div>
          <div className="flex-1  mt-20 ml-30">
            <h2>{title}</h2>

            <p>{body}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicPage;

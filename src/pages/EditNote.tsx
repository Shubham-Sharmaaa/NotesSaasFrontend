import { useContext, useRef, useState } from "react";
import LOGO from "../UI/LOGO";
import { BiLeftArrow, BiShare } from "react-icons/bi";

import { FaCameraRetro } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { NoteContext } from "../App";
import Modal from "../components/Modal";

const backendurl = import.meta.env.VITE_BACKEND_URL;
const EditNote = () => {
  const location = useLocation();
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  const titleref = useRef<HTMLInputElement>(null);
  const bodyref = useRef<HTMLInputElement>(null);
  const [hash, sethash] = useState("");
  async function submitUpdatedNote() {
    const title = titleref.current?.value;
    const body = bodyref.current?.value;
    const token = localStorage.getItem("token");
    if (!title || !body) {
      alert("enter input");
      return;
    }
    const res = await fetch(`${backendurl}/private/update-note`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        id: location?.state?.id,
      }),
    });
    const data = await res.json();
    console.log(data);
    console.log(context?.notes);
    context?.setNotes((notes) =>
      notes.filter((note) => note._id !== location?.state?.id),
    );

    context?.setNotes((notes) => [...notes, data.note]);

    console.log(context?.notes);
    navigate(-1);
  }
  async function createLink() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${backendurl}/private/create-link`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteId: location?.state?.id }),
    });
    const data = await res.json();
    sethash(data.link);
  }
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="h-12.5 w-full border-b-2 border-[#E9E9ED] flex justify-between items-center px-4 lg:px-10">
        <div className="flex items-center gap-2">
          <BiLeftArrow onClick={() => navigate(-1)} />
          <LOGO />
        </div>
        <div className="flex gap-2">
          {hash && (
            <Modal>
              <Modal.Name name="link">
                <button>Show link</button>
              </Modal.Name>
              <Modal.Window name="link">
                <div>{`${backendurl}/get-note/${hash}`}</div>
              </Modal.Window>
            </Modal>
          )}
          <button
            onClick={createLink}
            className="flex items-center gap-2 bg-gray-200 py-1 px-2 rounded-lg"
          >
            <BiShare />
            <span>Share</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 py-1 px-2 rounded-lg border-red-500 border"
          >
            Cancel
          </button>
          <button
            onClick={submitUpdatedNote}
            className="flex items-center gap-2 bg-[#1FD5F9] text-[#F1FDFF] py-1 px-2 rounded-lg "
          >
            <FaCameraRetro />
            <span>Save Note</span>
          </button>
        </div>
      </div>
      <div className="flex-1  mt-20 ml-30">
        <h2>
          <input ref={titleref} defaultValue={location?.state?.title} />
        </h2>
        {/* <div>
          <span>Sarah</span>
          <span>4 mkin read</span>
          <span>Public</span>
        </div> */}
        <p>
          <input ref={bodyref} defaultValue={location?.state?.body} />
        </p>
      </div>
    </div>
  );
};

export default EditNote;

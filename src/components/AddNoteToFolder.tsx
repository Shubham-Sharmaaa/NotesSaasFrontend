import React, { useContext } from "react";
import Modal from "./Modal";
import { NoteContext, type NoteType } from "../App";
import OptionsItem from "./OptionItems";

function AddNoteToFolder({
  setNotes,
}: {
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
}) {
  const context = useContext(NoteContext);
  return (
    <div>
      <Modal>
        <Modal.Name name="addNoteToFolder">
          <button className="bg-gray-400 p-2 rounded-lg">
            Add note to folder
          </button>
        </Modal.Name>
        <Modal.Window name="addNoteToFolder">
          <div className="min-w-75  ">
            <div className="bg-gray-600">
              <p> Notes</p>
            </div>

            <div className="scroll-auto">
              <ul>
                {context?.notes.map((note) => (
                  <OptionsItem
                    title={note.title}
                    id={note._id}
                    key={note._id}
                    setNotes={setNotes}
                  />
                ))}
              </ul>
            </div>
          </div>
        </Modal.Window>
      </Modal>
    </div>
  );
}
export default AddNoteToFolder;

import React, { useContext } from "react";
import Modal from "./Modal";
import { NoteContext, type NoteType } from "../App";
import OptionsItem from "./OptionItems";
import { BiPlus } from "react-icons/bi";

function AddNoteToFolder({
  notes,
  setNotes,
}: {
  notes: NoteType[];
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
}) {
  const context = useContext(NoteContext);
  const noteIds = new Set(notes.map((n) => n._id));
  const array = context?.notes.filter((note) => !noteIds.has(note._id));
  return (
    <div>
      <Modal>
        <Modal.Name name="addNoteToFolder">
          <div className=" flex flex-col gap-2 items-center justify-center  h-50 rounded border-dotted border-[#EBEBEF]  border-2  bg-[#FDFDFE]">
            <button className=" p-2 bg-[#FFFFFF]  border-[#FCFCFD] border-2  rounded-full">
              <BiPlus color="blue" />
            </button>
            <span>Add Note</span>
            <span className="text-sm text-[#B2B2BC] text-center">
              Add Notes to Folder
            </span>
          </div>
        </Modal.Name>
        <Modal.Window name="addNoteToFolder">
          <div className="w-[320px] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b bg-gray-50">
              <h2 className="text-sm font-semibold text-gray-700">Add Notes</h2>
            </div>

            <div className="max-h-64 overflow-y-auto">
              <ul className="divide-y">
                {array?.map((note) => (
                  <OptionsItem
                    title={note.title}
                    id={note._id}
                    key={note._id}
                    setNotes={setNotes}
                  />
                ))}
                {array?.length === 0 && (
                  <p className="w-full p-2">No Note to Add</p>
                )}
              </ul>
            </div>
          </div>
        </Modal.Window>
      </Modal>
    </div>
  );
}
export default AddNoteToFolder;

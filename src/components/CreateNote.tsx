import { BiPlus } from "react-icons/bi";
import Modal from "./Modal";
import CreateContentForm from "../Forms/createContentForm";

const CreateNote = () => {
  return (
    <Modal>
      <Modal.Name name="createContent">
        <div className=" flex flex-col gap-2 items-center justify-center  h-50 rounded border-dotted border-[#EBEBEF]  border-2  bg-[#FDFDFE]">
          <button className=" p-2 bg-[#FFFFFF]  border-[#FCFCFD] border-2  rounded-full">
            <BiPlus color="blue" />
          </button>
          <span>New Document</span>
          <span className="text-sm text-[#B2B2BC] text-center">
            Start from a blank page or template
          </span>
        </div>
      </Modal.Name>
      <Modal.Window name="createContent">
        <CreateContentForm />
      </Modal.Window>
    </Modal>
  );
};

export default CreateNote;

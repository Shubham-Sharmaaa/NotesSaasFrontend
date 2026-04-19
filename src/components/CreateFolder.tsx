import { BiPlus } from "react-icons/bi";
import Modal from "./Modal";
import CreateFolderForm from "../Forms/createFolderForm";

const CreateFolder = () => {
  return (
    <Modal>
      <Modal.Name name="createContent">
        <div className=" flex flex-col gap-2 items-center justify-center  h-50 rounded border-dotted border-[#EBEBEF]  border-2  bg-[#FDFDFE]">
          <button className=" p-2 bg-[#FFFFFF]  border-[#FCFCFD] border-2  rounded-full">
            <BiPlus color="blue" />
          </button>
          <span>New Folder</span>
          <span className="text-sm text-[#B2B2BC] text-center">
            Add Notes to Folder
          </span>
        </div>
      </Modal.Name>
      <Modal.Window name="createContent">
        <CreateFolderForm />
      </Modal.Window>
    </Modal>
  );
};

export default CreateFolder;

import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";
import { BiX } from "react-icons/bi";
type ModalContextType = {
  name: string;
  open: (name: string) => void;
  close: () => void;
};
const ModalContext = createContext<ModalContextType | undefined>(undefined);
const Modal = ({ children }: { children: React.ReactNode }) => {
  const [name, setname] = useState("");
  const close = () => setname("");
  const open = (name: string) => setname(name);

  return (
    <ModalContext.Provider value={{ name, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

function Name({
  name,
  children,
}: {
  name: string;
  children: ReactElement<{ onClick: () => void }>;
}) {
  const context = useContext(ModalContext);
  if (!context) return null;
  const { open } = context;
  return cloneElement(children, {
    onClick: () => {
      open(name);
    },
  });
}
export function Window({
  children,
  name: windowName,
  isOpen,
  setIsOpen,
}: {
  children: ReactElement<{ oncloseModal: () => void }>;
  name?: string;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const context = useContext(ModalContext);
  const closeLocal = () => setIsOpen?.(false);
  if (!windowName) {
    if (!isOpen || !setIsOpen) return null;
    return createPortal(
      <div className="fixed inset-0 z-1000 flex items-center justify-center">
        <div
          onClick={closeLocal}
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        />

        <div className="relative z-10 w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">
          <button
            onClick={closeLocal}
            className="absolute top-4 right-4 p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <BiX size={18} />
          </button>

          {cloneElement(children, { oncloseModal: closeLocal })}
        </div>
      </div>,
      document.body,
    );
  }
  if (!context) return null;
  const { name, close } = context;
  if (name !== windowName) return null;
  return createPortal(
    <div className="fixed inset-0 z-1000 flex items-center justify-center">
      <div
        onClick={close}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />

      <div className="relative z-10 w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">
        <button
          onClick={close}
          className="absolute top-4 right-4 p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
        >
          <BiX size={18} />
        </button>

        {cloneElement(children, { oncloseModal: close })}
      </div>
    </div>,
    document.body,
  );
}
Modal.Name = Name;
Modal.Window = Window;
export default Modal;

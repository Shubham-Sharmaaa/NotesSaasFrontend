import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";
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
  if (!windowName) {
    if (!isOpen || !setIsOpen) return null;
    return createPortal(
      <div className="fixed top-0 left-0 w-full h-screen backdrop-blur-2xl z-1000 transition-all ">
        <div className="bg-[#c0bbbb] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg py-[3.2rem] px-16 transition-all ">
          <button
            className="absolute top-0 left-0 p-2"
            onClick={() => setIsOpen(false)}
          >
            close
          </button>
          <div>
            {cloneElement(children, { oncloseModal: () => setIsOpen(false) })}
          </div>
        </div>
      </div>,
      document.body,
    );
  }
  if (!context) return null;
  const { name, close } = context;
  if (name !== windowName) return null;
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen backdrop-blur-2xl z-1000 transition-all ">
      <div className="bg-[#c0bbbb] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg py-[3.2rem] px-16 transition-all ">
        <button className="absolute top-0 left-0 p-2" onClick={close}>
          close
        </button>
        <div>{cloneElement(children, { oncloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}
Modal.Name = Name;
Modal.Window = Window;
export default Modal;

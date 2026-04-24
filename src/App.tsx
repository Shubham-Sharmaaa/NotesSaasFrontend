import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import AuthWrapper from "./pages/AuthWrapper";
import Signin from "./pages/Signin";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./pages/Dashboard";
import VerifyOtp from "./pages/OtpPage";
import React, {
  createContext,
  useEffect,
  useState,
  type Dispatch,
} from "react";
import MainWrapper from "./pages/MainWrapper";
import axios from "axios";
import EditNote from "./pages/EditNote";
import Refresher from "./components/Refresher";
import PublicPage from "./pages/PublicPage";
import FavoritesPage from "./pages/FavoritesPage";
import Trash from "./pages/Trash";
import ArchivePage from "./pages/ArchivePage";

import FolderDashboard from "./pages/FolderDashboard";
import FolderPage from "./pages/FolderPage";
const backend_url = import.meta.env.VITE_BACKEND_URL;
const NoteContext = createContext<noteContextType | undefined>(undefined);
type noteContextType = {
  notes: NoteType[];
  folders: FolderType[];
  setNotes: Dispatch<React.SetStateAction<NoteType[]>>;
  setFolders: Dispatch<React.SetStateAction<FolderType[]>>;
  setisAuth: Dispatch<React.SetStateAction<boolean | null>>;
  setquery: Dispatch<React.SetStateAction<string>>;
  query: string;
};

export type NoteType = {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  isPinned: boolean;
  isFavorite: boolean;
  isDeleted: boolean;
  deleteDate: string | null;
  isArchived: boolean;
};
export type FolderType = {
  _id: string;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  deletedDate: string;
  noteCount: number;
};
function GoogleAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId="890377910688-e8jngqqd7s71tvmddfvom3139podf7m0.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
}

function Authenticated({
  isAuth,
  notes,
  setNotes,
  setisAuth,
  setquery,
  query,
  folders,
  setFolders,
}: {
  isAuth: boolean | null;
  notes: NoteType[];
  folders: FolderType[];
  setNotes: Dispatch<React.SetStateAction<NoteType[]>>;
  setFolders: Dispatch<React.SetStateAction<FolderType[]>>;
  setisAuth: Dispatch<React.SetStateAction<boolean | null>>;
  setquery: Dispatch<React.SetStateAction<string>>;
  query: string;
}) {
  if (isAuth === null) return <div>Loading...</div>;
  return isAuth ? (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        setisAuth,
        setquery,
        query,
        folders,
        setFolders,
      }}
    >
      <Outlet />
    </NoteContext.Provider>
  ) : (
    <Navigate to={"/auth/signin"} />
  );
}

function PublicRoute({ isAuth }: { isAuth: boolean | null }) {
  if (isAuth === null) return <div>Loading...</div>;
  return isAuth ? <Navigate to={"/dashboard"} replace /> : <Outlet />;
}

function App() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [query, setquery] = useState<string>("");
  const [folder, setFolder] = useState<FolderType[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    async function fetchFolders() {
      const res = await axios.get(`${backend_url}/private/all-folders`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setFolder(res.data.folders);
    }
    async function fetchNotes() {
      const res = await axios.get(`${backend_url}/private/all-content`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setNotes(res.data.notes);
    }
    fetchNotes();
    fetchFolders();
  }, []);
  return (
    <BrowserRouter>
      <Refresher setAuth={setIsAuth} />
      <Routes>
        <Route element={<PublicRoute isAuth={isAuth} />}>
          <Route path="/auth" element={<AuthWrapper />}>
            <Route
              path="signin"
              element={
                <GoogleAuthWrapper>
                  <Signin />
                </GoogleAuthWrapper>
              }
            />
            <Route path="verify-otp" element={<VerifyOtp />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route
          element={
            <Authenticated
              setisAuth={setIsAuth}
              isAuth={isAuth}
              notes={notes}
              setNotes={setNotes}
              setquery={setquery}
              query={query}
              folders={folder}
              setFolders={setFolder}
            />
          }
        >
          <Route path="/edit-note/:id" element={<EditNote />} />
          <Route element={<MainWrapper />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/folders" element={<FolderDashboard />}></Route>
            <Route path="/folder/:folderId" element={<FolderPage />} />
          </Route>
        </Route>
        <Route path="/public/:hash" element={<PublicPage isAuth={isAuth} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
export { NoteContext };

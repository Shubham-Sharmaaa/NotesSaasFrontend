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
import { createContext, useEffect, useState, type Dispatch } from "react";
import MainWrapper from "./pages/MainWrapper";
import axios from "axios";
import EditNote from "./pages/EditNote";
const backend_url = import.meta.env.VITE_BACKEND_URL;

function GoogleAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId="890377910688-e8jngqqd7s71tvmddfvom3139podf7m0.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
}
const Refresher = ({ setAuth }: { setAuth: (value: boolean) => void }) => {
  useEffect(() => {
    async function test() {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const res = await axios.get(`${backend_url}/private/test`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          if (res.data) {
            setAuth(true);
          } else {
            setAuth(false);
          }
        } catch {
          setAuth(false);
        }
      } else {
        setAuth(false);
      }
    }
    test();
  }, [setAuth]);
  return null;
};

function Authenticated({
  isAuth,
  notes,
  setNotes,
}: {
  isAuth: boolean | null;
  notes: NoteType[];
  setNotes: Dispatch<React.SetStateAction<NoteType[]>>;
}) {
  if (isAuth === null) return <div>Loading...</div>;
  return isAuth ? (
    <NoteContext.Provider value={{ notes, setNotes }}>
      <Outlet />
    </NoteContext.Provider>
  ) : (
    <Navigate to={"/auth/signin"} />
  );
}

export type NoteType = {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
};
type noteContextType = {
  notes: NoteType[];
  setNotes: Dispatch<React.SetStateAction<NoteType[]>>;
};
function PublicRoute({ isAuth }: { isAuth: boolean | null }) {
  if (isAuth === null) return <div>Loading...</div>;
  return isAuth ? <Navigate to={"/dashboard"} replace /> : <Outlet />;
}
const NoteContext = createContext<noteContextType | undefined>(undefined);
function App() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    async function fetch() {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${backend_url}/private/all-content`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(res.data);
      setNotes(res.data.notes);
    }
    fetch();
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
            <Authenticated isAuth={isAuth} notes={notes} setNotes={setNotes} />
          }
        >
          <Route path="/edit-note" element={<EditNote />} />
          <Route element={<MainWrapper />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
export { NoteContext };

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainWrapper() {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 ">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

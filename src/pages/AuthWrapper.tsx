import { Outlet } from "react-router-dom";

import Review from "../UI/Review";

import { TiTickOutline } from "react-icons/ti";
import LOGO from "../UI/LOGO";

function AuthWrapper() {
  return (
    <div className="flex h-screen ">
      <div className="w-[50%] p-4 flex flex-col gap-10 bg-[#F0FCFF]">
        <LOGO />
        <section className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-[#16161E]">
            Your Thoughts,
            <br />
            <span className="text-[#1FD5F9]">Organized </span>effortlessly
          </h2>
          <p className="text-[#6D6E81] mb-6 font-semibold">
            Join 50,000+ users who organize use NotesFlow to capture their ideas
            and stay productive.
          </p>
          <ul className="text-[#547F89] font-semibold">
            <li className=" flex items-center gap-1 mb-2">
              <TiTickOutline className="text-[#1FD5F9]" />
              Bi-directional linking for complex Ideas
            </li>
            <li className=" flex items-center gap-1 mb-2">
              <TiTickOutline className="text-[#1FD5F9]" />
              Realtime collaboration with your team
            </li>
            <li className="flex items-center gap-1 mb-2">
              <TiTickOutline className="text-[#1FD5F9]" />
              End-to-end encrypted private vault
            </li>
          </ul>
        </section>
        <Review
          author="John Doe"
          content="NotesFlow changed my workflow completely. I never lose a single thought anymore!"
        />
      </div>
      <div className="w-[50%] p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthWrapper;

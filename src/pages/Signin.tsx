import { useGoogleLogin } from "@react-oauth/google";
import { api, googleAuth } from "../api";
import { useNavigate } from "react-router-dom";
import type React from "react";

export default function Signin() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function responseGoogle(authResult: any) {
    try {
      if (authResult["code"]) {
        const response = await googleAuth(authResult["code"]);

        localStorage.setItem("token", response.token);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log(error);
    }
  }
  const GoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formdata = new FormData(e.currentTarget);
      const data = {
        email: formdata.get("email"),
        password: formdata.get("password"),
      };
      const res = await api.post("/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = res.data;
      if (result.token) {
        localStorage.setItem("token", result.token);
        window.location.href = "/dashboard";
        return;
      }
      if (result.isotp) {
        const r = await api.post(
          "/send-otp",
          { email: data.email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const rd = r.data;

        if (rd.success) {
          navigate("/auth/verify-otp", {
            state: {
              email: data.email,
              password: data.password,
              username: formdata.get("username"),
            },
          });
          return;
        }
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }
  const button = " border py-2 px-6 rounded border-blue-300";
  const input = "bg-gray-300 rounded text-center p-2";
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center pt-4 gap-2 h-[80%] ">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-gray-500">
          Enter your credentials to access your notes.
        </p>
        <div className="flex gap-2 my-8">
          <button className={button} onClick={GoogleLogin}>
            Google
          </button>
        </div>
        <p className="text-sm text-[#6D6E81] my-2">Or CONTINUE WITH EMAIL</p>
        <div className="flex flex-col flex-1  items-center my-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              className={input}
              name="username"
              placeholder="Enter username"
            />
            <input className={input} name="email" placeholder="Enter email" />
            <input
              className={input}
              name="password"
              placeholder="Enter password"
            />
            <button className={`${button} bg-blue-500`}>Signin</button>
          </form>
        </div>
        <p className="text-xs text-[#6D6E81] text-center ">
          By continuing,you agree to NotesFlow's Terms of Service and Privacy
          Policy
        </p>
      </div>
    </div>
  );
}

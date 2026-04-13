/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
const backend_url = import.meta.env.VITE_BACKEND_URL;
export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const { username, email, password } = location.state;

  async function handleVerify(e: any) {
    e.preventDefault();

    const otp = e.target.otp.value;

    const res = await fetch(`${backend_url}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, otp }),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    }
  }

  return (
    <form onSubmit={handleVerify}>
      <input name="otp" placeholder="Enter OTP" />
      <button>Verify</button>
    </form>
  );
}

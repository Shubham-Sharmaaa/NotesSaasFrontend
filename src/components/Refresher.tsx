import axios from "axios";
import { useEffect } from "react";
const backend_url = import.meta.env.VITE_BACKEND_URL;
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
export default Refresher;

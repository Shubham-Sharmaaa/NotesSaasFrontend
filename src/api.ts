import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL;
export const api = axios.create({
  baseURL: `${backend_url}`,
});
export const googleAuth = async (code: string) => {
  try {
    const response = await api.get(`/auth/google?code=${code}`);
    return response.data;
  } catch (error) {
    console.error("Error during Google authentication:", error);
    throw error;
  }
};

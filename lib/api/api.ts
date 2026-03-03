import axios from "axios";

interface Credentials {
  name?: string;
  email: string;
  password: string;
}
export async function register(credentials: Credentials) {
  const { data } = await axios.post("/api/auth/register", credentials);

  return data;
}

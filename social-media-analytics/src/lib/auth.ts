import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  id: number;
  email: string;
  exp: number;
  is_admin?: boolean;
};

export function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: TokenPayload = jwtDecode(token);
    return decoded;
  } catch (e) {
    return null;
  }
}

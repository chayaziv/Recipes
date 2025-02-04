import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import {
  SignInPage,
  type AuthProvider,
  type AuthResponse,
} from "@toolpad/core/SignInPage";
import { login, register } from "../utils/api";
import { AuthContext, emptyUser } from "../reducer/userReducer";
import ApiError from "./ApiError";

const providers = [
  { id: "google", name: "Google" },
  { id: "facebook", name: "Facebook" },
  { id: "credentials", name: "Email and Password" },
];

const Login = ({ isSignIn }: { isSignIn: boolean }) => {
  const { userDispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (email: string, password: string) => {
    if (isSignIn) {
      const res = await login(email, password);
      if (res.ok && res.data) {
        userDispatch({ type: "SET_USER", user: res.data.user || emptyUser });
        navigate("/");
      } else {
        setError(res.error || "");
      }
    } else {
      const res = await register(email, password);
      if (res.ok && res.data) {
        userDispatch({
          type: "ADD_USER",
          user: { id: res.data.userId, email, password },
        });
        navigate("/");
      } else {
        setError(res.error || "");
      }
    }
  };

  const signIn = async (provider: AuthProvider, formData: FormData) => {
    return new Promise<AuthResponse>((resolve) => {
      setTimeout(() => {
        if (provider.id === "credentials") {
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;
          handleSubmit(email, password);
          resolve({});
        } else {
          resolve({ error: "This is not available now" });
        }
      }, 500);
    });
  };

  return (
    <>
      {error && <ApiError message={error} />}
      <SignInPage signIn={signIn} providers={providers} />
    </>
  );
};

export default Login;

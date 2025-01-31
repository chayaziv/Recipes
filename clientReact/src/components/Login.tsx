import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import {
  SignInPage,
  type AuthProvider,
  type AuthResponse,
} from "@toolpad/core/SignInPage";
import useApi from "../api/api";
import { AuthContext } from "../reducer/userReducer";
import ApiError from "./ApiError";

const providers = [
  { id: "google", name: "Google" },
  { id: "facebook", name: "Facebook" },
  { id: "credentials", name: "Email and Password" },
];

const Login = ({ isSignIn }: { isSignIn: boolean }) => {
  const { userDispatch } = useContext(AuthContext);
  const { login, register } = useApi();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (email: string, password: string) => {
    try {
      const res = isSignIn
        ? await login(email, password)
        : await register(email, password);
      if (res?.ok) {
        userDispatch({
          type: isSignIn ? "SET_USER" : "ADD_USER",
          user: isSignIn
            ? res.data.user
            : { id: res.data.userId, email, password },
        });
        navigate("/");
      } else {
        if (
          res?.status == 400 ||
          res?.status == 401 ||
          res?.status == 403 ||
          res?.status == 404
        )
          setError(res?.data);
      }
    } catch (e) {
      setError("An unexpected error occurred.");
    }
  };

  const signIn = async (provider: AuthProvider, formData: FormData) => {
    return new Promise<AuthResponse>((resolve) => {
      setTimeout(() => {
        console.log(
          `Signing in with "${provider.name}" and credentials: ${formData?.get("email")}, ${formData?.get("password")}`
        );
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

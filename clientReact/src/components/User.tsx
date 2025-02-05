
import { Button } from "@mui/material";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../reducer/userReducer";
import UserProfile from "./UserProfile";

const User = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      {!auth.isLogin && (
        <Button component={Link} to="/signIn" color="inherit">
          sign in
        </Button>
      )}
      {!auth.isLogin && (
        <Button component={Link} to="/signUp" color="inherit">
          sign up
        </Button>
      )}

      {auth.isLogin && <UserProfile />}
    </>
  );
};
export default User;

import Avatar from "./MyAvatar";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../reducer/userReducer";
import Logout from "./Logout";
import UserProfile from "./UserProfile";

const User = () => {
  const { auth, userDispatch } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

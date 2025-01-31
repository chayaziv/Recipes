import { Button } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../reducer/userReducer";

const Navbar = () => {
  return (
    <>
      <Button component={Link} to="/home" color="inherit">
        Home
      </Button>

      <Button component={Link} to="/about" color="inherit">
        About
      </Button>

      <Button component={Link} to="/recepies" color="inherit">
        recepies
      </Button>
    </>
  );
};

export default Navbar;

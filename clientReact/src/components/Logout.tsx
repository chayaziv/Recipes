import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../reducer/userReducer";

const Logout = () => {
  const navigate = useNavigate();
  const { auth, userDispatch } = useContext(AuthContext);
  return (
    <>
      <Button
        color="inherit"
        onClick={() => {
          userDispatch({
            type: "DELETE_USER",
            id: auth.user.id,
          });
          navigate("/");
        }}
      >
        Logout
      </Button>
    </>
  );
};
export default Logout;

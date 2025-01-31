import { Outlet } from "react-router";
import { AppBar, Box, Toolbar} from "@mui/material";
import User from "./User";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <User />
            </Box>
            <Box>
              <Navbar />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </>
  );
};

export default AppLayout;

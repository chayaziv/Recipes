import { Outlet } from "react-router";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import User from "./User";
import Navbar from "./Navbar";
import logo from "../../public/icon.svg"; 

const AppLayout = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
              <Navbar />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}> 
              <img src={logo} alt="Logo" width={70} height={70} />
              <Typography variant="h6" component="div" sx={{ fontWeight: "bold",fontSize: "2.5rem" }}>
                RECIPES
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <User />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};

export default AppLayout;
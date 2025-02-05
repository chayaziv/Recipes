import { useContext, useState } from "react";
import { AuthContext } from "../reducer/userReducer";
import {
  Box,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Divider,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MyAvatar from "./MyAvatar";


import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { auth, userDispatch } = useContext(AuthContext);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (!auth.isLogin) {
    return null;
  }

  return (
    <>
     
      <Box>
        <Tooltip title="Open profile">
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <MyAvatar size={50} firstName={auth.user.firstName} />
          </IconButton>
        </Tooltip>
      </Box>

    
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            width: 320,
            boxShadow: 4,
            borderRadius: "12px",
            backgroundColor: "#f5f5f5", 
            overflow: "hidden",
          },
        }}
      >
      
        <Box
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#f5f5f5", 
            borderRadius: "12px 12px 0 0",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            {auth.user.email}
          </Typography>
          <MyAvatar size={80} margin={3} firstName={auth.user.firstName} />
          <Typography variant="h5" fontWeight="bold">
            {auth.user.firstName}
          </Typography>
        </Box>

        <Divider />

       
        <MenuItem
          component={Link}
          to="/edit"
          onClick={handleMenuClose}
          sx={{
            px: 3,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: "16px",
            fontWeight: "bold",
            color: "text.primary",
          }}
        >
          <EditIcon />
          Edit Details
        </MenuItem>

        <Divider />

       
        <MenuItem
          onClick={() => {
            userDispatch({
              type: "DELETE_USER",
              id: auth.user.id,
            });
            navigate("/");
          }}
          sx={{
            px: 3,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: "16px",
            fontWeight: "bold",
            color: "error.main",
            "&:hover": { color: "error.dark" },
          }}
        >
          <ExitToAppIcon />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserProfile;

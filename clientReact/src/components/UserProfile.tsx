import { useContext, useState } from "react";
import { AuthContext } from "../reducer/userReducer";
import {
  Box,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import MyAvatar from "./MyAvatar";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const UserProfile = () => {
  const { auth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
      {/* Profile Avatar (No Dropdown Arrow) */}
      <Box>
        <Tooltip title="Open profile">
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <MyAvatar size={50} firstName={auth.user.firstName} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Profile Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            width: 320,
            boxShadow: 4,
            borderRadius: "12px",
            backgroundColor: "#f5f5f5", // Light gray background
            overflow: "hidden",
          },
        }}
      >
        {/* Profile Header */}
        <Box
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#f5f5f5", // Light gray background
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

        {/* Edit Profile Button (No Background Color) */}
        <MenuItem onClick={handleMenuClose} sx={{ px: 3, py: 1.5 }}>
          <Button
            fullWidth
            component={Link}
            to="/edit"
            startIcon={<EditIcon />}
            sx={{
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",
              color: "text.primary", // No color background, just text
            }}
          >
            Edit Details
          </Button>
        </MenuItem>

        <Divider />

        {/* Logout Button */}
        <MenuItem onClick={handleMenuClose} sx={{ px: 3, py: 1.5 }}>
          <Button
            fullWidth
            startIcon={<ExitToAppIcon />}
            sx={{
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",
              color: "error.main", // Red text for logout
              "&:hover": { color: "error.dark" },
            }}
          >
            <Logout />
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserProfile;

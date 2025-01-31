import { Snackbar, Alert, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApiError = ({ message}: { message: string; }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <Box>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => {
          console.log("close");

          setOpen(false);
          
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          severity="error"
          sx={{
            fontSize: "1.5rem", // מגדיל את גודל הטקסט
            padding: "20px", // מוסיף ריווח פנימי
            width: "100%", // מרחיב לכל הרוחב
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default ApiError;

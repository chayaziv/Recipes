import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 50 }} />
        <Typography variant="h4" color="error">
          404 - Page Not Found
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ mt: 2 }}>
        The page you are looking for does not exist. Check the URL or return to the homepage.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => navigate("/")}
      >
        Return to Homepage
      </Button>
    </Container>
  );
};

export default ErrorPage;

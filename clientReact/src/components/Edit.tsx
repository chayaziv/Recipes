import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../reducer/userReducer";
import { useNavigate } from "react-router-dom";
import useApi from "../api/api";
import ApiError from "./ApiError";
import MyTextField from "../components/MyTextField";

// אייקונים
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const Edit = () => {
  const { auth, userDispatch } = useContext(AuthContext);
  const [user, setUser] = useState(auth.user);
  const navigate = useNavigate();
  const { editUser } = useApi();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setUser(auth.user);
  }, [auth.user]);

  if (!auth.isLogin) return null;

  const update = async () => {
    try {
      const res = await editUser("" + auth.user.id, { ...user });

      if (res?.ok) {
        userDispatch({ type: "UPDATE_USER", user: res?.data });
        navigate("/"); // חזרה לדף הראשי לאחר שמירה
      } else if (
        res?.status == 400 ||
        res?.status == 401 ||
        res?.status == 403 ||
        res?.status == 404
      ) {
        setError("An unexpected error occurred.");
      }
    } catch {
      setError("");
    }
  };

  const fields = [
    { label: "First Name", key: "firstName", icon: <PersonIcon /> },
    { label: "Last Name", key: "lastName", icon: <PersonIcon /> },
    { label: "Email", key: "email", type: "email", icon: <EmailIcon /> },
    { label: "Address", key: "address", icon: <HomeIcon /> },
    { label: "Phone", key: "phone", type: "tel", icon: <PhoneIcon /> },
  ];

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
      }}
    >
      {error && <ApiError message={error} />}
      <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            sx={{ mb: 2 }}
          >
            Edit Profile
          </Typography>
          <FormControl fullWidth>
            {fields.map(({ label, key, type, icon }) => (
              <MyTextField
                key={key}
                label={label}
                type={type}
                value={user[key as keyof typeof user] as string}
                onChange={(e) => setUser({ ...user, [key]: e.target.value })}
                icon={icon}
              />
            ))}

            {/* כפתורים */}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                onClick={update}
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                sx={{ flex: 1, mr: 1 }}
              >
                Save Changes
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outlined"
                color="secondary"
                startIcon={<CancelIcon />}
                sx={{ flex: 1, ml: 1 }}
              >
                Cancel
              </Button>
            </Box>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Edit;

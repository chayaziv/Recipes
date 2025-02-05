import { TextField, InputAdornment, TextFieldProps } from "@mui/material";
import { ReactNode } from "react";

type MyTextFieldProps = TextFieldProps & {
  icon?: ReactNode; 
};

const MyTextField = ({ icon, ...props }: MyTextFieldProps) => (
  <TextField
    {...props}
    fullWidth
    margin="normal"
    InputProps={{
      startAdornment: icon ? (
        <InputAdornment position="start">{icon}</InputAdornment>
      ) : undefined,
      ...props.InputProps, 
    }}
  />
);

export default MyTextField;

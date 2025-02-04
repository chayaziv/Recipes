import { Box, Avatar } from "@mui/material";

const stringToColor = (string: string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = Math.imul(31, hash) + string.charCodeAt(i);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

interface Props {
  firstName: string;
  onClick?: () => void;
  size?: number;
  margin?: number;
}

const MyAvatar = ({ firstName, onClick, size = 40, margin = 0 }: Props) => {
  const firstLetter = firstName?.charAt(0).toUpperCase();

  return (
    <Box>
      <Avatar
        onClick={onClick}
        sx={{
          bgcolor: stringToColor(firstName || ""),
          width: size,
          height: size,
          margin: margin,
        }}
      >
        {firstLetter}
      </Avatar>
    </Box>
  );
};

export default MyAvatar;

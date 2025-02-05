import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import MyAvatar from "../components/MyAvatar";

interface RecipeAuthorProps {
  authorName: string | null;
  isAuthor: boolean;
}

const RecipeAuthor: React.FC<RecipeAuthorProps> = ({
  authorName,
  isAuthor,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      mb={2}
      borderRadius={2}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <MyAvatar firstName={authorName || "?"} size={50} />
        <Typography variant="h6" fontWeight="bold">
          {authorName}
        </Typography>
      </Box>

      {isAuthor && (
        <IconButton component={Link} to="edit" color="primary" size="large">
          <EditOutlined />
        </IconButton>
      )}
    </Box>
  );
};

export default RecipeAuthor;

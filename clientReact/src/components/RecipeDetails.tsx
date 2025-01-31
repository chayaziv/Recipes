import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Paper, Divider } from "@mui/material";
import { Description, Kitchen, MenuBook } from "@mui/icons-material";

interface RecipeDetailsProps {
  description: string;
  ingredients: string[];
  instructions: string;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ description, ingredients, instructions }) => {
  return (
    <Box>
      {/* תיאור המתכון */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: "grey.100", borderRadius: 2 }}>
        <Typography variant="h5" display="flex" alignItems="center" gutterBottom>
          <Description sx={{ mr: 1, color: "text.secondary" }} />
          Description:
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* רשימת מרכיבים */}
      <Typography variant="h5" display="flex" alignItems="center" gutterBottom>
        <Kitchen sx={{ mr: 1, color: "primary.main" }} /> Ingredients
      </Typography>
      <List>
        {ingredients.map((ingredient, index) => (
          <ListItem key={index} sx={{ pl: 2 }}>
            <ListItemIcon>
              <Kitchen color="action" />
            </ListItemIcon>
            <ListItemText primary={ingredient} primaryTypographyProps={{ variant: "h6" }} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 3 }} />

      {/* הוראות הכנה */}
      <Typography variant="h5" display="flex" alignItems="center" gutterBottom>
        <MenuBook sx={{ mr: 1, color: "primary.main" }} /> Instructions
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: "pre-line", fontSize: "1.1rem", lineHeight: 1.6 }}>
        {instructions}
      </Typography>
    </Box>
  );
};

export default RecipeDetails;

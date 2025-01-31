import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreType } from "../store/store";
import useApi from "../api/api";
import RecipeAuthor from "./RecipeAuthor";
import RecipeDetails from "./RecipeDetails";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { AuthContext } from "../reducer/userReducer";
import ApiError from "./ApiError";

const Recipe = () => {
  const { id } = useParams<{ id: string }>();
  const { getAuthorNameByRecipeId } = useApi();
  const { auth } = useContext(AuthContext);

  const [authorName, setAuthorName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recipe = useSelector((store: StoreType) =>
    store.recipes.list.find((r) => r.id.toString() === id)
  );

  useEffect(() => {
    if (recipe) {
      getAuthorNameByRecipeId(recipe.id.toString())
        .then((response) => {
          if (response?.ok)
            setAuthorName(response?.data.authorName || "Unknown");
          else setError("Failed to fetch author name");
        })
        .catch(() => {
          setError("Failed to fetch author name");
        });
    }
  }, [recipe, getAuthorNameByRecipeId]);

  if (!recipe) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        {error && <ApiError message={error}></ApiError>}
        <Typography variant="h6" color="error">
          Recipe not found!
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card
        sx={{
          maxWidth: 700,
          width: "100%",
          boxShadow: 4,
          borderRadius: 3,
          p: 2,
        }}
      >
        {/* מחבר המתכון */}
        <RecipeAuthor
          authorName={authorName}
          isAuthor={auth.user.id == recipe.authorId}
        />

        <CardContent>
          {/* כותרת המתכון */}
          <Typography variant="h4" align="center" fontWeight="bold" mb={2}>
            {recipe.title}
          </Typography>

          {/* פרטי המתכון */}
          <RecipeDetails
            description={recipe.description}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Recipe;

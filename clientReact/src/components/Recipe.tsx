import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreType } from "../store/store";
import { getAuthorNameByRecipeId } from "../utils/api";
import RecipeAuthor from "./RecipeAuthor";
import RecipeDetails from "./RecipeDetails";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { AuthContext } from "../reducer/userReducer";
import ApiError from "./ApiError";

const Recipe = () => {
  const { id } = useParams<{ id: string }>();
  const { auth } = useContext(AuthContext);

  const [authorName, setAuthorName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recipe = useSelector((store: StoreType) =>
    store.recipes.list.find((r) => r.id.toString() === id)
  );

  useEffect(() => {
    const fetchAuthorName = async () => {
      if (!recipe) return;
      const res = await getAuthorNameByRecipeId(recipe.id.toString());
      if (res?.ok) {
        setAuthorName(res?.data?.authorName || "Unknown");
      } else {
        setError("Failed to fetch author name");
      }
    };
    fetchAuthorName();
  }, [recipe, getAuthorNameByRecipeId]);

  if (!recipe) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          Recipe not found!
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {error && <ApiError message={error}></ApiError>}
      <Box display="flex" justifyContent="center" mt={4}>
        <Card
          sx={{
            maxWidth: 'sm',
            width: "100%",
            maxHeight: "80vh",
            overflowY: "auto",
            boxShadow: 4,
            borderRadius: 3,
            p: 2,
          }}
      
        >
          <RecipeAuthor
            authorName={authorName || "Unknown"}
            isAuthor={auth.user.id == recipe.authorId}
          />

          <CardContent sx={{ maxHeight: "60vh" }}>
            <Typography variant="h4" align="center" fontWeight="bold" mb={2}>
              {recipe.title}
            </Typography>

            <RecipeDetails
              description={recipe.description}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Recipe;

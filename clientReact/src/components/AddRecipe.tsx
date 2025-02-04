import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addRecipe } from "../store/recipesSlice";
import RecipeForm from "./RecipeForm";
import { emptyRecipeType, RecipeType } from "../types/recipe";
import { useContext } from "react";
import { AuthContext } from "../reducer/userReducer";
import * as yup from "yup";
import schema from "../fromSchemas/schemas";

type RecipeData = yup.InferType<typeof schema>;
const AddRecipe = () => {
  const { auth } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddRecipe = (data: RecipeData) => {
    const newRecipe: RecipeType = {
      ...emptyRecipeType,
      title: data.title,
      description: data.description,
      instructions: data.instructions,
      ingredients: data.ingredients
        .split(",") // מחלק את המחרוזת למערך
        .map((item: string) => item.trim()) // מסיר רווחים מכל מרכיב
        .filter((item: string) => item !== ""), // מסנן איברים ריקים
    };
    dispatch(addRecipe({ recipe: newRecipe, userId: "" + auth.user.id }));
  };
  return <RecipeForm formTitle="Add New Recipe" onSubmit={handleAddRecipe} />;
};

export default AddRecipe;

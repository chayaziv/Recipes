import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StoreType, AppDispatch } from "../store/store";
import { updateRecipe } from "../store/recipesSlice";
import RecipeForm from "./RecipeForm";
import { emptyRecipeType, RecipeType } from "../types/recipe";
import { useContext } from "react";
import * as yup from "yup";
import schema from "../fromSchemas/schemas";
import { AuthContext } from "../reducer/userReducer";

type RecipeData = yup.InferType<typeof schema>;

const EditRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useContext(AuthContext);


  const recipe =
    useSelector((store: StoreType) =>
      store.recipes.list.find((r) => r.id.toString() === id)
    ) || emptyRecipeType;

  if (!recipe.id) {
    return <div>Recipe not found!</div>;
  }

  const handleEditRecipe = (data: RecipeData) => {
    const updatedRecipe: RecipeType = {
      ...recipe,
      title: data.title,
      description: data.description,
      instructions: data.instructions,
      ingredients: data.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };

    dispatch(
      updateRecipe({ recipe: updatedRecipe, userId: "" + auth.user.id })
    );

  };

  return (
    <RecipeForm
      formTitle="Edit Recipe"
      recipe={recipe}
      onSubmit={handleEditRecipe}
    />
  );
};

export default EditRecipe;

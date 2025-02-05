import {  useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { RecipeType, emptyRecipeType } from "../types/recipe";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import schema from "../fromSchemas/schemas";
import MyTextField from "../components/MyTextField";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

type RecipeData = yup.InferType<typeof schema>;

interface RecipeFormProps {
  recipe?: RecipeType;
  formTitle: string;
  onSubmit: (data: RecipeData) => void;
}

const RecipeForm = ({
  recipe = emptyRecipeType,
  formTitle,
  onSubmit,
}: RecipeFormProps) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RecipeData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: recipe.title,
      description: recipe.description,
      instructions: recipe.instructions,
      ingredients: recipe.ingredients.join(", "),
    },
  });

  useEffect(() => {
    setValue("title", recipe.title);
    setValue("description", recipe.description);
    setValue("instructions", recipe.instructions);
    setValue("ingredients", recipe.ingredients.join(", "));
  }, [recipe, setValue]);

  const fields = [
    { label: "Title", key: "title", icon: <TitleIcon /> },
    { label: "Description", key: "description", icon: <DescriptionIcon /> },
    {
      label: "Ingredients (comma separated)",
      key: "ingredients",
      icon: <RestaurantMenuIcon />,
    },
    {
      label: "Instructions",
      key: "instructions",
      icon: <MenuBookIcon />,
      multiline: true,
      rows: 4,
    },
  ];

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          {formTitle}
        </Typography>

        {fields.map(({ label, key, icon, ...props }) => (
          <MyTextField
            key={key}
            label={label}
            {...register(key as keyof RecipeData)}
            error={!!errors[key as keyof RecipeData]}
            helperText={errors[key as keyof RecipeData]?.message}
            icon={icon}
            {...props}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          startIcon={recipe.id ? <EditIcon /> : <SaveIcon />}
        >
          {recipe.id ? "Update Recipe" : "Add Recipe"}
        </Button>
      </Box>
    </Container>
  );
};

export default RecipeForm;

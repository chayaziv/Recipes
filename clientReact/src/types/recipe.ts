export type RecipeType = {
  id: number;
  title: string;
  description: string;
  authorId: number;
  ingredients: string[];
  instructions: string;
};

export const emptyRecipeType: RecipeType = {
  id: 0,
  title: "",
  description: "",
  authorId: 0,
  ingredients: [],
  instructions: "",
};

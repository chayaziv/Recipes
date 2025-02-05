import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RecipeType } from "../types/recipe";

export const fetchData = createAsyncThunk(
  "recipes/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/api/recipes");
      return response.data as RecipeType[];
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addRecipe = createAsyncThunk(
  "recipes/add",

  async (
    { recipe, userId }: { recipe: RecipeType; userId: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/recipes",
        {
          ...recipe,
        },
        { headers: { "user-id": userId } }
      );

      return response.data.recipe;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const updateRecipe = createAsyncThunk(
  "recipes/update",
  async (
    { recipe, userId }: { recipe: RecipeType; userId: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/recipes/${recipe.id}`,
        recipe,
        {
          headers: { "user-id": userId },
        }
      );
      return response.data.recipe;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState: { list: [] as RecipeType[], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchData.fulfilled,
        (
          state: { list: RecipeType[]; loading: boolean },
          action: { payload: RecipeType[] }
        ) => {
          state.loading = false;
          const all = [...action.payload, ...state.list];
          const uniqueRecipes = all.filter(
            (recipe, index, self) =>
              index === self.findIndex((r) => r.id === recipe.id)
          );
          state.list = [...uniqueRecipes];
        }
      )
      .addCase(
        fetchData.rejected,
        (state: { list: RecipeType[]; loading: boolean }) => {
          console.log("failed");
          alert("Failed to load recipes");
        }
      )
      .addCase(
        addRecipe.fulfilled,
        (
          state: { list: RecipeType[]; loading: boolean },
          action: { payload: RecipeType }
        ) => {
          state.loading = false;
          state.list = [...state.list, { ...action.payload }];
        }
      )
      .addCase(
        addRecipe.rejected,
        (state: { list: RecipeType[]; loading: boolean }) => {
          console.log("failed");
          alert("Failed to add recipe");
        }
      )
      .addCase(updateRecipe.fulfilled, (state, action) => {
        console.log("Recipe updated successfully");
        state.loading = false;
        state.list = state.list.map((recipe) =>
          recipe.id === action.payload.id ? action.payload : recipe
        );
      })
      .addCase(updateRecipe.rejected, (state) => {
        console.log("Update failed");
        alert("Failed to update recipe");
      });
  },
});
export default recipesSlice;

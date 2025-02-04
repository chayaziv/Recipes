import { createBrowserRouter } from "react-router";
import { Home } from "./components/Home";
import About from "./components/About";
import AppLayout from "./components/AppLayout";

import Edit from "./components/Edit";
import RecipesList from "./components/RecipesList";

import AddRecipe from "./components/AddRecipe";
import Login from "./components/Login";
import EditRecipe from "./components/EditRecipe";
import Recipe from "./components/Recipe";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "edit", element: <Edit /> },
      { path: "signIn", element: <Login isSignIn={true} /> },
      { path: "signUp", element: <Login isSignIn={false} /> },
      {
        path: "recepies",
        element: <RecipesList />,
        children: [
          { path: ":id", element: <Recipe /> },
          { path: "new", element: <AddRecipe /> },
          { path: ":id/edit", element: <EditRecipe /> },
        ],
      },
    ],
  },
]);

import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreType } from "../store/store";
import { fetchData } from "../store/recipesSlice";
import { AuthContext } from "../reducer/userReducer";
import { Link, Outlet } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import RecipeSearch from "./RecipeSearch";

const RecipesList = () => {
  const { list: recipesList } = useSelector(
    (store: StoreType) => store.recipes
  );
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const filteredRecipes = recipesList.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid container spacing={2} sx={{ height: "100vh", p: 2 }}>
      <Grid
        item
        xs={3}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Paper
          elevation={3}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "primary.main",
              color: "white",
              p: 2,
              borderRadius: 1,
            }}
          >
            <Typography variant="h6">Recipe List</Typography>
            {auth.isLogin && (
              <IconButton
                component={Link}
                to="/recepies/new"
                color="inherit"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  "&:hover": { bgcolor: "grey.200" },
                }}
              >
                <AddIcon />
              </IconButton>
            )}
          </Box>

          <RecipeSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <Divider sx={{ my: 2 }} />

          <List
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              px: 2,
              maxHeight: "100%",
              minHeight: 0,
            }}
          >
            {filteredRecipes.map((r) => (
              <ListItem key={r.id} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  to={`/recepies/${r.id}`}
                  sx={{
                    borderRadius: 2,
                    bgcolor: "grey.100",
                    "&:hover": { bgcolor: "grey.200" },
                    py: 1.5,
                    px: 2,
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    primary={r.title}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      <Grid item xs={9}>
        <Box sx={{ p: 3, height: "100%", overflowY: "auto" }}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

export default RecipesList;

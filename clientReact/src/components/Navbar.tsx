import { Button, Stack, Divider } from "@mui/material";
import { Home, Info, RestaurantMenu } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button component={Link} to="/home" color="inherit" startIcon={<Home />}>
        Home
      </Button>
      <Divider orientation="vertical" flexItem />
      <Button component={Link} to="/about" color="inherit" startIcon={<Info />}>
        About
      </Button>
      <Divider orientation="vertical" flexItem />
      <Button
        component={Link}
        to="/recepies"
        color="inherit"
        startIcon={<RestaurantMenu />}
      >
        Recipes
      </Button>
    </Stack>
  );
};

export default Navbar;

import { Container, Typography, Box, Paper } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={6} sx={{ p: 6, textAlign: "center", border: "3px solidrgb(0, 0, 0)", borderRadius: "12px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Our Recipes Website
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to RECIPES, your go-to destination for discovering and sharing delicious recipes from around the world.
          Whether you are a professional chef or a home cook, our platform offers a wide variety of recipes to suit every taste and occasion.
        </Typography>
        <Typography variant="body1" paragraph>
          Explore new flavors, learn cooking techniques, and connect with a passionate community of food lovers. Our mission is to make cooking enjoyable,
          easy, and accessible to everyone.
        </Typography>
        <Typography variant="body1" paragraph>
          Join us in celebrating the joy of cooking, and let’s create something amazing together!
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;

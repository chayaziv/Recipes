import { Card, CardContent, Typography, Grid, Container, Box, Link } from "@mui/material";
import { Star, Favorite, CheckCircle } from "@mui/icons-material";

const Home = () => {
  const cards = [
    { text: "Welcome to the best recipe site!", icon: <Star style={{ color: "#FFD700", fontSize: 40 }} /> },
    { text: "Thousands of recipes available for every meal!", icon: <Favorite style={{ color: "#E91E63", fontSize: 40 }} /> },
    { text: "Real reviews and recommendations on every recipe!", icon: <CheckCircle style={{ color: "#4CAF50", fontSize: 40 }} /> },
    { text: "Join us and start cooking like a chef!", icon: <Star style={{ color: "#FFD700", fontSize: 40 }} /> },
    { text: "Various categories for all kinds of meals!", icon: <Favorite style={{ color: "#E91E63", fontSize: 40 }} /> },
    { text: "Always find the right recipe at the right time!", icon: <CheckCircle style={{ color: "#4CAF50", fontSize: 40 }} /> },
  ];

  return (
    <Container maxWidth="lg" style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px" }}>
     
      <Typography variant="h2" component="h1" gutterBottom style={{ marginTop: "40px", fontWeight: "bold", color: "#333" }}>
        Delicious Recipes
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        The perfect place for cooking enthusiasts
      </Typography>

   
      <Grid container spacing={3} style={{ marginTop: "48px", maxWidth: "1200px" }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={5} style={{ backgroundColor: "#fff", textAlign: "center", padding: "20px", borderRadius: "12px" }}>
              <CardContent>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                  {card.icon}
                </div>
                <Typography variant="h6" style={{ color: "#333", fontWeight: "bold" }}>{card.text}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    
    </Container>
  );
};

export { Home };

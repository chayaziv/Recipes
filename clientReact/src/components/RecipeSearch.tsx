import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@mui/material";

interface RecipeSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const RecipeSearch: React.FC<RecipeSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ bgcolor: "white", borderRadius: 1 }}
      />
    </Box>
  );
};

export default RecipeSearch;

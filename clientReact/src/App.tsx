import { createTheme, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router";
import { router } from "./Router";
import userReducer, { AuthContext, initialState } from "./reducer/userReducer";
import { useReducer } from "react";
import store from "./store/store";
import { Provider } from "react-redux";
import ApiError from "./components/ApiError";
import useApiRequest from "./hooks/useApiRequest";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(37, 169, 103)",
    },
    text: {
      primary: "rgb(21, 80, 1)",
      secondary: "rgb(21, 80, 1)",
    },
  },
});

function App() {
  const [auth, userDispatch] = useReducer(userReducer, initialState);
  const { openError, error } = useApiRequest();
  console.log(openError, error);

  return (
    <>
      <AuthContext value={{ auth, userDispatch }}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </Provider>
      </AuthContext>

      {/* <ApiError error={error} open={openError} /> */}
    </>
  );
}
export default App;

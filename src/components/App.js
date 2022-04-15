import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import { AuthProvider } from "../contexts/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import Initialize from "./Initialize";
import Profile from "./Profile";

import { createTheme, ThemeProvider } from "@mui/material/styles";

let myTheme = createTheme({
  palette: {
    itemSelected: {
      main: "#D0E9FF",
    },
    itemSelectedHover: {
      main: "#B2DEFF",
    },
  },
});

myTheme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: myTheme.palette.itemSelected.main,
          },
          "&.Mui-selected:hover": {
            backgroundColor: myTheme.palette.itemSelectedHover.main,
          },
        },
      },
    },
  },
});

function App() {
  function RequireAuth({ children, redirectTo }) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to={redirectTo} />;
  }

  return (
    <ThemeProvider theme={myTheme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              exact
              path="/*"
              element={
                <RequireAuth redirectTo="/signin">
                  <Initialize />
                </RequireAuth>
              }
            />
            <Route path="/signup/*" element={<SignUp />} />
            <Route path="/signin/*" element={<SignIn />} />
            <Route path="/forgot-password/*" element={<ForgotPassword />} />
            <Route
              path="/profile/*"
              element={
                <RequireAuth redirectTo="/signin">
                  <Profile />
                </RequireAuth>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

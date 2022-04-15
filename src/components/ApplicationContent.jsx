import React from "react";
import Box from "@mui/material/Box";
import { Toolbar, Container } from "@mui/material";
import Movies from "./Movies";
import Movie from "./Movie";
import Actor from "./Actor";
import Copyright from "./Copyright";
import Error from "./Error";

import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function ApplicationContent() {
  function RequireAuth({ children, redirectTo }) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to={redirectTo} />;
  }

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="xl" sx={{ mt: 1, mb: 1 }}>
        <Routes>
          <Route
            exact
            path="/*"
            element={
              <Error
                text1="404. That’s an error."
                text2="The requested URL was not found on our server. That’s all we know."
              />
            }
          />
          <Route exact path="/" element={<Movies />} />
          <Route
            exact
            path="/movie/:movieId"
            element={
              <RequireAuth redirectTo="/signin">
                <Movie />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/actor/:actorId"
            element={
              <RequireAuth redirectTo="/signin">
                <Actor />
              </RequireAuth>
            }
          />
        </Routes>
      </Container>
      <Copyright sx={{ mt: 5, mb: 2 }} />
    </Box>
  );
}

export default ApplicationContent;

import React, { Fragment } from "react";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MovieListItem from "./MovieListItem";
import { Stack, Pagination, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../reducers/pageSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MoviesList({ movies, pagination = true }) {
  const pageNumber = useSelector((state) => state.page.value);
  const maxPages = useSelector((state) => state.maxPages.value);
  const dispatch = useDispatch();

  const handlePrev = () => {
    if (pageNumber !== 1) dispatch(decrement());
  };

  const handleNext = () => {
    if (pageNumber !== maxPages) dispatch(increment());
  };

  return (
    <Fragment>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ pt: 2 }}
      >
        {movies.map((movie) => {
          return (
            <Grid key={movie.id} item xs={12} sm={6} md={4} lg={2}>
              <Link
                to={"/movie/" + movie.id}
                style={{ textDecoration: "none" }}
              >
                <Item
                  sx={{
                    p: 0,
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  }}
                >
                  <MovieListItem movie={movie} />
                </Item>
              </Link>
            </Grid>
          );
        })}
      </Grid>

      {pagination && (
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 4, justifyContent: "center" }}
        >
          <Button
            variant="contained"
            sx={{ pt: 1 }}
            onClick={() => {
              handlePrev();
            }}
          >
            Prev
          </Button>
          <Typography variant="h6" sx={{ pt: 0.5 }}>
            {pageNumber}
          </Typography>
          <Button
            variant="contained"
            sx={{ pt: 1 }}
            onClick={() => {
              handleNext();
            }}
          >
            Next
          </Button>
        </Stack>
      )}
    </Fragment>
  );
}

export default MoviesList;

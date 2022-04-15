import React, { Fragment } from "react";
import Grid from "@mui/material/Grid";
import CoverMovie from "./CoverMovie";
import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Error from "./Error";

function Movies() {
  const movies = useSelector((state) => state.movies.value);
  const empty = movies.length === 0;

  return (
    <Fragment>
      {empty ? (
        <Error text1="No movies found." text2="Try different keywords." />
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Link
              to={"/movie/" + movies[0].id}
              style={{ textDecoration: "none" }}
            >
              <CoverMovie movie={movies[0]} />
            </Link>
          </Grid>
          <Grid item xs={12}>
            <MoviesList
              movies={movies.length === 20 ? movies.slice(2) : movies.slice(1)}
            />
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
}

export default Movies;

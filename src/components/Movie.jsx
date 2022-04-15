import { CardContent, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, Fragment } from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import MoviesList from "./MoviesList";
import { useParams, Link } from "react-router-dom";

function Movie() {
  const [movie, setMovie] = useState({});
  const [crew, setCrew] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=7a8e881cc6d01675969a3d2a52897837`,
      { signal: signal }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        const casts = myJson.cast;
        setCrew(casts.slice(0, 6));
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=7a8e881cc6d01675969a3d2a52897837`,
      { signal: signal }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        const movies = myJson.results;
        setRecommendedMovies(movies.length > 12 ? movies.slice(0, 12) : movies);
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=7a8e881cc6d01675969a3d2a52897837`,
      { signal: signal }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setMovie(myJson);
        setLoading(false);
      });

    return () => controller.abort();
  }, [movieId]);

  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <Grid
            container
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mt: 3, mb: 5, minHeight: 700 }}
          >
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="700"
                  sx={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.poster_path}")`,
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h3" component="div" align="center">
                    {movie.title}
                  </Typography>
                  <Typography variant="h5" component="div" align="center">
                    {movie.tagline}
                  </Typography>
                  <Typography component="div" variant="h6" sx={{ mt: 5 }}>
                    <b>Release Date: </b> {movie.release_date}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    <b>Genres: </b>
                    {movie.genres.map((genre) => {
                      if (genre === movie.genres[movie.genres.length - 1]) {
                        return genre.name;
                      }
                      return genre.name + ", ";
                    })}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    <b>Rating:</b> {movie.vote_average} / 10
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    <b>Overview:</b>
                  </Typography>
                  <Typography variant="body" component="div">
                    {movie.overview}
                  </Typography>

                  <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    <b>Main Casts:</b>
                  </Typography>

                  <Grid container columnSpacing={{ xs: 2 }} sx={{ mt: 2 }}>
                    {crew.map((cast) => {
                      return (
                        <Grid key={cast.id} item xs={4} sm={3} md={2}>
                          <Link
                            to={"/actor/" + cast.id}
                            style={{ textDecoration: "none" }}
                          >
                            <Card
                              sx={{
                                minHeight: 150,
                              }}
                            >
                              <CardMedia
                                component="img"
                                height="175"
                                sx={{
                                  backgroundImage: `url('https://image.tmdb.org/t/p/original${cast.profile_path}')`,
                                }}
                              />

                              <Typography
                                variant="body"
                                component="div"
                                align="center"
                                sx={{
                                  mb: 2,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {cast.name}
                              </Typography>
                            </Card>
                          </Link>
                        </Grid>
                      );
                    })}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box container>
            <Typography variant="h4" component="div" align="center">
              You might also like
            </Typography>
            <MoviesList movies={recommendedMovies} pagination={false} />
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Movie;

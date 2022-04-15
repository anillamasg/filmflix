import { CardContent, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, Fragment } from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import MoviesList from "./MoviesList";

import { useParams } from "react-router-dom";

function Actor() {
  const [actor, setActor] = useState({});
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { actorId } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=7a8e881cc6d01675969a3d2a52897837`,
      { signal: signal }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setActor(myJson);
        setLoading(false);
      });

    fetch(
      `https://api.themoviedb.org/3/discover/movie?with_people=${actorId}&sort_by=popularity.desc&api_key=7a8e881cc6d01675969a3d2a52897837`,
      { signal: signal }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        const results = myJson.results;
        setMovies(results.length > 12 ? results.slice(0, 12) : results);
      });

    return () => controller.abort();
  }, []);

  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <Grid
            container
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mt: 3, mb: 7, minHeight: 700 }}
          >
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="700"
                  sx={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original${actor.profile_path}")`,
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h3" component="div" align="center">
                    {actor.name}
                  </Typography>

                  <Typography component="div" variant="h6" sx={{ mt: 5 }}>
                    <b>Date of Birth: </b> {actor.birthday}
                  </Typography>

                  <Typography component="div" variant="h6" sx={{ mt: 2 }}>
                    <b>Place of Birth: </b> {actor.place_of_birth}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    <b>Biography:</b>
                  </Typography>
                  <Typography variant="body" component="div">
                    {actor.biography}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box container>
            <Typography variant="h4" component="div" align="center">
              {actor.name}'s Popular Movies
            </Typography>
            <MoviesList movies={movies} pagination={false} />
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Actor;

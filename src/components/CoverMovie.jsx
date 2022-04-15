import { useTheme } from "@emotion/react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";

function CoverMovie({ movie }) {
  const theme = useTheme();
  return (
    <Fragment>
      <Card
        sx={{
          mt: 2,
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          height="100%"
          sx={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backgroundBlendMode: "darken",
            position: "absolute",
          }}
        />
        <CardContent
          width="100%"
          sx={{
            color: theme.palette.primary.contrastText,
            position: "relative",
          }}
        >
          <Typography variant="h4">{movie.original_title}</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {movie.overview}
          </Typography>
        </CardContent>
      </Card>
    </Fragment>
  );
}

export default CoverMovie;

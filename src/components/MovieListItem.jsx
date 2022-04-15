import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

function MovieListItem({ movie }) {
  return (
    <Card sx={{ minHeight: 300 }}>
      <CardMedia
        component="img"
        height="300"
        sx={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.poster_path}')`,
        }}
      />
    </Card>
  );
}

export default MovieListItem;

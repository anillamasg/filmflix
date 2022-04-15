import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../reducers/moviesSlice";
import { setGenres } from "../reducers/genresSlice";
import Dashboard from "./Dashboard";
import { setMaxPages } from "../reducers/maxPagesSlice";

function Initialize() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const page = useSelector((state) => state.page.value);
  const category = useSelector((state) => state.category.value);

  const URL = `https://api.themoviedb.org/3/${category}api_key=7a8e881cc6d01675969a3d2a52897837&page=${page}`;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=7a8e881cc6d01675969a3d2a52897837",
      { signal: signal }
    )
      .then((response) => response.json())
      .then((myJson) => dispatch(setGenres(myJson.genres)))
      .catch((err) => {
        console.log(err);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(URL, { signal: signal })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        dispatch(setMaxPages(myJson.total_pages));
        dispatch(setMovies(myJson.results));
        setLoading(false);
      });
    return () => controller.abort();
  }, [page, category]);

  return <Fragment>{!loading && <Dashboard />}</Fragment>;
}

export default Initialize;

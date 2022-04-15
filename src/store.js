import { configureStore } from "@reduxjs/toolkit";
import actorSlice from "./reducers/actorSlice";
import pageSlice from "./reducers/pageSlice";
import moviesSlice from "./reducers/moviesSlice";
import genresSlice from "./reducers/genresSlice";
import maxPagesSlice from "./reducers/maxPagesSlice";
import categorySlice from "./reducers/categorySlice";
import selectedDrawerItemSlice from "./reducers/selectedDrawerItemSlice";

export default configureStore({
  reducer: {
    actor: actorSlice,
    page: pageSlice,
    movies: moviesSlice,
    genres: genresSlice,
    maxPages: maxPagesSlice,
    category: categorySlice,
    selectedDrawerItem: selectedDrawerItemSlice,
  },
});

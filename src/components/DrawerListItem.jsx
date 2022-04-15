import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import TheatersIcon from "@mui/icons-material/Theaters";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandBackFist,
  faCompass,
  faCow,
  faMasksTheater,
  faGun,
  faVideoCamera,
  faFaceSadTear,
  faPeopleGroup,
  faMagic,
  faHistory,
  faCrow,
  faMusic,
  faUserSecret,
  faHeart,
  faAtom,
  faTv,
  faWarning,
  faCircleRadiation,
  faHatCowboy,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../reducers/categorySlice";
import { reset } from "../reducers/pageSlice";
import { setSelectedDrawerItem } from "../reducers/selectedDrawerItemSlice";
import { useNavigate } from "react-router-dom";

const iconsForCategories = [
  { name: "Popular", icon: <TheatersIcon /> },
  { name: "Top Rated", icon: <StarBorderIcon /> },
  { name: "Upcoming", icon: <UpcomingIcon /> },
  { name: "Now Playing", icon: <LiveTvIcon /> },
];

const iconsForGenres = {
  Action: faHandBackFist,
  Adventure: faCompass,
  Animation: faCow,
  Comedy: faMasksTheater,
  Crime: faGun,
  Documentary: faVideoCamera,
  Drama: faFaceSadTear,
  Family: faPeopleGroup,
  Fantasy: faMagic,
  History: faHistory,
  Horror: faCrow,
  Music: faMusic,
  Mystery: faUserSecret,
  Romance: faHeart,
  ScienceFiction: faAtom,
  TVMovie: faTv,
  Thriller: faWarning,
  War: faCircleRadiation,
  Western: faHatCowboy,
};

function DrawerListItem() {
  const dispatch = useDispatch();
  const selectedIndex = useSelector((state) => state.selectedDrawerItem.value);
  const genres = useSelector((state) => state.genres.value);
  const navigate = useNavigate();

  const handleListItemClick = (index, name = "", id = 0) => {
    if (selectedIndex !== index) {
      dispatch(setSelectedDrawerItem(index));
      let categoryOrGenre;
      if (name !== "")
        categoryOrGenre =
          "movie/" + name.toLowerCase().replace(/\s/g, "_") + "?";

      if (id !== 0) categoryOrGenre = "discover/movie?with_genres=" + id + "&";

      dispatch(setCategory(categoryOrGenre));
      dispatch(reset());

      navigate("/");
    }
  };

  return (
    <List component="nav" sx={{ overflow: "scrollY" }}>
      <ListSubheader
        color="primary"
        component="div"
        sx={{ fontWeight: "bold" }}
        inset
      >
        Categories
      </ListSubheader>

      {iconsForCategories.map((category, index) => {
        return (
          <ListItemButton
            selected={selectedIndex === index}
            key={category.name}
            onClick={() => handleListItemClick(index, category.name)}
          >
            <ListItemIcon>{category.icon}</ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItemButton>
        );
      })}

      <Divider sx={{ my: 1 }} />
      <ListSubheader
        component="div"
        color="primary"
        sx={{ fontWeight: "bold" }}
        inset
      >
        Genres
      </ListSubheader>
      {genres.map((genre, index) => {
        let key = genre.name;
        key = key.replace(/\s/g, "");
        return (
          <ListItemButton
            key={genre.id}
            selected={selectedIndex === index + 4}
            onClick={() => handleListItemClick(index + 4, "", genre.id)}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={iconsForGenres[key]} />
            </ListItemIcon>
            <ListItemText primary={genre.name} />
          </ListItemButton>
        );
      })}
    </List>
  );
}

export default DrawerListItem;

import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { Grid, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCategory } from "../reducers/categorySlice";
import { reset } from "../reducers/pageSlice";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { setSelectedDrawerItem } from "../reducers/selectedDrawerItemSlice";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function ApplicationBar({ open, toggleDrawer }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.log("Failed to logout.");
      console.log(error.message);
    }
  }

  const [searchText, setSearchText] = React.useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const [openDropDown, setOpenDropDown] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenDropDown((prevOpenDropDown) => !prevOpenDropDown);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenDropDown(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenDropDown(false);
    } else if (event.key === "Escape") {
      setOpenDropDown(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpenDropDown = React.useRef(openDropDown);
  React.useEffect(() => {
    if (prevOpenDropDown.current === true && openDropDown === false) {
      anchorRef.current.focus();
    }

    prevOpenDropDown.current = openDropDown;
  }, [openDropDown]);

  const search = () => {
    const searchedText = `search/movie?query=${searchText}&`;

    dispatch(setCategory(searchedText));
    dispatch(reset());
    dispatch(setSelectedDrawerItem(100));

    navigate("/");
  };

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "36px", // keep right padding when drawer closed
        }}
      >
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={0.5} sx={{ mt: 0.5 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Grid>

          <Grid item xs={2}>
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              sx={{ flexGrow: 1, pl: { xs: 2, sm: 1 } }}
            >
              <Link
                component={RouterLink}
                to="/"
                underline="none"
                color="inherit"
              >
                FILMFLIX
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={5}></Grid>

          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              mt: 0.5,
            }}
          >
            <TextField
              id="search-movies"
              className="search-textfield"
              placeholder={searchText === "" ? "Search Movies" : ""}
              variant="filled"
              color="text"
              fullWidth
              onChange={handleSearch}
              onKeyPress={(event) => {
                if (event.key === "Enter" && searchText !== "") {
                  search();
                }
              }}
            />

            <IconButton
              color="inherit"
              aria-label="search"
              disableRipple
              sx={{ cursor: "default" }}
            >
              <SearchIcon />
            </IconButton>
          </Grid>

          <Grid item xs={0.5} sx={{ mt: 0.5, pl: "8px !important" }}>
            <Stack direction="row" spacing={2}>
              <div>
                <IconButton
                  color="inherit"
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={openDropDown ? "composition-menu" : undefined}
                  aria-expanded={openDropDown ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <Badge color="secondary">
                    <AccountCircleIcon />
                  </Badge>
                </IconButton>
                <Popper
                  open={openDropDown}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper
                        sx={{
                          width: 200,
                          maxWidth: "100%",
                        }}
                      >
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={openDropDown}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <Link
                              component={RouterLink}
                              to="/profile"
                              style={{
                                color: "inherit",
                                textDecoration: "none",
                              }}
                            >
                              <MenuItem onClick={handleClose}>Profile</MenuItem>
                            </Link>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default ApplicationBar;

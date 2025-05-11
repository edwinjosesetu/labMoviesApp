import React, { useState, MouseEvent, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useUser } from "../../contexts/signinContext";
import { languageFilter } from "../movieFilterUI";

const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tvAnchorEl, setTvAnchorEl] = useState<null | HTMLElement>(null);
  const [actorAnchorEl, setActorAnchorEl] = useState<null | HTMLElement>(null);
  const [fantasyAnchorEl, setFantasyAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const openTv = Boolean(tvAnchorEl);
  const openActor = Boolean(actorAnchorEl);
  const openFantasy = Boolean(fantasyAnchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Reviews", path: "/favouriteReview" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Popular Movie", path: "/movies/popular" },
    { label: "Sign In", path: "/signin" },
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
    setAnchorEl(null);
    setTvAnchorEl(null);
    setActorAnchorEl(null);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
                {!!isLoggedIn && (
                  <>
                    {" "}
                    <MenuItem onClick={(e) => setTvAnchorEl(e.currentTarget)}>
                      TV Series
                    </MenuItem>
                    <Menu
                      anchorEl={tvAnchorEl}
                      open={openTv}
                      onClose={() => setTvAnchorEl(null)}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <MenuItem onClick={() => handleMenuSelect("/tv")}>
                        List
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleMenuSelect("/tv/favourites")}
                      >
                        Favorites
                      </MenuItem>
                    </Menu>
                    <MenuItem
                      onClick={(e) => setActorAnchorEl(e.currentTarget)}
                    >
                      Actor
                    </MenuItem>
                    <Menu
                      anchorEl={actorAnchorEl}
                      open={openActor}
                      onClose={() => setActorAnchorEl(null)}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <MenuItem onClick={() => handleMenuSelect("/actors")}>
                        List
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleMenuSelect("/actors/favourites")}
                      >
                        Favorites
                      </MenuItem>
                    </Menu>
                    <MenuItem
                      onClick={(e) => setActorAnchorEl(e.currentTarget)}
                    >
                      Fantasy Movie
                    </MenuItem>
                    <Menu
                      anchorEl={fantasyAnchorEl}
                      open={openFantasy}
                      onClose={() => setFantasyAnchorEl(null)}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <MenuItem onClick={() => handleMenuSelect("/actors")}>
                        Create
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleMenuSelect("/actors/favourites")}
                      >
                        List
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}
              {!!isLoggedIn && (
                <>
                  {" "}
                  <Button
                    color="inherit"
                    endIcon={<ArrowDropDownIcon />}
                    onClick={(e) => setTvAnchorEl(e.currentTarget)}
                  >
                    TV Series
                  </Button>
                  <Menu
                    anchorEl={tvAnchorEl}
                    open={openTv}
                    onClose={() => setTvAnchorEl(null)}
                  >
                    <MenuItem onClick={() => handleMenuSelect("/tv")}>
                      List
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleMenuSelect("/tv/favourites")}
                    >
                      Favorites
                    </MenuItem>
                  </Menu>
                  <Button
                    color="inherit"
                    endIcon={<ArrowDropDownIcon />}
                    onClick={(e) => setActorAnchorEl(e.currentTarget)}
                  >
                    Actor
                  </Button>
                  <Menu
                    anchorEl={actorAnchorEl}
                    open={openActor}
                    onClose={() => setActorAnchorEl(null)}
                  >
                    <MenuItem onClick={() => handleMenuSelect("/actors")}>
                      List
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleMenuSelect("/actors/favourites")}
                    >
                      Favorites
                    </MenuItem>
                  </Menu>
                  <Button
                    color="inherit"
                    endIcon={<ArrowDropDownIcon />}
                    onClick={(e) => setFantasyAnchorEl(e.currentTarget)}
                  >
                    Fantasy
                  </Button>
                  <Menu
                    anchorEl={fantasyAnchorEl}
                    open={openFantasy}
                    onClose={() => setFantasyAnchorEl(null)}
                  >
                    <MenuItem
                      onClick={() => handleMenuSelect("/fantasy/create")}
                    >
                      Create
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleMenuSelect("/fantasymovies")}
                    >
                      List
                    </MenuItem>
                  </Menu>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
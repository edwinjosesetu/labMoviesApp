import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { TVSeriesProps } from "../../types/interfaces";

const FavoriteTVIcon: React.FC<TVSeriesProps> = (movie) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    if (context.favoriteTV.find((m) => m.id === movie.id)) {
      context.removeFavoriteTV(movie);
      console.log("object");
    } else {
      context.addFavoriteTV(movie);
    }
    e.preventDefault();
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default FavoriteTVIcon;

import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Actor } from "../actorCard";

const FavoriteActorIcon: React.FC<Actor> = (movie) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    if (context.favoriteActor.find((m) => m.id === movie.id)) {
      context.removeFavoriteActor(movie);
      console.log("object");
    } else {
      context.addFavoriteActor(movie);
    }
    e.preventDefault();
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default FavoriteActorIcon;

import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlayListAdd from "@mui/icons-material/PlaylistAdd";
import { BaseMovieProps } from "../../types/interfaces";
import { MoviesContext } from "../../contexts/moviesContext";

const PlayListAddIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    if (context.mustWatchList.find((m) => m.id === movie.id)) {
      context.removeFromMustWatchList(movie);
    } else {
      context.addToMustWatchList(movie);
    }
    e.preventDefault();
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <PlayListAdd color="primary" fontSize="large" />
    </IconButton>
  );
};

export default PlayListAddIcon;
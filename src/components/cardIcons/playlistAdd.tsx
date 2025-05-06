import React, { MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import PlayListAdd from "@mui/icons-material/PlaylistAdd";
import { BaseMovieProps } from "../../types/interfaces";

const PlayListAddIcon: React.FC<BaseMovieProps> = (movie) => {

    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };
    return (
        <IconButton aria-label="add to favorites" onClick={onUserSelect}>
            <PlayListAdd color="primary" fontSize="large" />
        </IconButton>
    );
};

export default PlayListAddIcon;
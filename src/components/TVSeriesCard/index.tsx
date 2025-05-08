// src/components/tvSeriesCard/index.tsx
import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import img from "../../images/film-poster-placeholder.png";
import { TVSeriesProps } from "../../types/interfaces";

const TVSeriesCard: React.FC<{ tvSeries: TVSeriesProps }> = ({ tvSeries }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{tvSeries.name?.charAt(0)}</Avatar>}
        title={tvSeries.name}
        subheader={`First Air Date: ${tvSeries.first_air_date ?? "N/A"}`}
      />
      <CardMedia
        component="img"
        image={
          tvSeries.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tvSeries.poster_path}`
            : img
        }
        alt={tvSeries.name}
      />
      <CardContent>
        <Typography variant="body2">
          Rating: {tvSeries.vote_average ?? "N/A"}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/tv/${tvSeries.id}`}>
          <Button variant="outlined" size="small">More Info</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default TVSeriesCard;

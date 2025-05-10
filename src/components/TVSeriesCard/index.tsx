import React, { useContext } from "react";
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
import FavoriteTVIcon from "../cardIcons/FavoriteTVIcon";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MoviesContext } from "../../contexts/moviesContext";

const styles = {
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const TVSeriesCard: React.FC<{ tvSeries: TVSeriesProps }> = ({ tvSeries }) => {
  const { favoriteTV } = useContext(MoviesContext);

  const isFavorite = favoriteTV.find((item) => item.id === tvSeries.id);

  return (
    <Card>
      <CardHeader
        avatar={
          <>
            {!!isFavorite && (
              <Avatar style={styles.avatar}>
                <FavoriteIcon />
              </Avatar>
            )}
            <Avatar>{tvSeries.name?.charAt(0)}</Avatar>
          </>
        }
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
          <Button variant="outlined" size="small">
            More Info
          </Button>
        </Link>
        <FavoriteTVIcon {...tvSeries} />
      </CardActions>
    </Card>
  );
};

export default TVSeriesCard;
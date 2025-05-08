import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getTVSeriesDetails } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { Typography, Card, CardMedia, CardContent, Box } from "@mui/material";
import img from "../images/film-poster-placeholder.png";

const TVSeriesDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: tv, isLoading, isError, error } = useQuery(
    ["tvSeriesDetails", id],
    () => getTVSeriesDetails(Number(id))
  );

  if (isLoading) return <Spinner />;
  if (isError) return <Typography color="error">{(error as Error).message}</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: { md: 300 }, borderRadius: 2 }}
          image={
            tv.poster_path
              ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
              : img
          }
          alt={tv.name}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4">{tv.name}</Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            First Air Date: {tv.first_air_date}
          </Typography>
          <Typography variant="subtitle2">
            Rating: {tv.vote_average}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {tv.overview || "No overview available."}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TVSeriesDetailsPage;

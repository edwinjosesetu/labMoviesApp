import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import TVSeriesCard from "../components/TVSeriesCard";
import { Grid, Typography } from "@mui/material";
import { TVSeriesProps } from "../types/interfaces";

const FavoruiteTV: React.FC = () => {
  const { favoriteTV } = useContext(MoviesContext);

  return (
    <>
      <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
        Favorite TV Series
      </Typography>
      <Grid container spacing={4}>
        {favoriteTV.map((tv: TVSeriesProps) => (
          <Grid item key={tv.id} xs={12} sm={6} md={4} lg={3}>
            <TVSeriesCard tvSeries={tv} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FavoruiteTV;

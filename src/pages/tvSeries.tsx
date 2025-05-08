import React from "react";
import { useQuery } from "react-query";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Spinner from "../components/spinner";
import { getTVSeries } from "../api/tmdb-api";
import TVSeriesCard from "../components/TVSeriesCard";
import { TVSeriesProps } from "../types/interfaces";

const TVSeriesPage: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["TVSeries"],
    queryFn: getTVSeries,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{(error as Error).message}</h1>;

  return (
    <>
      <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
        TV Series
      </Typography>
      <Grid container spacing={4}>
        {(data?.results ?? data)?.map((tv: TVSeriesProps) => (
          <Grid item key={tv.id} xs={12} sm={6} md={4} lg={3}>
            <TVSeriesCard tvSeries={tv} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TVSeriesPage;

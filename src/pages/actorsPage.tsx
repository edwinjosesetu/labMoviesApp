import React from "react";
import { useQuery } from "react-query";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Spinner from "../components/spinner";
import ActorCard from "../components/actorCard"; // Your new component
import { getActors } from "../api/tmdb-api";

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
  known_for_department: string;
}

const ActorsPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery("actors", getActors);

  if (isLoading) return <Spinner />;
  if (isError) {
    const err = error as Error;
    return <Typography color="error">{err.message}</Typography>;
  }
  
  const actors = data?.results ?? [];

  return (
    <>
      <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
        Popular Actors
      </Typography>
      <Grid container spacing={4}>
        {actors.map((actor: Actor) => (
          <Grid item key={actor.id} xs={12} sm={6} md={4} lg={3}>
            <ActorCard actor={actor} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ActorsPage;

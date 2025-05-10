import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { Grid, Typography } from "@mui/material";
import ActorCard, { Actor } from "../components/actorCard";

const FavouriteActors: React.FC = () => {
  const { favoriteActor } = useContext(MoviesContext);

  return (
    <>
      <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
        Favorite Actors
      </Typography>
      <Grid container spacing={4}>
        {favoriteActor.map((actor: Actor) => (
          <Grid item key={actor.id} xs={12} sm={6} md={4} lg={3}>
            <ActorCard actor={actor} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FavouriteActors;

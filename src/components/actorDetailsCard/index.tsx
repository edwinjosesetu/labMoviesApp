import React from "react";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import imgPlaceholder from "../../images/film-poster-placeholder.png";

interface ActorDetailsCardProps {
  actor: {
    name: string;
    profile_path: string | null;
    popularity: number;
    known_for_department: string;
    biography: string;
  };
}

const ActorDetailsCard: React.FC<ActorDetailsCardProps> = ({ actor }) => {
  return (
    <Card sx={{ display: "flex", padding: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 300, borderRadius: 2 }}
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : imgPlaceholder
        }
        alt={actor.name}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h4">{actor.name}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Known for: {actor.known_for_department}
        </Typography>
        <Typography variant="subtitle2">Popularity: {actor.popularity}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {actor.biography || "No biography available."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActorDetailsCard;

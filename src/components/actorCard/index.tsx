import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
  known_for_department: string;
}

interface ActorCardProps {
  actor: Actor;
}

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(0, 102, 204)",
  },
};

const ActorCard: React.FC<ActorCardProps> = ({ actor }) => {
  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          <Avatar sx={styles.avatar}>
            {actor.name.charAt(0)}
          </Avatar>
        }
        title={
          <Typography variant="h6" component="p">
            {actor.name}
          </Typography>
        }
        subheader={actor.known_for_department}
      />
      <CardMedia
        sx={styles.media}
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : img
        }
        title={actor.name}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body1" component="p">
              Popularity: {actor.popularity.toFixed(1)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/actors/${actor.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ActorCard;

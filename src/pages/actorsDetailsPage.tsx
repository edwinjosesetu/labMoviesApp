import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Typography } from "@mui/material";
import Spinner from "../components/spinner";
import ActorDetailsCard from "../components/actorDetailsCard";
import { getActorDetails } from "../api/tmdb-api";

interface ActorDetails {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
  known_for_department: string;
  biography: string;
}

const ActorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery<ActorDetails, Error>(["actorDetails", id], () =>
    getActorDetails(Number(id))
  );

  if (isLoading) return <Spinner />;

  if (isError)
    return (
      <Typography variant="h6" color="error">
        {error.message}
      </Typography>
    );

  return <ActorDetailsCard actor={data!} />;
};

export default ActorDetailsPage;

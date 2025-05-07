import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";
import PlayListAddIcon from "../components/cardIcons/playlistAdd";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const UpcomingMoviesPage: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: getUpcomingMovies,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  
  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={data ? data : []}
      selectFavourite={function (): void {
        throw new Error("Function not implemented.");
      }}
      action={(movie: BaseMovieProps) => {
        return <PlayListAddIcon {...movie} />;
      }}
    />
  );
};

export default UpcomingMoviesPage;
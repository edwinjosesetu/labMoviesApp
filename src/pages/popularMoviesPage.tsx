import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getPopularMovies } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const PopularMoviesPage: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: getPopularMovies,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <PageTemplate
      title="Popular Movies"
      movies={data ?? []}
      selectFavourite={() => {
        throw new Error("Function not implemented.");
      }}
      action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
    />
  );
};

export default PopularMoviesPage;

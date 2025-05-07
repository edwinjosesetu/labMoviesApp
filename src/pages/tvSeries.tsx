import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getTVSeries } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const TVSeriesPage: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["TVSeries"],
    queryFn: getTVSeries,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{(error as Error).message}</h1>;

  return (
    <PageTemplate
      title="TV Series"
      movies={data ?? []}
      action={(tv: BaseMovieProps) => <AddToFavouritesIcon {...tv} />}
      selectFavourite={() => {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export default TVSeriesPage;

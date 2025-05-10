import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getPopularMovies } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const PopularMoviesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery(
    ["popularMovies", currentPage],
    () => getPopularMovies(currentPage),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <PageTemplate
      currentPage={currentPage}
      onPageChange={(e, page: number) => setCurrentPage(page)}
      totalPages={data?.total_pages || 1}
      key={currentPage}
      title="Popular Movies"
      movies={data.results ?? []}
      selectFavourite={() => {
        throw new Error("Function not implemented.");
      }}
      action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
    />
  );
};

export default PopularMoviesPage;

import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  languageFilter,
} from "../components/movieFilterUI";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';


const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};
const languageFiltering = {
  name: "language",
  value: "0",
  condition: languageFilter,
};

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["discover", currentPage],
    () => getMovies(currentPage),
    {
      keepPreviousData: true,
    }
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
    languageFiltering,
  ]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = filterValues.map((filter) =>
      filter.name === type ? changedFilter : filter
    );
    setFilterValues(updatedFilterSet);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };


  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);


  return (
    <>
      <PageTemplate
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={data?.total_pages as number}
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />;
        }} selectFavourite={function (movieId: number): void {
          throw new Error("Function not implemented.");
        }} />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues.find((f) => f.name === "title")?.value || ""}
        genreFilter={filterValues.find((f) => f.name === "genre")?.value || "0"}
        languageFilter={filterValues.find((f) => f.name === "language")?.value || "0"}
      />

    </>
  );
};
export default HomePage;

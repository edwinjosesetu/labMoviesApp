import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";
import PlayListAddIcon from "../components/cardIcons/playlistAdd";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import MovieFilterUI from "../components/movieFilterUI";

const UpcomingMoviesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery(
    ["upcomingMovies", currentPage],
    () => getUpcomingMovies(currentPage),
    {
      keepPreviousData: true, // Important for smoother pagination
    }
  );

  const [filter, setFilter] = useState({
    title: "",
    genre: "0",
    language: "0",
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  // Filter the movies based on the filter state
  const filteredMovies = data
    ? data?.results.filter((movie: BaseMovieProps) => {
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(filter.title.toLowerCase());

      const matchesGenre =
        filter.genre === "0" || movie.genre_ids?.includes(Number(filter.genre));

      const matchesLanguage =
        filter.language === "0" || movie.original_language === filter.language;

      return matchesTitle && matchesGenre && matchesLanguage;
    })
    : [];

  return (
    <>
      {/* Add the MovieFilterUI component */}
      <MovieFilterUI
        onFilterValuesChange={(type: string, value: string) =>
          setFilter({ ...filter, [type]: value })
        }
        titleFilter={filter.title}
        genreFilter={filter.genre}
        languageFilter={filter.language}
      />
      <PageTemplate
        currentPage={currentPage}
        key={currentPage}
        onPageChange={(e, newPage: number) => setCurrentPage(newPage)}
        totalPages={data?.total_pages || 1}
        title="Upcoming Movies"
        movies={filteredMovies}
        selectFavourite={function (): void {
          throw new Error("Function not implemented.");
        }}
        action={(movie: BaseMovieProps) => {
          return <PlayListAddIcon {...movie} />;
        }}
      />
    </>
  );
};

export default UpcomingMoviesPage;
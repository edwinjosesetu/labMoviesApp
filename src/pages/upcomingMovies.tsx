import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";
import PlayListAddIcon from "../components/cardIcons/playlistAdd";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import MovieFilterUI from "../components/movieFilterUI";

const UpcomingMoviesPage: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: getUpcomingMovies,
  });

  const [filter, setFilter] = useState({
    title: "",
    genre: "0", 
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  // Filter the movies based on the filter state
  const filteredMovies = data
    ? data.filter((movie: BaseMovieProps) => {
        const matchesTitle = movie.title
          .toLowerCase()
          .includes(filter.title.toLowerCase());
        const matchesGenre =
          filter.genre === "0" || movie.genre_ids?.includes(Number(filter.genre));
        return matchesTitle && matchesGenre;
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
      />
      <PageTemplate
        title="Upcoming Movies"
        movies={filteredMovies} // Pass the filtered movies
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
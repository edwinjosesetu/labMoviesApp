import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { ListedMovie } from "../types/interfaces";

const UpcomingMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<ListedMovie[]>([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const upcomingMovies = await getUpcomingMovies();
        setMovies(upcomingMovies);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  return (
    <PageTemplate
          title="Upcoming Movies"
          movies={movies} selectFavourite={function (): void {
              throw new Error("Function not implemented.");
          } }    />
  );
};

export default UpcomingMoviesPage;

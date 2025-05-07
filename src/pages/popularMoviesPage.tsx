import { useState, useEffect } from "react";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { BaseMovieProps } from "../types/interfaces";

const PopularMoviesPage = () => {
    const [movies, setMovies] = useState<BaseMovieProps[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const movies = await getPopularMovies();
      setMovies(movies);
    };
    fetchData();
  }, []);

  return (
    <PageTemplate
          title="Popular Movies"
          movies={movies}
          action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />} selectFavourite={function (movieId: number): void {
              throw new Error("Function not implemented.");
          } }    />
  );
};

export default PopularMoviesPage;

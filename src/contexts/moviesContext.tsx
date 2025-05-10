import React, { useState, useCallback } from "react";
import {
  BaseMovieProps,
  FantasyMovieProps,
  Review,
  TVSeriesProps,
} from "../types/interfaces";
import { Actor } from "../components/actorCard";

interface MovieContextInterface {
  favourites: number[];
  addToFavourites: (movie: BaseMovieProps) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;
  addReview: (movie: BaseMovieProps, review: Review) => void;

  mustWatchList: BaseMovieProps[];
  addToMustWatchList: (movie: BaseMovieProps) => void;
  removeFromMustWatchList: (movie: BaseMovieProps) => void;

  favoriteActor: Actor[];
  addFavoriteActor: (actor: Actor) => void;
  removeFavoriteActor: (actor: Actor) => void;

  favoriteTV: TVSeriesProps[];
  addFavoriteTV: (tv: TVSeriesProps) => void;
  removeFavoriteTV: (tv: TVSeriesProps) => void;

  fantasyMovies: FantasyMovieProps[];
  addFantasyMovie: (movie: FantasyMovieProps) => void;
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  mustWatchList: [],
  addToMustWatchList: () => {},
  removeFromMustWatchList: () => {},
  addReview: () => {},
  favoriteActor: [],
  addFavoriteActor: () => {},
  removeFavoriteActor: () => {},
  favoriteTV: [],
  addFavoriteTV: () => {},
  removeFavoriteTV: () => {},
  fantasyMovies: [],
  addFantasyMovie: () => {},
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatchList, setMustWatchList] = useState<BaseMovieProps[]>([]);
  const [myReviews, setMyReviews] = useState<{ [movieId: number]: Review }>({});
  const [favoriteActor, setFavoriteActor] = useState<Actor[]>([]);
  const [favoriteTV, setFavoriteTV] = useState<TVSeriesProps[]>([]);
  const [fantasyMovies, setFantasyMovies] = useState<FantasyMovieProps[]>([]);

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prev) =>
      prev.includes(movie.id) ? prev : [...prev, movie.id]
    );
  }, []);

  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prev) => prev.filter((id) => id !== movie.id));
  }, []);

  const addReview = (movie: BaseMovieProps, review: Review) => {
    setMyReviews((prev) => ({ ...prev, [movie.id]: review }));
  };

  const addToMustWatchList = useCallback((movie: BaseMovieProps) => {
    setMustWatchList((prev) =>
      prev.find((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  }, []);

  const removeFromMustWatchList = useCallback((movie: BaseMovieProps) => {
    setMustWatchList((prev) => prev.filter((m) => m.id !== movie.id));
  }, []);

  const addFavoriteActor = useCallback((actor: Actor) => {
    setFavoriteActor((prev) =>
      prev.find((a) => a.id === actor.id) ? prev : [...prev, actor]
    );
  }, []);

  const removeFavoriteActor = useCallback((actor: Actor) => {
    setFavoriteActor((prev) => prev.filter((a) => a.id !== actor.id));
  }, []);

  const addFavoriteTV = useCallback((tv: TVSeriesProps) => {
    setFavoriteTV((prev) =>
      prev.find((t) => t.id === tv.id) ? prev : [...prev, tv]
    );
  }, []);

  const removeFavoriteTV = useCallback((tv: TVSeriesProps) => {
    setFavoriteTV((prev) => prev.filter((t) => t.id !== tv.id));
  }, []);

  const addFantasyMovie = (movie: FantasyMovieProps) => {
    setFantasyMovies((prev) => [...prev, { ...movie, id: Date.now() }]);
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
        mustWatchList,
        addToMustWatchList,
        removeFromMustWatchList,
        favoriteActor,
        addFavoriteActor,
        removeFavoriteActor,
        favoriteTV,
        addFavoriteTV,
        removeFavoriteTV,
        fantasyMovies,
        addFantasyMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";


interface MovieContextInterface {
  favourites: number[];
  addToFavourites: ((movie: BaseMovieProps) => void);
  removeFromFavourites: ((movie: BaseMovieProps) => void);
  addReview: ((movie: BaseMovieProps, review: Review) => void);  // NEW
  mustWatchList: BaseMovieProps[];
  addToMustWatchList: (movie: BaseMovieProps) => void;
  removeFromMustWatchList: (movie: BaseMovieProps) => void;
}
const initialContextState: MovieContextInterface = {
  favourites: [],
  addToFavourites: () => { },
  removeFromFavourites: () => { },
  mustWatchList: [],
  addToMustWatchList: () => { },
  removeFromMustWatchList: () => { },
  addReview: () => { }
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatchList, setMustWatchList] = useState<BaseMovieProps[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>( [] )  // NEW

  const addToMustWatchList = useCallback((movie: BaseMovieProps) => {
    setMustWatchList((prevMustWatchList) => {
      if (!prevMustWatchList.includes(movie)) {
        return [...prevMustWatchList, movie];
      }
      return prevMustWatchList;
    });
  }, []);

  const removeFromMustWatchList = useCallback((movie: BaseMovieProps) => {
    setMustWatchList((prevMustWatchList) =>
      prevMustWatchList.filter((m) => m.id !== movie.id)
    );
  }, []);

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(movie.id)) {
        return [...prevFavourites, movie.id];
      }
      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
  }, []);

  const addReview = (movie: BaseMovieProps, review: Review) => {   // NEW
    setMyReviews({ ...myReviews, [movie.id]: review })
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
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
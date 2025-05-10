import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from "./pages/upcomingMovies";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import PopularMoviesPage from "./pages/popularMoviesPage";
import TVSeriesPage from "./pages/tvSeries";
import ActorsPage from "./pages/actorsPage";
import ActorDetailsPage from "./pages/actorsDetailsPage";
import TVSeriesDetailsPage from "./pages/TVSeriesDeatils";
import SignInPage from "./pages/signInPage";
import { UserProvider } from "./contexts/signinContext";
import FavoriteActors from "./pages/favouriteActors";
import FavoriteTV from "./pages/favouriteTV";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <SiteHeader />      {/* New Header  */}
          <MoviesContextProvider>
            <Routes>
              <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/popular" element={<PopularMoviesPage />} />
              <Route path="/tv" element={<TVSeriesPage />} />
              <Route path="/actors" element={<ActorsPage />} />
              <Route path="/actors/:id" element={<ActorDetailsPage />} />
              <Route path="/tv/:id" element={<TVSeriesDetailsPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/tv" element={<TVSeriesPage />} />
              <Route path="/actors" element={<ActorsPage />} />
              <Route path="/actors/favourites" element={<FavoriteActors />} />
              <Route path="/tv/favourites" element={<FavoriteTV />} />
            </Routes>
          </MoviesContextProvider>
        </UserProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

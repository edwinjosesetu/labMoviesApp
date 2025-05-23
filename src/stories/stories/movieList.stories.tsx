import type { Meta } from '@storybook/react';
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import Grid from "@mui/material/Grid";
import AddToFavouritesIcon from '../../components/cardIcons/addToFavourites';
import MoviesContextProvider from '../../contexts/moviesContext';
import MovieList from '../../components/movieList';

const meta = {
  title: "Home Page/MovieList",
  component: MovieList,
  decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
      (Story) => <MoviesContextProvider><Story /></MoviesContextProvider>,
    ],
    
} satisfies Meta<typeof MovieList>;
export default meta;


export const Basic = () => {
  const movies = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <MovieList
        movies={movies}
        action={(movie) => <AddToFavouritesIcon {...movie} />} selectFavourite={function (movieId: number): void {
          throw new Error('Function not implemented.');
        } }      />
    </Grid>
  );
};
Basic.storyName = "Default";



import React from "react";
import Header from "../headerMovieList";
import MovieList from "../movieList";
import {
  MovieListPageTemplateProps,
  PaginationProps,
} from "../../types/interfaces";
import { Grid, Pagination, Stack } from "@mui/material";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

const MovieListPageTemplate: React.FC<
  MovieListPageTemplateProps & PaginationProps
> = ({
  movies,
  title,
  action,
  selectFavourite,
  currentPage,
  totalPages,
  onPageChange,
}) => {
    return (
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
          <MovieList
            action={action}
            movies={movies}
            selectFavourite={selectFavourite}
          ></MovieList>
        </Grid>

        {/* Pagination Component */}
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ marginTop: 4 }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={onPageChange}
              color="primary"
              shape="rounded"
              size="large"
              siblingCount={1}
              boundaryCount={1}
              showFirstButton
              showLastButton
            />
          </Stack>
        </Grid>
      </Grid>
    );
  };

export default MovieListPageTemplate;
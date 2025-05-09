import React, { ChangeEvent } from "react";
import {
  Card,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  TextField,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import { useQuery } from "react-query";
import Spinner from '../spinner';
import { getGenres, getLanguages } from "../../api/tmdb-api";
import { FilterOption, GenreData } from "../../types/interfaces";

const styles = {
  root: {
    maxWidth: 345,
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface FilterMoviesCardProps {
  onUserInput: (f: FilterOption, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  languageFilter: string;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({
  titleFilter,
  genreFilter,
  languageFilter,
  onUserInput,
}) => {
  const {
    data: genreData,
    error: genreError,
    isLoading: genreLoading,
    isError: genreIsError,
  } = useQuery<GenreData, Error>("genres", getGenres);

  const {
    data: languageData,
    error: languageError,
    isLoading: languageLoading,
    isError: languageIsError,
  } = useQuery<{ iso_639_1: string; english_name: string }[], Error>(
    "languages",
    getLanguages
  );

  if (genreLoading || languageLoading) {
    return <Spinner />;
  }

  if (genreIsError) {
    return <h1>{genreError.message}</h1>;
  }

  if (languageIsError) {
    return <h1>{languageError.message}</h1>;
  }

  const genres = genreData?.genres || [];
  if (genres[0]?.name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const languages = languageData || [];
  if (languages[0]?.english_name !== "All") {
    languages.unshift({ iso_639_1: "0", english_name: "All" });
  }

  const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
    e.preventDefault();
    onUserInput(type, value);
  }

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e as any, "title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleLanguageChange = (e: SelectChangeEvent) => {
    handleChange(e, "language", e.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Filter the movies.
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search field"
            type="search"
            value={titleFilter}
            variant="filled"
            onChange={handleTextChange}
          />

          <FormControl sx={styles.formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={genreFilter}
              onChange={handleGenreChange}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={styles.formControl}>
            <InputLabel id="language-label">Language</InputLabel>
            <Select
              labelId="language-label"
              id="language-select"
              value={languageFilter}
              onChange={handleLanguageChange}
            >
              {languages.map((language) => (
                <MenuItem key={language.iso_639_1} value={language.iso_639_1}>
                  {language.english_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the movies.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMoviesCard;

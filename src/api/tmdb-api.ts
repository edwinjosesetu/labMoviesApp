export const getMovies = (
  page: number = 1
) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getLanguages = async (): Promise<
  { iso_639_1: string; english_name: string }[]
> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/configuration/languages?api_key=${import.meta.env.VITE_TMDB_KEY
    }`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch languages");
  }
  return response.json();
};

export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get movie data. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
    import.meta.env.VITE_TMDB_KEY +
    "&language=en-US"
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch genres. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    })
    .then((json) => json.posters)
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = (id: string | number) => {
  //movie id can be string or number
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};

export const getUpcomingMovies = async (page: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=${page}`
  );
  if (!res.ok) throw new Error("Failed to fetch upcoming movies");
  return res.json();
};

export const getPopularMovies = async (page: number = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const json = await response.json();
  return json; // Return full response including results, page info
};

export const getTVSeries = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY
    }&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Unable to fetch popular TV series. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((json) => json.results) // This extracts the 'results' from the response data
    .catch((error) => {
      throw error;
    });
};

export const getTVSeriesDetails = async (id: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY
    }&language=en-US`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch TV series details: ${response.statusText}`
    );
  }
  return await response.json();
};

export const getActors = () => {
  return fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Failed to fetch actors. Status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getActorDetails = async (id: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY
    }&language=en-US`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch actor details");
  }
  return response.json();
};

export const addReviewFrontend = async (review: {}) => {
  try {
    console.log("Sending review to API:", review); // Debugging log
    const response = await fetch("https://aec77clxv0.execute-api.eu-west-1.amazonaws.com/dev/frontendreviews", {
      method: "POST",
      mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      throw new Error(`Failed to post review. Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Review successfully posted:", result);
    return result;
  } catch (error) {
    console.error("Error posting review:", error);
    throw error;
  }
};

export const getFrontendReview = async () => {
  try {
    const response = await fetch("https://aec77clxv0.execute-api.eu-west-1.amazonaws.com/dev/frontendreviews", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch reviews. Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Fetched reviews:", result);
    return result.data; // Assuming the response is an array of reviews
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

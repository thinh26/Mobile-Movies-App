import size from "lodash/size";

export const TMDB_CONFIG = {
  BASE_URL: `${process.env.EXPO_PUBLIC_TMDB_API_BASE_URL}${process.env.EXPO_PUBLIC_TMDB_API_VERSION}`,
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_ACCESS_TOKEN,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_ACCESS_TOKEN}`
  }
} as const;

//   "/discover/movie
export const fetchMovies = async ({
  query
}: {
  query: string;
}): Promise<Array<Movie>> => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endpoint, {
    headers: TMDB_CONFIG.headers
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies\n${response.statusText}`);
  }

  const data = (await response.json()) as unknown as { results: Array<Movie> };
  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = (await response.json()) as unknown as MovieDetails;
    return data;
  }
  catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getSearchResults = async ({
  searchQuery,
  fetchFunction,
  data,
  dbFunction,
  resetFunction
}: SearchResultsParam) => {
  if (searchQuery.trim()) {
    await fetchFunction();
    if (size(data) > 0 && data?.[0]) {
      await dbFunction();
    }
  }
  else {
    resetFunction();
  }
};

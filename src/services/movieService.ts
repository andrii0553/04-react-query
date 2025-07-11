import axios from "axios";
import type { Movie } from "../types/movie";

const API_BASE_URL = "https://api.themoviedb.org/3";
const token = import.meta.env.VITE_TMDB_TOKEN;

interface SearchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export async function fetchMovies(
  query: string,
  page: number
): Promise<SearchMoviesResponse> {
  const response = await axios.get<SearchMoviesResponse>(
    `${API_BASE_URL}/search/movie`,
    {
      params: { query, page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

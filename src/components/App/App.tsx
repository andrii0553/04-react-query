import { useState } from "react";
import css from "./App.module.css";
import { Toaster, toast } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSubmit = async (searchValue: string) => {
    setMovies([]);

    setIsLoading(true);
    setIsError(false);

    try {
      const fetchedMovies = await fetchMovies(searchValue);
      if (fetchedMovies.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(fetchedMovies);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error fetching movies: ${error.message}`);
      } else {
        toast.error("Error fetching movies.");
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    if (!movie) return;
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <div className={css.app}>
        <Toaster position="top-center" />
        <SearchBar onSubmit={handleSubmit} />
        {isLoading ? (
          <Loader />
        ) : (
          movies.length > 0 && (
            <MovieGrid onSelect={handleSelect} movies={movies} />
          )
        )}
        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={closeModal} />
        )}
        {isError && <ErrorMessage />}
      </div>
    </>
  );
}

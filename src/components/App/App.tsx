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
import ReactPaginate from "react-paginate";

export default function App() {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10; // Кількість фільмів на сторінці

  const handleSubmit = async (searchValue: string) => {
    setAllMovies([]);
    setCurrentPage(1);
    setIsLoading(true);
    setIsError(false);

    try {
      const fetchedMovies = await fetchMovies(searchValue);
      if (fetchedMovies.length === 0) {
        toast.error("Фільми не знайдено за вашим запитом.");
      }
      setAllMovies(fetchedMovies);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Помилка завантаження фільмів: ${error.message}`);
      } else {
        toast.error("Помилка завантаження фільмів.");
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  const handleSelect = (movie: Movie) => {
    if (!movie) return;
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  // Обчислення фільмів для поточної сторінки
  const totalPages = Math.ceil(allMovies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = allMovies.slice(startIndex, startIndex + moviesPerPage);

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {currentMovies.length > 0 && (
            <MovieGrid onSelect={handleSelect} movies={currentMovies} />
          )}
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={currentPage - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      {isError && <ErrorMessage />}
    </div>
  );
}

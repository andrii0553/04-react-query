import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  if (movies.length === 0) return null; // Не показываем список, если фильмов нет

  const fallbackImage = "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <>
      <ul className={css.grid}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <div className={css.card} onClick={() => onSelect(movie)}>
              <img
                className={css.image}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : fallbackImage
                }
                alt="{movie.title}"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

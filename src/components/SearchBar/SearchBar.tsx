import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const formValue = formData.get("query") as string;

    // перевірка, якщо при сабміті пустий інпут
    if (formValue === "") {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(formValue);
  };

  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <a
            className={css.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>
          <form action={handleSubmit} className={css.form}>
            <input
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={css.button} type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
    </>
  );
}

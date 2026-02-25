import { library } from "@/data/books.json";
import { FilterSection } from "./FilterSection";

import { useState } from "react";

export function DefaultLibrary() {
  // const [books, setBooks] = useState(library);

  const [maxPages, setMaxPages] = useState(1200);
  const [genre, setGenre] = useState("");
  const [readList, setReadList] = useState([]);

  // Filtro por género y páginas
  const filteredBooks = library.filter((book) => {
    const matchGenre = genre === "" || book.book.genre === genre;

    const matchPages = book.book.pages <= maxPages;

    return matchGenre && matchPages;
  });

  return (
    <div>
      <p className="text-4xl font-semibold my-8">
        {filteredBooks.length} libros disponibles
      </p>
      {readList.length > 0 && (
        <p className="text-2xl font-semibold my-8">
          {readList.length} en la lista de lectura
        </p>
      )}
      <FilterSection
        handleGenreFilter={setGenre}
        handlePageFilter={setMaxPages}
      />

      <section className="flex gap-6 flex-wrap">
        {filteredBooks.map(({ book }) => (
          <img
            key={book.ISBN}
            className="w-32 h-48"
            src={book.cover}
            alt={book.title}
          />
        ))}
      </section>
    </div>
  );
}

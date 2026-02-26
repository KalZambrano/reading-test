import { FilterSection } from "./FilterSection";

import { useState } from "react";

export function DefaultLibrary({
  library,
  handleAddToReadList,
  readList,
}: any) {
  // const [books, setBooks] = useState(library);

  const [maxPages, setMaxPages] = useState(1200);
  const [genre, setGenre] = useState("");

  // Filtro por género y páginas
  const filteredBooks = library.filter((book: Record<string, any>) => {
    const matchGenre = genre === "" || book.book.genre === genre;

    const matchPages = book.book.pages <= maxPages;

    return matchGenre && matchPages;
  });

  // Verificar si un libro está en la lista de lectura
  const isInReadList = (isbn: string) => {
    return readList.some((book: any) => book.ISBN === isbn);
  };

  return (
    <div>
      {(genre || maxPages) && (
        <p className="text-xl font-semibold my-8 text-gray-300">
          {filteredBooks.length} libros filtrados
        </p>
      )}

      <FilterSection
        handleGenreFilter={setGenre}
        handlePageFilter={setMaxPages}
      />

      <section className="flex gap-6 flex-wrap">
        {filteredBooks.map(({ book }: any) => {
          const added = isInReadList(book.ISBN);

          return (
            <article key={book.ISBN} className="relative group">
              {/* Imagen */}

              <img
                className={`
            w-32 h-48
            transition-opacity
            ${added ? "opacity-40" : "opacity-100"}
          `}
                src={book.cover}
                alt={book.title}
              />

              {/* Botón */}

              {!added && (
                <button
                  className="absolute bottom-0 left-0 right-0 bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                  onClick={() => handleAddToReadList(book)}
                >
                  Agregar
                </button>
              )}

              {/* Badge opcional */}

              {added && (
                <span className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 rounded">
                  ✓
                </span>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}

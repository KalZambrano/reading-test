import { DefaultLibrary } from "./DefaultLibrary";
import { library } from "@/data/books.json";
import { useState } from "react";
import { ReadList } from "./ReadList";

interface Book {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author: {
    name: string;
    otherBooks: string[];
  };
}

export function LibrarySection() {
  const [readList, setReadList] = useState<Book[]>([]);

  // Agregar un libro a la lista de lectura
  const handleAddToReadList = (book: Book) => {
    const exists = readList.some((item: Book) => item.ISBN === book.ISBN);

    if (exists) return;

    setReadList([...readList, book]);
  };

  // Remover un libro de la lista de lectura
  const handleRemoveFromReadList = (isbn: string) => {
    setReadList(readList.filter((book: Book) => book.ISBN !== isbn));
    // console.log(readList);
  };

  return (
    <div>
      <p className="text-3xl font-semibold my-2">
        {library.length} libros disponibles
      </p>
      {readList.length > 0 && (
        <p className="text-xl font-semibold my-4">
          {readList.length} en la lista de lectura
        </p>
      )}
      <section className="grid grid-cols-3">
        <section className="col-span-2">
          <DefaultLibrary
            library={library}
            handleAddToReadList={handleAddToReadList}
            readList={readList}
          />
        </section>
        <section className="col-span-1">
          {readList.length > 0 && <ReadList readList={readList} handleRemoveFromReadList={handleRemoveFromReadList} />}
        </section>
      </section>
    </div>
  );
}

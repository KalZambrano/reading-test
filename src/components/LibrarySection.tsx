import { DefaultLibrary } from "./DefaultLibrary";
import { library } from "@/data/books.json";
import { useState, useEffect } from "react";
import { ReadList } from "./ReadList";
import type { Book } from "@/types";

export function LibrarySection() {
  const [readList, setReadList] = useState<Book[]>([]);

  useEffect(() => {
    // Cargar datos iniciales desde localStorage
    const readListJSON = localStorage.getItem("readList");
    if (readListJSON) {
      try {
        setReadList(JSON.parse(readListJSON));
      } catch (error) {
        console.error("Error parsing readList from localStorage:", error);
      }
    }

    // Escuchar cambios en otras pestañas
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "readList" && event.newValue) {
        try {
          const newReadList = JSON.parse(event.newValue);
          setReadList(newReadList);
        } catch (error) {
          console.error("Error parsing readList from storage event:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Agregar un libro a la lista de lectura
  const handleAddToReadList = (book: Book) => {
    const exists = readList.some((item: Book) => item.ISBN === book.ISBN);

    if (exists) return;

    const newReadList = [...readList, book];
    setReadList(newReadList);
    
    // Disparar evento personalizado para sincronización inmediata en la misma pestaña
    localStorage.setItem("readList", JSON.stringify(newReadList));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "readList",
      newValue: JSON.stringify(newReadList)
    }));
  };

  // Remover un libro de la lista de lectura
  const handleRemoveFromReadList = (isbn: string) => {
    const newReadList = readList.filter((book: Book) => book.ISBN !== isbn);
    setReadList(newReadList);
    
    // Disparar evento personalizado para sincronización inmediata en la misma pestaña
    localStorage.setItem("readList", JSON.stringify(newReadList));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "readList",
      newValue: JSON.stringify(newReadList)
    }));
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

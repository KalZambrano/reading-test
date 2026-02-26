export function ReadList({ readList, handleRemoveFromReadList }: any) {
  return (
    <article className="rounded-xl border border-white/10 p-4">
      <p className="text-4xl font-semibold mb-8 text-center">
        Lista de lectura
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        {readList.map((book: any) => (
          <div key={book.ISBN} className="relative">
            <img className="w-32 h-48" src={book.cover} alt={book.title} />
            <button
              className="absolute -top-2 -right-2 cursor-pointer rounded-full bg-red-500"
              onClick={() => handleRemoveFromReadList(book.ISBN)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </article>
  );
}

type Props = {
  handleGenreFilter: (genre: string) => void;
};

export function GenderFilter({ handleGenreFilter }: Props) {
  return (
    <div className="w-64">
      {/* Label */}

      <label
        className="
        block
        text-sm
        font-semibold
        mb-2
        text-zinc-700
        dark:text-zinc-300
      "
      >
        Filtrar por género
      </label>

      {/* Select container */}

      <div className="relative">
        {/* Select */}

        <select
          onChange={(e) => handleGenreFilter(e.target.value)}
          className="

          w-full

          appearance-none

          px-4

          py-2.5

          pr-10

          rounded-lg

          border

          border-zinc-300

          dark:border-zinc-700

          bg-white

          dark:bg-zinc-900

          text-zinc-800

          dark:text-zinc-200

          shadow-sm

          cursor-pointer


          transition-all

          duration-200


          hover:border-zinc-400

          dark:hover:border-zinc-500


          focus:outline-none

          focus:ring-2

          focus:ring-indigo-500

          focus:border-indigo-500


          "
        >
          <option value="">Todos</option>

          <option value="Fantasía">Fantasía</option>

          <option value="Ciencia ficción">Ciencia ficción</option>

          <option value="Terror">Terror</option>

          <option value="Zombies">Zombies</option>
        </select>

        {/* Arrow icon */}

        <div
          className="

          pointer-events-none

          absolute

          right-3

          top-1/2

          -translate-y-1/2

          text-zinc-400

        "
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

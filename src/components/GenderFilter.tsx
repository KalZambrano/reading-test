export function GenderFilter({handleGenreFilter}: any) {
    return (
        <div>
            <p>Filtrar por género</p>
            <select className="[&>option]:text-red-800" name="" id="" onChange={(e) => handleGenreFilter(e.target.value)}>
                <option value="">Todos</option>
                <option value="Fantasía">Fantasía</option>
                <option value="Ciencia ficción">Ciencia ficción</option>
                <option value="Terror">Terror</option>
                <option value="Zombies">Zombies</option>
            </select>
        </div>
    )
}
import { useState } from "react";

export function PageFilter({ handlePageFilter }: any) {
  const [value, setValue] = useState(1500);

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setValue(newValue);
    handlePageFilter(newValue);
  };

  return (
    <div className="w-64">
      <p className="mb-8 font-semibold">Filtrar por páginas</p>

      <div className="relative">
        {/* Tooltip */}
        <div
          className="absolute -top-8 text-sm bg-cyan-500/40 text-white px-2 py-1 rounded
                     -translate-x-1/2"
          style={{
            left: `${(value / 1550) * 100}%`,
          }}
        >
          {value}
        </div>

        {/* Range */}
        <input
          type="range"
          min="100"
          max="1500"
          step="200"
          value={value}
          onChange={handleChange}
          className="w-full
                     appearance-none
                     bg-gray-200
                     h-2
                     rounded-lg
                     accent-cyan-400
                     cursor-pointer"
        />
      </div>
    </div>
  );
}

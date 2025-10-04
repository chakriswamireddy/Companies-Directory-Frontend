import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({ name: "", industry: "", location: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 bg-white shadow rounded-xl">
      <div className="flex items-center border px-2 rounded-lg">
        <FiSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          className="outline-none p-1"
          onChange={handleChange}
        />
      </div>
      <input
        type="text"
        name="industry"
        placeholder="Industry"
        className="border p-2 rounded-lg"
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        className="border p-2 rounded-lg"
        onChange={handleChange}
      />
    </div>
  );
}

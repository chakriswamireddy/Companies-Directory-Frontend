import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

function CompanyTable({ companies, onDelete, onEdit }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full border-collapse bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Industry</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Employees</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((c) => (
            <tr key={c._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.industry}</td>
              <td className="p-3">{c.location}</td>
              <td className="p-3">{c.employees}</td>
              <td className="p-3 flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(c)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(c._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {companies.length === 0 && (
        <p className="p-4 text-gray-500 text-center">No companies found</p>
      )}
    </div>
  );
}

export default CompanyTable;

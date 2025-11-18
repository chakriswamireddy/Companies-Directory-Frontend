import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaPlus, FaTrash, } from "react-icons/fa";
import { MdOutlineDomainAdd } from "react-icons/md";


import axios from "axios";
import { useCompanyContext } from "../hooks/CompanyContext";
import { toast } from "sonner";


export default function CompanyList() {

  const {
    companies,
    loading,
    searchTerm,
    setSearchTerm,
    industries,
    selectedIndustry,
    setSelectedIndustry,
    locations,
    selectedLocation,
    setSelectedLocation,
    fetchCompanies,
    currentPage,
    setCurrentPage,
    totalPages,
    sortOrder,
    setSortOrder,

  } = useCompanyContext();

  useEffect(() => {
    fetchCompanies()
  }, [])


  const navigate = useNavigate();

  const [deleteId, setDeleteId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (id) => {
    setDeleteId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setDeleteId(null);
    setIsOpen(false);
    toast.success("Company deleted successfully");
  };


  const handleDelete = async () => {
    try {
      await axios.delete(`https://api.mydummyapi.com/categories/business/${deleteId}`);
      await fetchCompanies();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error deleting company");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>

        <p className="mt-4 text-sm font-medium text-gray-600">
          Loading companies... please wait
        </p>
      </div>
    )
  }





  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-blue-600 font-bold">Companies Directory </h1>
        <button
          onClick={() => navigate("/companies/new")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <MdOutlineDomainAdd /> Add Company
        </button>
      </div>



      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by company name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-56 border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-indigo-200 outline-none"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="asc">Sort by Name (A–Z)</option>
          <option value="desc">Sort by Name (Z–A)</option>
        </select>

        <select
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
          className="w-full sm:w-48 border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-indigo-200 outline-none"
        >
          <option value="">All Industries</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full sm:w-44 border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-indigo-200 outline-none"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>


      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {companies?.map((company) => (
          <div
            key={company.id}
            className="rounded-lg border hover:shadow-xl border-gray-200 shadow-sm p-4 flex flex-col items-center text-center"
          >

            <div className="flex   w-full  items-center gap-4" >


              <div className="bg-green-100 p-2 rounded-full text-green-500 shad" >
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32">
                  <path fill="currentColor" d="M13 30v-3.75c0-.69.56-1.25 1.25-1.25h3.5c.69 0 1.26.56 1.26 1.26V30H30V9.3A2.3 2.3 0 0 0 27.7 7H26V4.46C26 3.1 24.9 2 23.54 2H8.46C7.1 2 6 3.1 6 4.46V7H4.3A2.3 2.3 0 0 0 2 9.3V30zm-7-6H5c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h1zm0-5H5c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h1zm0-5H5c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h1zm20-3h1c.55 0 1 .45 1 1v1c0 .56-.45 1-1 1h-1zm0 5h1c.55 0 1 .45 1 1v1c0 .56-.45 1-1 1h-1zm0 5h1c.55 0 1 .45 1 1v1c0 .56-.45 1-1 1h-1zm-14.5-3c-.27 0-.5-.22-.5-.5v-2.01c0-.27.22-.5.5-.5h3.01c.27 0 .5.22.5.5v2.01a.51.51 0 0 1-.51.5zm9.5-2.5v2.01c0 .27-.22.49-.49.5H17.5c-.28 0-.5-.23-.5-.5V15.5c0-.28.23-.5.5-.5h3c.28 0 .5.23.5.5m-6 5v2.01c0 .27-.22.49-.49.5H11.5c-.28 0-.5-.23-.5-.5V20.5c0-.28.23-.5.5-.5h3c.28 0 .5.23.5.5m6 0v2.01c0 .27-.22.49-.49.5H17.5c-.28 0-.5-.23-.5-.5V20.5c0-.28.23-.5.5-.5h3c.28 0 .5.23.5.5m-6-15v2.01c0 .27-.22.49-.49.5H11.5c-.28 0-.5-.23-.5-.5V5.5c0-.28.23-.5.5-.5h3c.28 0 .5.23.5.5m6 0v2.01c0 .27-.22.49-.49.5H17.5c-.28 0-.5-.23-.5-.5V5.5c0-.28.23-.5.5-.5h3c.28 0 .5.23.5.5m-6 5v2.01c0 .27-.22.49-.49.5H11.5c-.28 0-.5-.23-.5-.5V10.5c0-.28.23-.5.5-.5h3c.28 0 .5.23.5.5m6 0v2.01c0 .27-.22.49-.49.5H17.5c-.28 0-.5-.23-.5-.5V10.5c0-.28.23-.5.5-.5h3c.28 0 .5.23.5.5" />
                </svg>

              </div>

              <div className="flex items-start flex-col" >
                <h3 className="text-xl font-semibold text-gray-900">{company.company}</h3>
                <div className="flex items-end gap-2    w-full  " >



                  <p className=" flex  text-xs text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 32 32">
                      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <circle cx="16" cy="11" r="4" />
                        <path d="M24 15c-3 7-8 15-8 15s-5-8-8-15s2-13 8-13s11 6 8 13" />
                      </g>
                    </svg>
                    {company.address}</p>

                </div>

              </div>
            </div>

            <p className="text-xs text-justify  mt-2 mx-4 text-gray-500">
              {company?.description ||
                "This company provides innovative solutions and services, helping clients achieve growth and success across various industries."}
            </p>
            <div className="text-sm items-end justify-end-safe w-full mt-1 flex   gap-2 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512">
                <path fill="currentColor" d="M459.26 96L328 225.7V96h-34.525L168 223.267V16H16v480h480V96ZM464 464H48V48h88v216h36.778L296 139.018V264h38.764L464 136.3Z" />
                <path fill="currentColor" d="M136 328v8h32v-32h-32zm0 48h32v32h-32zm80-48v8h32v-32h-32zm0 48h32v32h-32zm80-48v8h32v-32h-32zm0 48h32v32h-32zm80-72h32v32h-32zm0 72h32v32h-32z" />
              </svg>
              {company.industry}</div>




            <div className="flex   w-full justify-end gap-2 px-4 mt-4">
              <button
                onClick={() => navigate(`/companies/${company._id}/edit`)}
                className="flex items-center gap-1 rounded-md border border-green-600 px-3 py-1 text-sm  text-green-600 hover:text-white hover:bg-green-600"
              >
                <FaEdit className="text-sm" /> Edit
              </button>
              <button
                onClick={() => openModal(company.id)}
                className="flex items-center gap-1 rounded-md border border-red-600 px-3 py-1 text-sm text-red-600 hover:text-white hover:bg-red-600"
              >
                <FaTrash className="text-sm" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>


      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 rounded-lg border disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}


      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this company?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

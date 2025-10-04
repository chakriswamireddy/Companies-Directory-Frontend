import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBuilding, FaIndustry, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";

export default function CompanyForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", industry: "", location: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchCompany = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`http://localhost:5000/api/companies/${id}`);
          setForm({
            name: data.name || "",
            industry: data.industry || "",
            location: data.location || "",
          });
        } catch (err) {
          console.error("Error fetching company:", err);
          alert("Failed to fetch company data");
        } finally {
          setLoading(false);
        }
      };
      fetchCompany();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await axios.put(`http://localhost:5000/api/companies/${id}`, form);
      } else {
        await axios.post("http://localhost:5000/api/companies", form);
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form.name && id)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
        <p className="mt-3 text-gray-600 font-medium">Loading company data...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transition-all"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-1 text-center">
          {id ? "Edit Company" : "Add New Company"}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          {id
            ? "Update your company's information below."
            : "Fill out the details to add a new company."}
        </p>
 
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-200">
            <FaBuilding className="text-gray-400 mr-2" />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. TechNova Solutions"
              className="w-full outline-none text-gray-800"
              required
            />
          </div>
        </div>

         
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-200">
            <FaIndustry className="text-gray-400 mr-2" />
            <input
              name="industry"
              value={form.industry}
              onChange={handleChange}
              placeholder="e.g. Software, Finance, Healthcare"
              className="w-full outline-none text-gray-800"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-200">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Hyderabad, India"
              className="w-full outline-none text-gray-800"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-medium text-white transition-all ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <FaSpinner className="animate-spin" />
              {id ? "Updating..." : "Adding..."}
            </div>
          ) : (
            <>{id ? "Update Company" : "Add Company"}</>
          )}
        </button>
      </form>
    </div>
  );
}

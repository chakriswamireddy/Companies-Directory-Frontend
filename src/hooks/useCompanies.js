import { useState, useEffect } from "react";
import axios from "axios";

export default function useCompanies(filters) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/companies", {
        params: filters,
      });
      setCompanies(data);
    } catch (err) {
      console.error("Error fetching companies:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCompanies();
  }, [filters]);

  return { companies, loading, fetchCompanies };
}

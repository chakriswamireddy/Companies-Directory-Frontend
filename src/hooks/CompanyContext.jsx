import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CompanyContext = createContext();

export const useCompanyContext = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

 
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 5;

 
  const [sortOrder, setSortOrder] = useState("asc");

  const [industries, setIndustries] = useState([]);
  const [locations, setLocations] = useState([]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://api.mydummyapi.com/categories/business");
      setCompanies(data);
      setFilteredCompanies(data);

      const uniqueIndustries = [...new Set(data.map((c) => c.industry))].filter(Boolean);
      const uniqueLocations = [...new Set(data.map((c) => c.location))].filter(Boolean);

      setIndustries(uniqueIndustries);
      setLocations(uniqueLocations);
    } catch (err) {
      console.error("Error fetching companies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = companies.filter((company) => {
      const matchesName = company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = selectedIndustry ? company.industry === selectedIndustry : true;
      const matchesLocation = selectedLocation ? company.location === selectedLocation : true;
      return matchesName && matchesIndustry && matchesLocation;
    });

    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    setFilteredCompanies(filtered);
    setCurrentPage(1);  
  }, [companies, searchTerm, selectedIndustry, selectedLocation, sortOrder]);

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  return (
    <CompanyContext.Provider
      value={{
        companies: currentCompanies,
        fetchCompanies,
        loading,
        searchTerm,
        setSearchTerm,
        selectedIndustry,
        setSelectedIndustry,
        selectedLocation,
        setSelectedLocation,
        industries,
        locations,
        currentPage,
        setCurrentPage,
        totalPages,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

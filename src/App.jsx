import { useState } from 'react'

import './App.css'

import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyForm from './components/CompanyForm'
import { CompanyProvider } from './hooks/CompanyContext'
import { Toaster } from 'sonner';



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyProvider>

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies/new" element={<CompanyForm />} />
            <Route path="/companies/:id/edit" element={<CompanyForm />} />
          </Routes>
        </Router>
        <Toaster richColors />
      </CompanyProvider>
    </div>
  )
}

export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Dashboard from "../routes/admin/Dashboard";

function Admin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Admin;

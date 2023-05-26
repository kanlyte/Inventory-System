import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../components/404";
import Login from "../components/Login";
import Dashboard from "../routes/admin/Dashboard";

function Admin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Admin;

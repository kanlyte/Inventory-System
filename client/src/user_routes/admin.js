import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../components/404";
import Login from "../components/Login";
import Dashboard from "../routes/admin/Dashboard";
import AllProducts from "../routes/admin/AllProducts";
import NewSeller from "../routes/admin/NewSeller";
import Sales from "../routes/admin/Sales";

function Admin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/allusers" element={<NewSeller />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Admin;

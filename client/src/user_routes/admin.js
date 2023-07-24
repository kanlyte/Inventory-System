import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../components/404";
import Login from "../components/Login";
import Dashboard from "../routes/admin/Dashboard";
import NewSeller from "../routes/admin/NewSeller";
import NewProduct from "../routes/admin/NewProduct";
import Products from "../routes/admin/Products";
import EditProduct from "../routes/admin/EditProduct";
import NewPurchase from "../routes/admin/NewPurchase";
import NewSupplier from "../routes/admin/NewSupplier";
import NewSale from "../routes/admin/NewSale";
import FinanceSummary from "../routes/admin/FinaceSummary";

function Admin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allproducts" element={<Products />} />
        <Route path="/allusers" element={<NewSeller />} />
        <Route path="/new-sales" element={<NewSale />} />
        <Route path="/finace-summary" element={<FinanceSummary />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/new-purchase" element={<NewPurchase />} />
        <Route path="/new-supplier" element={<NewSupplier />} />
        <Route path="/edit-product" element={<EditProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Admin;

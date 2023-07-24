import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../components/404";
import Dashboard from "../routes/seller/Dashboard";
import Products from "../routes/seller/Products";
import Settings from "../routes/seller/components/settings";
import NewProduct from "../routes/seller/NewProduct";
import NewPurchase from "../routes/seller/NewPurchase";

function Seller() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/newsale" element={<NewSale />} /> */}
        <Route path="/new-purchase" element={<NewPurchase />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Seller;

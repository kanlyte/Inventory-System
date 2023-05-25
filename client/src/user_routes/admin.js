import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "psl/src/routes/admin/Dashboard";

function Admin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Admin;

import { useEffect } from "react";
import "./App.css";
import "line-awesome/dist/line-awesome/css/line-awesome.css";
import Admin from "./user_routes/admin";
import Seller from "./user_routes/seller";
import user from "./app_config";
import Login from "./components/Login";

const App = () =>
  user.user_role === "admin" ? (
    <Admin />
  ) : user.user_role === "seller" ? (
    <Seller />
  ) : (
    <Login />
  );
export default App;

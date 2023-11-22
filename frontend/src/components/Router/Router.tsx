import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import Login from '../../pages/Login/Login';
import Register from "../../pages/Register/Register";
import Home from "../../pages/Home/Home";
import { AuthenticationService } from "../../services/AuthenticationService";
import { Dashboard } from "../../pages/Dashboard/Dashboard";
import { Products } from "../../pages/Products/Products";

export const AllRoutes = () => {
  const user = AuthenticationService.getUser();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Routes>
      {user?.id && (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/produtos" element={<Products />} />
        </Routes>
      )}
    </Router>
  );
};

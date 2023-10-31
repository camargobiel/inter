import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';

import Login from './pages/Login/Login';
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="register" element={<Register />} /> {/* Register page */}
                <Route path="login" element={<Login />} /> {/* Register page */}
            </Route>
        </Routes>
    );
}

export default AppRoutes;
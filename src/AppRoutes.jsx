import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import RegisteredEvent from "./pages/Registered Event.jsx";
import MyEvents from "./pages/MyEvents.jsx";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import AddEvent from "./pages/auth/AddEvent.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<RegisteredEvent />} />
                <Route path="contact" element={<MyEvents />} />
                <Route path="register" element={<Register />} /> {/* Register page */}
                <Route path="login" element={<Login />} /> {/* Register page */}
                <Route path="AddEvent" element={<AddEvent />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
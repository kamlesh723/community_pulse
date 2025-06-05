import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { isLoggedIn } from "./API/API.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import MyEvents from "./pages/MyEvents.jsx";
import PrivateLayout from "./components/PrivateLayout.jsx";
import Home from "./pages/Home.jsx";
import OTPVerification from "./pages/auth/OTPVerification.jsx";
import AddEvent from "./pages/auth/AddEvent.jsx";
import EventDetails from "./pages/EventDetails.jsx";


import CheckoutForm from "./pages/CheckoutForm.jsx";
import ReportIssuePage from "./pages/issue/ReportIssuePage.jsx"; //

const PrivateRoute = ({ element }) => {
    return isLoggedIn() ? element : <Navigate to="/home" />;
};

const PublicRoute = ({ element }) => {
    return isLoggedIn() ? <Navigate to="/" /> : element;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Public routes */}
                <Route index element={<PrivateRoute element={<MyEvents />} />} />
                <Route path="" element={<PublicRoute element={<Home />} />} />
                <Route path="home" element={<PublicRoute element={<Home />} />} />
                <Route path="login" element={<PublicRoute element={<Login />} />} />
                <Route path="register" element={<PublicRoute element={<Register />} />} />
                <Route path="/otp-verification" element={<OTPVerification />} />
                <Route path="/event/:id" element={<EventDetails />} />

                {/* Private routes */}
                <Route element={<PrivateRoute element={<PrivateLayout />} />}>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="dashboard" element={<MyEvents />} />
                    <Route path="checkout" element={<PrivateRoute element={<CheckoutForm />} />} />
                    <Route path="/report" element={<ReportIssuePage />} />
                    <Route path="/add-event" element={<AddEvent />} />

                </Route>

                {/* Catch-all fallback */}
                <Route
                    path="*"
                    element={<Navigate to={isLoggedIn() ? "/dashboard" : "/home"} />}
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;

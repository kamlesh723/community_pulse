import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AppRoutes from "./AppRoutes";

const stripePromise = loadStripe("pk_test_51RWM1KEHxsALlKnCJnAqs7T2YqiIPPIuwHKiJuXYpAJe7tRljvR1W6zLVKdprtFfxhi3ZQY5xBCZ8FAyhFtnzMX600P4L0PhYH");

function App() {
    return (
        <Elements stripe={stripePromise}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </Elements>
    );
}

export default App;

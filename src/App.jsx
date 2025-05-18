import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Home from "./pages/Home.jsx";

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;

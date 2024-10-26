import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import NotFound from "./pages/NotFound"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact Component={LandingPage}/>
                <Route Component={NotFound} />
                <Route path="/login" exact Component={LoginPage} />
                <Route path="/register" exact Component={RegisterPage} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
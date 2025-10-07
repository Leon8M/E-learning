import React, { createContext, useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import httpClient from "./httpClient";

// Create an Auth Context
export const AuthContext = createContext(null);

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return user ? children : null; // Render children if authenticated, otherwise null (redirect handled by useEffect)
};

const Router = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (token) {
                    const response = await httpClient.get('/auth/@me');
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                localStorage.removeItem('access_token');
                // localStorage.removeItem('refresh_token'); // If using refresh tokens
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    
                    {/* Protected Routes */}
                    <Route path="/" element={<PrivateRoute><LandingPage /></PrivateRoute>} />
                    {/* Add other protected routes here */}
                    {/* <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} /> */}

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default Router;

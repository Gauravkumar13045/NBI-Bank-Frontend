import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/me",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);


    if (isAuthenticated === null) {
        return <div>Checking authentication...</div>;
    }


    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }


    return children;
}

export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/auth";


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user ,loading } = useAuth();
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {user ? children : <Navigate to="/login" />}
        </>
    );
};
export default ProtectedRoute;
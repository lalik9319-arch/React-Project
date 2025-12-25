import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/auth";
import type { FC } from "react";
interface RoleProps {
    children?: React.ReactNode;
    roles: string[];
}
const Role: FC<RoleProps> = ({ children, roles }) => {
    const { user } = useAuth();
    if (!roles.includes(user?.role || ""))
        return <Navigate to="/login" replace />;
    return <> {children}</>
}
export default Role;

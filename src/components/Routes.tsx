import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import { Register } from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import TicketList from "../pages/TicketList";
import TicketDetailsDialog from "../pages/TicketPopap";
import Role from "./Role";
import NewTicket from "../pages/NewTicket";
import AddPriority from "../pages/addPriority";
import AddStatus from "../pages/addStatus";
import CreateUser from "../pages/addUser";
import AllUsers from "../pages/allUsers";
import NotFound from "../pages/NotFound";

const route = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
            { path: "login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
            {
                path: '/tickets', element: <ProtectedRoute><TicketList /></ProtectedRoute>, children: [
                    { path: ":id", element: <TicketDetailsDialog /> },
                ]
            },
            { path: "/tickets/new", element: <ProtectedRoute><Role roles={["customer"]}><NewTicket /></Role></ProtectedRoute> },
            { path: "/addPriority", element: <ProtectedRoute><Role roles={["admin"]}><AddPriority /></Role></ProtectedRoute> },
            { path: '/addStatus', element: <ProtectedRoute><Role roles={["admin"]}><AddStatus /></Role></ProtectedRoute> },
            { path: '/addUser', element: <ProtectedRoute><Role roles={["admin"]}><CreateUser /></Role></ProtectedRoute> },
            { path: '/allUsers', element: <ProtectedRoute><Role roles={["admin"]}><AllUsers /></Role></ProtectedRoute> },
            { path: "*", element: <NotFound /> }

        ]
    }
]);

export default route;
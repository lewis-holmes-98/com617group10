import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Home from "./Home.jsx";
import Navbar from "./Navbar.jsx";

const AppLayout = () => {
    return <div className="">
        <Sidebar />
        <Outlet />
    </div>;
};

export default AppLayout;
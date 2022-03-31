import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const AppLayout = () => {
    return <div style={{
        padding: '50px 0px 0px 370px'
    }}>
        <Sidebar />
        <Outlet />
    </div>;
};

export default AppLayout;
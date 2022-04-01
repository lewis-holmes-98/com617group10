import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import BodyWrapper from "./BodyWrapper.jsx";
import Navbar from "./Navbar.jsx";

const AppLayout = ({children}) => {
    return (
        <BodyWrapper>
            <div className="position fixed">
                <Navbar />
            </div>
            <div className="flex h-screen bg-gray-200">
                <Sidebar />
                <Outlet />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <main className="content">
                        <section className="sm:flex-row flex flex-col flex-1">
                            <div
                                className="content-box"
                                style={{ flexGrow: 2, flexBasis: "0%" }}
                            >
                                {children}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </BodyWrapper>
    )
};

export default AppLayout;
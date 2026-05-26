import { Outlet } from "react-router";
import Sidebar from "./SideBar";
import "./MainLayout.css";

function MainLayout(){
    return(
    <div className="main-layout">
        <Sidebar />
      <main className="main-layout-content">
        <Outlet />
      </main>
    </div>
    )
    
}
export default MainLayout;
import { useLocation, useNavigate } from "react-router";
import { C, NAV_ITEMS } from "../utils/constants";
import "./SideBar.css";
function Sidebar () {

    let navigate = useNavigate()
    const location = useLocation()

    const isHome = location.pathname === '/';
    const isApiKey = location.pathname === '/ApiKey'

    const logoutHandler = ()=>{
        console.log("logging out ....")
    }

    return(
    <div className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
        <div className="sidebar-brand">
            Logr<span className="sidebar-brand-hint">.</span>io
        </div>
        <div className="sidebar-brand-subtitle">Dashboard</div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
            <div onClick={()=>{navigate('/')}} className={isHome ? "sidebar-nav-item active" : "sidebar-nav-item"}>
                <span>⬡</span>
                Applications
            </div>
             <div onClick={()=>{navigate('/apiKey')}} className={isApiKey ? "sidebar-nav-item active" : "sidebar-nav-item"}>
                <span>⌗</span>
                Api Key
            </div>
        </nav>

        {/* Logout */}
        <div className="sidebar-logout">
        <div onClick={logoutHandler} className="sidebar-logout-button">
            <span>↩</span> Logout
        </div>
        </div>
    </div>
  )
}

export default Sidebar
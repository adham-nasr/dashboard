import { useLocation, useNavigate } from "react-router";
import { C, NAV_ITEMS } from "../utils/constants";
import "./SideBar.css";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";
function Sidebar () {

    let navigate = useNavigate()
    const location = useLocation()

    const {logout,user} = useAuth()

    const isHome = location.pathname === '/';
    const isApiKey = location.pathname === '/apiKey'

    const logoutHandler = (e:Event)=>{
        e.preventDefault()
        console.log("logging .. ")
        logout(user?.apiKey || "")

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
        <div className="sidebar-logout-button">
            <Button onClick={logoutHandler}>
                <span>↩</span> Logout
            </Button>
        </div>
        </div>
    </div>
  )
}

export default Sidebar
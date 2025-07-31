import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHouse, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className='sidebar-expanded'>
      <div className="sidebar-logo-container">
        <img src={`${process.env.PUBLIC_URL}/Images/logo.png`} alt="Logo" className="sidebar-logo" />
      </div>
      <div className="menu">
        <Link to="/dashboard" style={{textDecoration:'none'}}>
          <div className={`menu-icon${pathname === '/dashboard' ? ' active' : ''}`}>
            <FontAwesomeIcon className="Calendar" icon={faHouse} />
            <span>Dashboard</span>
          </div>
        </Link>
        <Link to="/training-calendar" style={{textDecoration:'none'}}>
          <div className={`menu-icon${pathname === '/training-calendar' ? ' active' : ''}`}>
            <FontAwesomeIcon className="Calendar" icon={faCalendar} />
            <span>Calendar</span>
          </div>
        </Link>
      </div>
      <div className="sidebar-logout">
        <FontAwesomeIcon icon={faPowerOff} />
        <span>Logout</span>
      </div>
    </div>
  );
}
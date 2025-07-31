import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { BsCartCheckFill } from "react-icons/bs";
import { GiFruitBowl } from "react-icons/gi";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function TaimbaSidebar() {
  const { pathname } = useLocation();
  return (
    <div className='sidebar-expanded'>
      <div className="sidebar-logo-container">
        <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="Logo" className="sidebar-logo" />
      </div>
      <div className="menu">
        <Link to="/" style={{textDecoration:'none'}}>
          <div className={`menu-icon${pathname === '/' ? ' active' : ''}`}>
            <GiFruitBowl/>
            <span>Catalogue</span>
          </div>
        </Link>
        <Link to="/orders" style={{textDecoration:'none'}}>
          <div className={`menu-icon${pathname === '/orders' ? ' active' : ''}`}>
            <BsCartCheckFill />
            <span>Orders</span>
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
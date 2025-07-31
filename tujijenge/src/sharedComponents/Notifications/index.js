import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const NotificationItem = ({ message }) => {
  return <div className="list">{message}</div>;
};

const NotificationDropdown = React.forwardRef(({ notifications, isOpen }, ref) => {
  if (!isOpen) return null;
  return (
    <div className="dropdown" ref={ref}>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <NotificationItem key={index} message={notification.message} />
        ))
      ) : (
        <div>No new notifications</div>
      )}
    </div>
  );
});

export default function Notification({ notifications = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef(null);
  const bellRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let handleClickOutside;
    if (isOpen) {
       handleClickOutside = (event) => {
        if (
          notificationRef.current &&
          !notificationRef.current.contains(event.target) &&
          bellRef.current &&
          !bellRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    }

  }, [isOpen]);

  return (
    <div className="bell-and-badge">
      <button onClick={toggleDropdown} ref={bellRef}>
        <FontAwesomeIcon className="bell" icon={faBell} />
        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span>
        )}
      </button>
      <NotificationDropdown
        notifications={notifications}
        isOpen={isOpen}
        ref={notificationRef}
      />
    </div>
  );
}
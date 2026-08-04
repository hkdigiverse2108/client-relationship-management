import React, { useRef, useEffect, useState } from "react";
import { FiBell, FiCheck, FiInfo, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useNotifications } from "@/context/NotificationContext";
import { timeAgo } from "@/utils/formatters";
import "./NotificationDropdown.css";

export default function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FiCheckCircle className="notif-icon notif-success" />;
      case "warning":
        return <FiAlertCircle className="notif-icon notif-warning" />;
      case "error":
        return <FiAlertCircle className="notif-icon notif-error" />;
      default:
        return <FiInfo className="notif-icon notif-info" />;
    }
  };

  const handleNotificationClick = (notif) => {
    if (!notif.is_read) {
      markAsRead(notif._id);
    }
    if (notif.link) {
      window.location.href = notif.link; // Or use navigate(notif.link) if you import useNavigate
    }
    setIsOpen(false);
  };

  return (
    <div className="notif-wrapper" ref={dropdownRef}>
      <button
        className="aio-header__icon-btn"
        aria-label="Notifications"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiBell />
        {unreadCount > 0 && (
          <span className="notif-badge">{unreadCount > 99 ? "99+" : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notif-dropdown fade-in">
          <div className="notif-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button className="notif-mark-all" onClick={markAllAsRead}>
                <FiCheck /> Mark all as read
              </button>
            )}
          </div>

          <div className="notif-body">
            {notifications.length === 0 ? (
              <div className="notif-empty">
                <FiBell className="notif-empty-icon" />
                <p>You're all caught up!</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`notif-item ${!notif.is_read ? "is-unread" : ""}`}
                  onClick={() => handleNotificationClick(notif)}
                >
                  <div className="notif-item-icon">{getIcon(notif.type)}</div>
                  <div className="notif-item-content">
                    <div className="notif-item-title">{notif.title}</div>
                    <div className="notif-item-message">{notif.message}</div>
                    <div className="notif-item-time">{timeAgo(notif.created_at)}</div>
                  </div>
                  {!notif.is_read && <div className="notif-item-dot" />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================
   Notification Component
   - Toast-style notification popup
   - Shows success, info, or error messages
   - Auto-dismisses after a few seconds
   ============================================ */

import { useAppContext } from "../context/AppContext";

const Notification = () => {
  const { notification } = useAppContext();

  // Don't render if no notification is active
  if (!notification) return null;

  return (
    <div className={`notification notification--${notification.type}`} id="notification-toast">
      <span className="notification__icon">
        {notification.type === "success" && "✅"}
        {notification.type === "error" && "❌"}
        {notification.type === "info" && "ℹ️"}
      </span>
      <p className="notification__message">{notification.message}</p>
    </div>
  );
};

export default Notification;

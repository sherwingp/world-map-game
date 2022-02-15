import { useContext } from "react";
import NotificationContext from "../contexts/notification";

const Notification = () => {
  const { notification } = useContext(NotificationContext);
  return (
    <div className="messageBox">
      <h4 className="message">{notification}</h4>
    </div>
  );
};

export default Notification;

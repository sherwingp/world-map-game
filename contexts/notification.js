import { createContext, useState, useMemo } from "react";

const NotificationContext = createContext({
  notification: "",
  setNotification: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState("");
  const value = useMemo(
    () => ({ notification, setNotification }),
    [notification]
  );
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

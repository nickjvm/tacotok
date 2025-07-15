"use client";

import cn from "@/utils/cn";
import { createContext, useContext, useState } from "react";

type Notification = {
  id: string;
  title?: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  timeout?: number;
};
type NotificationContext = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => string;
  removeNotification: (id: string) => void;
};

const NotificationContext = createContext<NotificationContext | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = crypto.randomUUID();
    setNotifications((prev) => [...prev, { ...notification, id }]);

    setTimeout(() => {
      removeNotification(id);
    }, notification.timeout ?? 5000);

    return id;
  };
  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };
  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
      {notifications.length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 z-100 flex flex-col gap-2 items-center justify-center">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              role="alert"
              aria-live="assertive"
              className={cn(
                "p-4 rounded shadow min-w-1/2 max-w-[90vw] text-center",
                "bg-blue-50 border border-blue-200 text-blue-800",
                notification.type === "success" &&
                  "bg-green-50 border border-green-200 text-green-800",
                notification.type === "error" &&
                  "bg-red-50 border border-red-200 text-red-800",
                notification.type === "warning" &&
                  "bg-yellow-50 border border-yellow-200 text-yellow-800"
              )}
            >
              {notification.title && (
                <span className="font-bold">{notification.title} </span>
              )}
              <span>{notification.message}</span>
            </div>
          ))}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

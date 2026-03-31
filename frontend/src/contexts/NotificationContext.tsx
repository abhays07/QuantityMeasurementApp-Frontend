import React, { createContext, useState, useCallback } from 'react';
import type { Notification, NotificationType } from '../types';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: NotificationType, duration?: number) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: React.ReactNode;
}

const DEFAULT_DURATION = 5000; // 5 seconds

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: NotificationType, duration?: number): string => {
      const id = Math.random().toString(36).substr(2, 9);

      setNotifications((prev) => [
        ...prev,
        {
          id,
          message,
          type,
          duration: duration ?? DEFAULT_DURATION,
        },
      ]);

      // Auto-remove after duration
      if (duration !== 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration ?? DEFAULT_DURATION);

        return id;
      }

      return id;
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const success = useCallback(
    (message: string, duration?: number) => addNotification(message, 'success', duration),
    [addNotification]
  );

  const error = useCallback(
    (message: string, duration?: number) => addNotification(message, 'error', duration),
    [addNotification]
  );

  const warning = useCallback(
    (message: string, duration?: number) => addNotification(message, 'warning', duration),
    [addNotification]
  );

  const info = useCallback(
    (message: string, duration?: number) => addNotification(message, 'info', duration),
    [addNotification]
  );

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
  };

  return (
    <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
  );
};

NotificationProvider.displayName = 'NotificationProvider';

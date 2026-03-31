import React from 'react';
import { useNotification } from '../../hooks/useNotification';
import { Alert } from './Alert';

export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          type={notification.type}
          closeable
          onClose={() => removeNotification(notification.id)}
        >
          {notification.message}
        </Alert>
      ))}
    </div>
  );
};

NotificationContainer.displayName = 'NotificationContainer';

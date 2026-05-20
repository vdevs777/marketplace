import { useEffect } from "react";
import { localNotificationsService } from "../services/local-notifications.service";
import * as Notifications from "expo-notifications";
import { Linking } from "react-native";

export const useNotifications = () => {
  useEffect(() => {
    localNotificationsService.requestPermissions();
    localNotificationsService.setupNotificationChannel();

    const lastResponse = Notifications.getLastNotificationResponse();

    if (lastResponse) {
      const deeplink = lastResponse.notification.request.content.data?.deepLink;

      if (deeplink && typeof deeplink === "string") {
        Linking.openURL(deeplink);
      }
    }

    Notifications.addNotificationResponseReceivedListener((response) => {
      const deeplink = response.notification.request.content.data?.deepLink;

      if (deeplink && typeof deeplink === "string") {
        Linking.openURL(deeplink);
      }
    });
  }, []);
};

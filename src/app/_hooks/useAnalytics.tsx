import { useEffect } from "react";

function useAnalytics() {
  const isDevelopment = process.env.APP_ENV === "development";

  function trackEvent(eventName: string, tags: Record<string, string> = {}) {
    const allTags = {
      enviroment: process.env.APP_ENV,
      app: process.env.APP_NAME,
      ...tags,
    };
    // todo - add tracking

    if (isDevelopment) {
      console.log("tracked", eventName, allTags);
    }
  }

  return { trackEvent };
}

export default useAnalytics;

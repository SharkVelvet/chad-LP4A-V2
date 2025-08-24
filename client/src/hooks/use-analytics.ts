import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { analytics } from '@/lib/analytics';

// Hook to automatically track page views on route changes
export function useAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    // Track page view when location changes
    analytics.trackPageView();
  }, [location]);

  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackFormSubmission: analytics.trackFormSubmission.bind(analytics),
    trackButtonClick: analytics.trackButtonClick.bind(analytics),
    trackExternalLink: analytics.trackExternalLink.bind(analytics),
  };
}
import { apiRequest } from "./queryClient";

// Generate a session ID that persists for the browser session
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

// Get user ID if available (from login state)
function getUserId(): string | null {
  // This could be enhanced to get actual user ID from auth context
  return localStorage.getItem('user_id') || null;
}

// Get basic browser information instead of external geolocation
function getBrowserInfo(): { timezone?: string; language?: string } {
  try {
    return {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language
    };
  } catch (error) {
    return {};
  }
}

interface AnalyticsEvent {
  sessionId: string;
  userId?: string;
  eventType: string;
  eventData?: Record<string, any>;
  url: string;
  referrer?: string;
}

interface SEOData {
  url: string;
  pageTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  searchQuery?: string;
  referrer?: string;
  organicTraffic?: boolean;
}

export class Analytics {
  private sessionId: string;
  private userId: string | null;
  private isEnabled: boolean = true;

  constructor() {
    this.sessionId = getSessionId();
    this.userId = getUserId();
  }

  // Track page view
  async trackPageView(url?: string) {
    if (!this.isEnabled) return;

    const currentUrl = url || window.location.pathname + window.location.search;
    const browserInfo = getBrowserInfo();

    const event: AnalyticsEvent = {
      sessionId: this.sessionId,
      userId: this.userId || undefined,
      eventType: 'page_view',
      url: currentUrl,
      referrer: document.referrer || undefined,
    };

    try {
      const response = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          eventData: {
            userAgent: navigator.userAgent,
            ...browserInfo,
          },
        }),
      });
      
      if (!response.ok) {
        console.warn('Failed to track page view:', response.statusText);
      }
    } catch (error) {
      console.warn('Failed to track page view:', error);
    }

    // Also track SEO data for the page
    this.trackSEOData(currentUrl);
  }

  // Track custom events (clicks, form submissions, etc.)
  async trackEvent(eventType: string, eventData?: Record<string, any>, url?: string) {
    if (!this.isEnabled) return;

    const currentUrl = url || window.location.pathname + window.location.search;

    const event: AnalyticsEvent = {
      sessionId: this.sessionId,
      userId: this.userId || undefined,
      eventType,
      url: currentUrl,
      referrer: document.referrer || undefined,
      eventData,
    };

    try {
      const response = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      
      if (!response.ok) {
        console.warn('Failed to track event:', response.statusText);
      }
    } catch (error) {
      console.warn('Failed to track event:', error);
    }
  }

  // Track SEO data
  async trackSEOData(url?: string) {
    if (!this.isEnabled) return;

    const currentUrl = url || window.location.pathname + window.location.search;
    const referrer = document.referrer;
    
    // Extract SEO data from the page
    const pageTitle = document.title;
    const metaDescription = (document.querySelector('meta[name="description"]') as HTMLMetaElement)?.content;
    const metaKeywords = (document.querySelector('meta[name="keywords"]') as HTMLMetaElement)?.content;
    
    // Parse search query from referrer
    let searchQuery: string | undefined;
    let organicTraffic = false;
    
    if (referrer) {
      const referrerUrl = new URL(referrer);
      const searchEngines = ['google.com', 'bing.com', 'yahoo.com', 'duckduckgo.com'];
      
      if (searchEngines.some(engine => referrerUrl.hostname.includes(engine))) {
        organicTraffic = true;
        searchQuery = referrerUrl.searchParams.get('q') || 
                     referrerUrl.searchParams.get('query') || 
                     referrerUrl.searchParams.get('p') || undefined;
      }
    }

    const seoData: SEOData = {
      url: currentUrl,
      pageTitle,
      metaDescription,
      keywords: metaKeywords ? metaKeywords.split(',').map(k => k.trim()) : undefined,
      searchQuery,
      referrer: referrer || undefined,
      organicTraffic,
    };

    try {
      const response = await fetch('/api/seo/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(seoData),
      });
      
      if (!response.ok) {
        console.warn('Failed to track SEO data:', response.statusText);
      }
    } catch (error) {
      console.warn('Failed to track SEO data:', error);
    }
  }

  // Track form submission
  async trackFormSubmission(formType: string, formData?: Record<string, any>) {
    return this.trackEvent('form_submission', {
      formType,
      ...formData,
    });
  }

  // Track button clicks
  async trackButtonClick(buttonText: string, buttonType?: string) {
    return this.trackEvent('button_click', {
      buttonText,
      buttonType,
    });
  }

  // Track external link clicks
  async trackExternalLink(url: string) {
    return this.trackEvent('external_link_click', {
      externalUrl: url,
    });
  }

  // Disable analytics (for privacy compliance)
  disable() {
    this.isEnabled = false;
  }

  // Enable analytics
  enable() {
    this.isEnabled = true;
  }
}

// Global analytics instance
export const analytics = new Analytics();

// Auto-track page views on navigation (for SPAs)
let currentPath = window.location.pathname;
const observer = new MutationObserver(() => {
  if (window.location.pathname !== currentPath) {
    currentPath = window.location.pathname;
    analytics.trackPageView();
  }
});

// Start observing DOM changes for SPA navigation
observer.observe(document, { subtree: true, childList: true });

// Track initial page load
analytics.trackPageView();
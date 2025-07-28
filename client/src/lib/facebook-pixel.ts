// Facebook Pixel tracking utilities
declare global {
  interface Window {
    fbq: any;
    FACEBOOK_PIXEL_ID?: string;
  }
}

// Initialize Facebook Pixel with environment variable
export const initFacebookPixel = async () => {
  try {
    // Fetch Facebook Pixel ID from server
    const response = await fetch('/api/facebook-pixel-id');
    const data = await response.json();
    const pixelId = data.pixelId;
    
    if (!pixelId) {
      console.warn('Facebook Pixel ID not found or not configured');
      return false;
    }

    // Set the pixel ID globally
    window.FACEBOOK_PIXEL_ID = pixelId;

    // Initialize pixel if fbq is available
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    }
    
    // Update noscript fallback image
    const noscriptImg = document.getElementById('fb-pixel-noscript') as HTMLImageElement;
    if (noscriptImg) {
      noscriptImg.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    }
    
    return true;
  } catch (error) {
    console.warn('Failed to initialize Facebook Pixel:', error);
    return false;
  }
};

// Track custom events
export const trackFacebookEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Track standard events with custom parameters
export const trackViewContent = (contentType: string, contentIds?: string[]) => {
  trackFacebookEvent('ViewContent', {
    content_type: contentType,
    content_ids: contentIds,
  });
};

export const trackLead = (value?: number, currency?: string) => {
  trackFacebookEvent('Lead', {
    value: value,
    currency: currency || 'USD',
  });
};

export const trackInitiateCheckout = (value?: number, currency?: string) => {
  trackFacebookEvent('InitiateCheckout', {
    value: value,
    currency: currency || 'USD',
  });
};

export const trackPurchase = (value: number, currency?: string, contentIds?: string[]) => {
  trackFacebookEvent('Purchase', {
    value: value,
    currency: currency || 'USD',
    content_ids: contentIds,
  });
};

// Custom events for insurance landing page flow
export const trackTemplateView = (templateName: string) => {
  trackViewContent('template', [templateName]);
};

export const trackTemplateSelection = (templateName: string) => {
  trackFacebookEvent('TemplateSelected', {
    template_name: templateName,
    content_type: 'template',
  });
};

export const trackPricingView = () => {
  trackViewContent('pricing');
};

export const trackContactFormSubmit = () => {
  trackLead();
};

export const trackPaymentInitiation = (planType: string, value: number) => {
  trackInitiateCheckout(value);
  trackFacebookEvent('PaymentInitiated', {
    plan_type: planType,
    value: value,
    currency: 'USD',
  });
};

export const trackSuccessfulPurchase = (planType: string, value: number) => {
  trackPurchase(value, 'USD', [planType]);
  trackFacebookEvent('SubscriptionCreated', {
    plan_type: planType,
    value: value,
    currency: 'USD',
  });
};
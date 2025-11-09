/**
 * Vercel Domains API Service
 * 
 * Manages custom domains programmatically via Vercel's REST API
 * Docs: https://vercel.com/docs/rest-api#endpoints/domains
 */

const VERCEL_API = 'https://api.vercel.com';
const VERCEL_TOKEN = process.env.VERCEL_API_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

interface VercelDomainResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string;
  redirectStatusCode?: number;
  gitBranch?: string;
  updatedAt: number;
  createdAt: number;
  verified: boolean;
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

interface VercelDomainConfig {
  name: string;
  gitBranch?: string;
  redirect?: string;
  redirectStatusCode?: number;
}

export class VercelService {
  private apiToken: string;
  private projectId: string;

  constructor(apiToken?: string, projectId?: string) {
    this.apiToken = apiToken || VERCEL_TOKEN || '';
    this.projectId = projectId || VERCEL_PROJECT_ID || '';
    
    if (!this.apiToken) {
      console.warn('VERCEL_API_TOKEN not set - domain management disabled');
    }
    if (!this.projectId) {
      console.warn('VERCEL_PROJECT_ID not set - domain management disabled');
    }
  }

  /**
   * Add a custom domain to the Vercel project
   */
  async addDomain(domainName: string, config?: Partial<VercelDomainConfig>): Promise<VercelDomainResponse> {
    if (!this.apiToken || !this.projectId) {
      throw new Error('Vercel API credentials not configured');
    }

    const response = await fetch(
      `${VERCEL_API}/v10/projects/${this.projectId}/domains`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: domainName,
          ...config,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to add domain: ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  /**
   * Get domain information and verification status
   */
  async getDomain(domainName: string): Promise<VercelDomainResponse> {
    if (!this.apiToken || !this.projectId) {
      throw new Error('Vercel API credentials not configured');
    }

    const response = await fetch(
      `${VERCEL_API}/v9/projects/${this.projectId}/domains/${domainName}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to get domain: ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  /**
   * Remove a domain from the Vercel project
   */
  async removeDomain(domainName: string): Promise<void> {
    if (!this.apiToken || !this.projectId) {
      throw new Error('Vercel API credentials not configured');
    }

    const response = await fetch(
      `${VERCEL_API}/v9/projects/${this.projectId}/domains/${domainName}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to remove domain: ${JSON.stringify(error)}`);
    }
  }

  /**
   * List all domains in the project
   */
  async listDomains(): Promise<VercelDomainResponse[]> {
    if (!this.apiToken || !this.projectId) {
      throw new Error('Vercel API credentials not configured');
    }

    const response = await fetch(
      `${VERCEL_API}/v9/projects/${this.projectId}/domains`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to list domains: ${JSON.stringify(error)}`);
    }

    const result = await response.json();
    return result.domains || [];
  }

  /**
   * Verify domain ownership
   */
  async verifyDomain(domainName: string): Promise<VercelDomainResponse> {
    if (!this.apiToken || !this.projectId) {
      throw new Error('Vercel API credentials not configured');
    }

    const response = await fetch(
      `${VERCEL_API}/v9/projects/${this.projectId}/domains/${domainName}/verify`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to verify domain: ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  /**
   * Get DNS records that customer needs to configure
   */
  getDNSInstructions(domainName: string): {
    type: string;
    name: string;
    value: string;
    description: string;
  }[] {
    // Vercel's standard DNS configuration
    return [
      {
        type: 'A',
        name: '@',
        value: '76.76.21.21',
        description: 'Point your domain to Vercel',
      },
      {
        type: 'CNAME',
        name: 'www',
        value: 'cname.vercel-dns.com',
        description: 'Point www subdomain to Vercel',
      },
    ];
  }

  /**
   * Check if domain is verified and SSL is ready
   */
  async isDomainReady(domainName: string): Promise<boolean> {
    try {
      const domain = await this.getDomain(domainName);
      return domain.verified;
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
export const vercelService = new VercelService();

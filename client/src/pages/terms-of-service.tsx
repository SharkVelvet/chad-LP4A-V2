import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function TermsOfService() {
  const [, setLocation] = useLocation();

  // Set page title
  useEffect(() => {
    document.title = 'Terms of Service - Professional Landing Pages for Insurance Agents';
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col bg-gray-50">
      {/* Header Menu */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo on Left */}
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setLocation('/')}
            >
              <FileText className="h-8 w-8 mr-3" style={{ color: '#6458AF' }} />
              <div className="text-left">
                <div className="text-xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                <div className="text-xs font-medium text-gray-600" style={{ letterSpacing: '0.15em' }}>for Agents</div>
              </div>
            </div>

            {/* Menu Items in Middle */}
            <nav className="hidden md:flex items-center space-x-8">
              <a onClick={() => setLocation('/choose-purpose')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">View Templates</a>
              <a onClick={() => setLocation('/custom-websites')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Custom Pages</a>
              <a onClick={() => setLocation('/other-services')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Other Services</a>
              <a onClick={() => setLocation('/pricing')} className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer">Pricing</a>
            </nav>

            {/* Get Started Button on Right */}
            <Button 
              className="px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity rounded-full"
              style={{ backgroundColor: '#6458AF' }}
              onClick={() => setLocation('/choose-purpose')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Terms of Service Content */}
      <div className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">
              Effective Date: January 1, 2025
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Website: <a href="https://www.landingpagesforagents.com" className="text-purple-600 hover:underline">https://www.landingpagesforagents.com</a>
            </p>
            <p className="text-sm text-gray-500">
              Company: Landing Pages for Agents, LLC ("we," "our," "us")
            </p>
          </div>

          {/* Terms Content */}
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-8">
            
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using LandingPagesForAgents.com ("the Site") and any of our products or services, you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not agree with any part of these Terms, you should not use our Site or services.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Landing Pages for Agents provides page templates, design services, and related marketing tools for insurance agents and agencies. Our services include pre-designed templates, hosting, domain setup, business email, and optional custom page development.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content appearing on our sample templates is placeholder or "filler" content, intended only as an example. It is the client's sole responsibility to replace all placeholder content with accurate, truthful, and compliant information relevant to their business, services, and licensing.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Clients are solely responsible for the accuracy, legality, and truthfulness of all information, testimonials, claims, or representations displayed on their website or landing page. Landing Pages for Agents does not verify, approve, or guarantee the accuracy of any content provided by clients or third parties, and any misuse, false advertising, or violation of law arising from client use is the full responsibility of the client. Clients agree to indemnify and hold harmless Landing Pages for Agents from any claims, losses, liabilities, or damages resulting from the use or misuse of their site or content.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Subscription Terms and Payment</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All subscriptions through Landing Pages for Agents are twelve (12) month agreements beginning on the date of the initial payment. By subscribing, you agree to maintain your subscription for the full twelve-month term.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                If your subscription is canceled or terminated before the end of the twelve-month period, Landing Pages for Agents reserves the right to bill you for the remaining balance of the term. Subscriptions automatically renew at the end of the twelve-month period unless canceled in writing before renewal. Early cancellation does not relieve you of your obligation to pay the full amount owed under the agreement.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                All payments are securely processed through trusted third-party payment vendors such as Stripe. Landing Pages for Agents does not store or have access to your credit card or financial information.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By purchasing a subscription or service, you authorize Landing Pages for Agents to automatically charge your designated payment method for subscription renewals, outstanding balances, or remaining months in the event of early cancellation. All payments are final and non-refundable except as required by law.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Intellectual Property and Limitations of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All page designs, templates, and materials created by Landing Pages for Agents remain our intellectual property unless otherwise agreed upon in writing. Clients are granted a limited, non-exclusive, non-transferable license to use their purchased site or template for their own business operations.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may utilize third-party services such as Stripe, hosting providers, and domain registrars to support our platform, and we are not responsible for any interruptions, data loss, or errors caused by such third parties.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our services and materials are provided "as is" and "as available," without warranties of any kind, either express or implied. Landing Pages for Agents shall not be liable for any direct, indirect, incidental, consequential, or punitive damages resulting from the use or inability to use our Site or services, including but not limited to damages arising from inaccurate or misleading client content, technical issues, data interruptions, or third-party actions.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Termination and Modifications</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to suspend or terminate any account at our discretion if a client violates these Terms, misuses our intellectual property, or engages in unlawful activity. Upon termination, all outstanding payments under the twelve-month agreement remain due in full.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms may be updated or modified at any time without prior notice. The most recent version will always be available on our website, and continued use of our services constitutes acceptance of any updates or modifications.
              </p>
              <p className="text-gray-700 leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of the State of South Carolina, without regard to conflict of law provisions.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions regarding these Terms, please contact Landing Pages for Agents, LLC at{' '}
                <a href="mailto:team@landingpagesforagents.com" className="text-purple-600 hover:underline">team@landingpagesforagents.com</a>
                {' '}or visit{' '}
                <a href="https://www.landingpagesforagents.com" className="text-purple-600 hover:underline">https://www.landingpagesforagents.com</a>.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <FileText className="h-10 w-10 mr-3" style={{ color: '#6458AF' }} />
                <div className="text-left">
                  <div className="text-2xl font-bold leading-none" style={{ color: '#6458AF' }}>Landing Pages</div>
                  <div className="text-sm font-medium text-gray-400" style={{ letterSpacing: '0.15em' }}>for Agents</div>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Professional landing page templates designed specifically for insurance agents. <strong>Build trust, generate leads, and grow your business online.</strong>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About LP4A</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a onClick={() => setLocation('/choose-purpose')} className="hover:text-white transition-colors cursor-pointer">View Templates</a></li>
                <li><a onClick={() => setLocation('/custom-websites')} className="hover:text-white transition-colors cursor-pointer">Custom Pages</a></li>
                <li><a onClick={() => setLocation('/other-services')} className="hover:text-white transition-colors cursor-pointer">Other Services</a></li>
                <li><a onClick={() => setLocation('/pricing')} className="hover:text-white transition-colors cursor-pointer">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a onClick={() => setLocation('/contact')} className="hover:text-white transition-colors cursor-pointer">Contact</a></li>
                <li><a onClick={() => setLocation('/blog')} className="hover:text-white transition-colors cursor-pointer">Our Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ's</a></li>
                <li><a onClick={() => setLocation('/terms-of-service')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Landing Pages for Agents. All rights reserved.</p>
            <p className="text-sm mt-2 opacity-30">Landing Pages for Agents is Owned and Operated by 1612 Media, LLC</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

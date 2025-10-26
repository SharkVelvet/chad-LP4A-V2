import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import { PasswordProtectedRoute } from "./lib/password-protected-route";
import { useAnalytics } from "@/hooks/use-analytics";
import { useEffect } from "react";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import TemplateSelection from "@/pages/template-selection";
import TemplatePreviewPage from "@/pages/template-preview";
import WebsiteSetup from "@/pages/website-setup";
import Step3Pricing from "@/pages/step3-pricing";
import Step4Payment from "@/pages/step4-payment";
import Step5Success from "@/pages/step5-success";
import Dashboard from "@/pages/dashboard";
import Ideas from "@/pages/ideas";
import InternalOne from "@/pages/internal-one";
import GetClients from "@/pages/get-clients";
import RecruitAgents from "@/pages/recruit-agents";
import PlanrightHome from "@/pages/planright-home";
import StartTheProcess from "@/pages/start-the-process";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import CustomSolutions from "@/pages/custom-solutions";
import CustomWebsites from "@/pages/custom-websites";
import OtherServices from "@/pages/other-services";
import Pricing from "@/pages/pricing";
import TermsOfService from "@/pages/terms-of-service";
import Contact from "@/pages/contact";
import AdminSetup from "@/pages/admin-setup";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import ChooseWebsitePurpose from "@/pages/choose-website-purpose";
import SelectTemplateByCategory from "@/pages/select-template-by-category";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);
  
  return null;
}

function Router() {
  // Enable analytics tracking for all pages
  useAnalytics();

  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <Route path="/template-selection" component={TemplateSelection} />
        <Route path="/template-preview" component={TemplatePreviewPage} />
        <Route path="/setup" component={WebsiteSetup} />
        <Route path="/step3" component={Step3Pricing} />
        <Route path="/step4-payment" component={Step4Payment} />
        <Route path="/step5-success" component={Step5Success} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/choose-purpose" component={ChooseWebsitePurpose} />
        <ProtectedRoute path="/templates/:category" component={SelectTemplateByCategory} />
        <Route path="/ideas" component={Ideas} />
        <Route path="/internal-one" component={InternalOne} />
        <Route path="/get-clients" component={GetClients} />
        <Route path="/recruit-agents" component={RecruitAgents} />
        <Route path="/planright-home" component={PlanrightHome} />
        <Route path="/start-the-process" component={StartTheProcess} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/services" component={CustomSolutions} />
        <Route path="/custom-websites" component={CustomWebsites} />
        <Route path="/other-services" component={OtherServices} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin/setup" component={AdminSetup} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/old-home" component={HomePage} />
        <Route path="/" component={InternalOne} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

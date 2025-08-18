import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import { PasswordProtectedRoute } from "./lib/password-protected-route";
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
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);
  
  return null;
}

function Router() {
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
        <Route path="/ideas" component={Ideas} />
        <Route path="/internal-one" component={InternalOne} />
        <Route path="/get-clients" component={GetClients} />
        <Route path="/recruit-agents" component={RecruitAgents} />
        <Route path="/planright-home" component={PlanrightHome} />
        <Route path="/start-the-process" component={StartTheProcess} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
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

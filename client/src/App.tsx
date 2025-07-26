import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import { PasswordProtectedRoute } from "./lib/password-protected-route";
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
import PlanrightHome from "@/pages/planright-home";
import StartTheProcess from "@/pages/start-the-process";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <PasswordProtectedRoute path="/template-selection" component={TemplateSelection} />
      <PasswordProtectedRoute path="/template-preview" component={TemplatePreviewPage} />
      <PasswordProtectedRoute path="/setup" component={WebsiteSetup} />
      <PasswordProtectedRoute path="/step3" component={Step3Pricing} />
      <PasswordProtectedRoute path="/step4-payment" component={Step4Payment} />
      <PasswordProtectedRoute path="/step5-success" component={Step5Success} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <Route path="/ideas" component={Ideas} />
      <Route path="/internal-one" component={InternalOne} />
      <Route path="/planright-home" component={PlanrightHome} />
      <Route path="/start-the-process" component={StartTheProcess} />
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
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

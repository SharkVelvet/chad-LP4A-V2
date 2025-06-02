import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import AuthPage from "@/pages/auth-page";
import TemplateSelection from "@/pages/template-selection";
import TemplatePreviewPage from "@/pages/template-preview";
import WebsiteSetup from "@/pages/website-setup";
import Step3Pricing from "@/pages/step3-pricing";
import Step4Payment from "@/pages/step4-payment";
import Step5Success from "@/pages/step5-success";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/template-selection" component={TemplateSelection} />
      <Route path="/template-preview" component={TemplatePreviewPage} />
      <Route path="/setup" component={WebsiteSetup} />
      <Route path="/step3" component={Step3Pricing} />
      <Route path="/step4-payment" component={Step4Payment} />
      <Route path="/step5-success" component={Step5Success} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <Route path="/" component={TemplateSelection} />
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

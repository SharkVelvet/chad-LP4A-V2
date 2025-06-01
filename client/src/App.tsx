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
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/templates" component={TemplateSelection} />
      <Route path="/template-preview" component={TemplatePreviewPage} />
      <Route path="/setup" component={WebsiteSetup} />
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

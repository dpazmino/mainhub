import { Route, Switch, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import RolePage from "@/pages/role";
import AccountPage from "@/pages/account";
import TechAdminPage from "@/pages/tech-admin";
import { AppShell } from "@/components/app-shell";
import { queryClient } from "./lib/queryClient";

function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const hideShell = location === "/" || location === "/tech-admin";
  return <AppShell hideShell={hideShell}>{children}</AppShell>;
}

function Router() {
  return (
    <Shell>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/tech-admin" component={TechAdminPage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/role/student" component={() => <RolePage role="student" />} />
        <Route path="/role/staff" component={() => <RolePage role="staff" />} />
        <Route path="/role/experience" component={() => <RolePage role="experience" />} />
        <Route component={NotFound} />
      </Switch>
    </Shell>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

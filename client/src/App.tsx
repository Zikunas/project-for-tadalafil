import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import EducationHub from "./pages/EducationHub";
import ConsultBooking from "./pages/ConsultBooking";
import PharmacyFlow from "./pages/PharmacyFlow";
import SelfCheck from "./pages/SelfCheck";
import Payment from "./pages/Payment";
import Account from "./pages/Account";
import AdminDashboard from "./pages/AdminDashboard";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/giao-duc" component={EducationHub} />
      <Route path="/tu-van" component={ConsultBooking} />
      <Route path="/nha-thuoc" component={PharmacyFlow} />
      <Route path="/kiem-tra" component={SelfCheck} />
      <Route path="/thanh-toan" component={Payment} />
      <Route path="/tai-khoan" component={Account} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

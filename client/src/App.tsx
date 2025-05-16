import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Trading from "@/pages/trading";
import Dashboard from "@/pages/dashboard";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import { InvestorToast } from "@/components/ui/investor-toast";
import { useAuth } from "@/context/auth-context";

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/trading" component={Trading} />
            <Route path="/dashboard">
              {isAuthenticated ? <Dashboard /> : <Login redirectTo="/dashboard" />}
            </Route>
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
      <Toaster />
      <InvestorToast />
    </TooltipProvider>
  );
}

export default App;

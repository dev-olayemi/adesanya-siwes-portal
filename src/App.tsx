
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/auth-store";

// Landing Page
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Authentication Pages
import LoginStudent from "./pages/auth/LoginStudent";
import LoginSupervisor from "./pages/auth/LoginSupervisor";
import LoginCoordinator from "./pages/auth/LoginCoordinator";
import SignupStudent from "./pages/auth/SignupStudent";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentPayment from "./pages/student/Payment";

// Supervisor Pages
import SupervisorDashboard from "./pages/supervisor/Dashboard";

// Coordinator Pages
import CoordinatorDashboard from "./pages/coordinator/Dashboard";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ 
  children, 
  allowedRoles, 
  redirectPath = "/"
}: { 
  children: React.ReactNode;
  allowedRoles: string[];
  redirectPath?: string;
}) => {
  const { user, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated || !user || !allowedRoles.includes(user.role as string)) {
    return <Navigate to={redirectPath} replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          
          {/* Authentication Routes */}
          <Route path="/auth/login/student" element={<LoginStudent />} />
          <Route path="/auth/login/supervisor" element={<LoginSupervisor />} />
          <Route path="/auth/login/coordinator" element={<LoginCoordinator />} />
          <Route path="/auth/signup/student" element={<SignupStudent />} />
          
          {/* Student Routes */}
          <Route 
            path="/student/dashboard" 
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/payment" 
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentPayment />
              </ProtectedRoute>
            } 
          />
          
          {/* Supervisor Routes */}
          <Route 
            path="/supervisor/dashboard" 
            element={
              <ProtectedRoute allowedRoles={["supervisor"]}>
                <SupervisorDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Coordinator Routes */}
          <Route 
            path="/coordinator/dashboard" 
            element={
              <ProtectedRoute allowedRoles={["coordinator"]}>
                <CoordinatorDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

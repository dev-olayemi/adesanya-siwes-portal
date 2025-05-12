
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";
import { mockUsers } from "@/lib/mock-data";
import { toast } from "sonner";

const LoginSupervisor = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API request
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.role === "supervisor"
      );

      if (user) {
        login(user);
        toast.success("Login successful!");
        navigate("/supervisor/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="text-center">
          <img
            className="auth-logo"
            src="https://aapoly.edu.ng/wp-content/uploads/2021/12/aapoly-1.png"
            alt="Abraham Adesanya Polytechnic"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Supervisor Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the SIWES supervisor portal
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary/90">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>Demo Credentials:</strong><br />
            Email: supervisor@aapoly.edu.ng<br />
            Password: password
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSupervisor;

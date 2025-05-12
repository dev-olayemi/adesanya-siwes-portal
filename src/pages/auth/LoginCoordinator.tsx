
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore, supabase } from "@/store/auth-store";
import { toast } from "sonner";

const LoginCoordinator = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!supabase) {
        toast.error("Supabase is not configured. Please set up your environment variables.");
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Login successful!");
        // Navigation will be handled by the auth listener in auth-store.ts
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
            Coordinator Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the SIWES coordinator portal
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

        {!supabase && (
          <div className="mt-6 p-4 bg-red-50 rounded-md border border-red-200 text-red-700">
            <p className="text-sm">
              <strong>Error:</strong> Supabase is not configured. Set up your environment variables:
              <br />
              VITE_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL
              <br />
              VITE_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>Demo Credentials:</strong><br />
            Email: coordinator@aapoly.edu.ng<br />
            Password: password
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCoordinator;

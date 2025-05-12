
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="bg-primary py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://aapoly.edu.ng/wp-content/uploads/2021/12/aapoly-1.png"
              alt="Abraham Adesanya Polytechnic"
              className="h-10 w-auto"
            />
          </div>
          <nav className="flex space-x-4">
            <Link to="/auth/login/student">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                Student Login
              </Button>
            </Link>
            <Link to="/auth/login/supervisor">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                Staff Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero section */}
      <section className="flex-1 bg-gradient-to-b from-blue-50 to-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              SIWES Management Portal
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Abraham Adesanya Polytechnic
            </h2>
            <p className="text-lg text-gray-600">
              Streamlining the Student Industrial Work Experience Scheme process for
              students, supervisors, and coordinators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth/signup/student">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  Student Registration
                </Button>
              </Link>
              <Link to="/auth/login/coordinator">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Coordinator Access
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-xl border border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Students in industrial training"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Key features section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Key Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">For Students</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Register and track SIWES placement</li>
                <li>✓ Submit weekly reports</li>
                <li>✓ Download SIWES letter</li>
                <li>✓ Chat with supervisors</li>
                <li>✓ View feedback on reports</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">For Supervisors</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Track assigned students</li>
                <li>✓ Review weekly reports</li>
                <li>✓ Provide feedback</li>
                <li>✓ Communicate with students</li>
                <li>✓ Monitor student progress</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">For Coordinators</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Manage all students</li>
                <li>✓ Track SIWES organizations</li>
                <li>✓ Verify payments</li>
                <li>✓ Assign supervisors</li>
                <li>✓ Access reporting analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Abraham Adesanya Polytechnic</h3>
            <p className="text-gray-300">
              SIWES Management Portal
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-300">© {new Date().getFullYear()} All Rights Reserved</p>
            <p className="text-gray-300">Contact: info@aapoly.edu.ng</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

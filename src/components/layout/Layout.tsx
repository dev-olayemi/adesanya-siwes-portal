
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, LogOut, Menu, X, Home, FileText, MessageSquare, 
  Users, Calendar, BarChart, Bell, Settings 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Navigation links based on user role
  let navItems = [];
  
  if (user?.role === 'student') {
    navItems = [
      { name: 'Dashboard', href: '/student/dashboard', icon: Home },
      { name: 'Reports', href: '/student/reports', icon: FileText },
      { name: 'Messages', href: '/student/messages', icon: MessageSquare },
    ];
  } else if (user?.role === 'supervisor') {
    navItems = [
      { name: 'Dashboard', href: '/supervisor/dashboard', icon: Home },
      { name: 'Students', href: '/supervisor/students', icon: Users },
      { name: 'Reports', href: '/supervisor/reports', icon: FileText },
      { name: 'Messages', href: '/supervisor/messages', icon: MessageSquare },
    ];
  } else if (user?.role === 'coordinator') {
    navItems = [
      { name: 'Dashboard', href: '/coordinator/dashboard', icon: Home },
      { name: 'Students', href: '/coordinator/students', icon: Users },
      { name: 'Reports', href: '/coordinator/reports', icon: FileText },
      { name: 'Organizations', href: '/coordinator/organizations', icon: Settings },
      { name: 'Statistics', href: '/coordinator/statistics', icon: BarChart },
    ];
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-gray-600 bg-opacity-75" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-20 md:relative md:translate-x-0 transition duration-200 ease-in-out transform bg-sidebar flex-shrink-0 w-64 flex flex-col`}
      >
        <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 bg-sidebar-accent">
          <img 
            className="h-12 w-auto" 
            src="https://aapoly.edu.ng/wp-content/uploads/2021/12/aapoly-1.png" 
            alt="AAPOLY Logo"
          />
          <button 
            className="md:hidden absolute right-4 text-white"
            onClick={closeSidebar}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 px-2 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <item.icon className="mr-3 h-6 w-6 text-sidebar-primary" aria-hidden="true" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-sidebar-accent p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div className="ml-3">
                <Button 
                  variant="outline" 
                  className="w-full bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-primary hover:text-primary-foreground hover:bg-primary focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Page content */}
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

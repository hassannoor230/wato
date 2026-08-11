import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const pageTitles = {
    '/dashboard': 'Dashboard',
    '/dashboard/projects': 'Projects',
    '/dashboard/properties': 'Properties',
    '/dashboard/settings': 'Settings',
  };

  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="min-h-screen bg-navy-50/40 md:flex md:min-h-screen">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 min-w-0">
        <header className="bg-white/90 backdrop-blur-sm border-b border-navy-100 shadow-sm sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="md:hidden mr-4 p-2 rounded-lg text-navy-700 hover:bg-navy-50 transition-colors"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold tracking-tight text-navy-900">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-navy-600">Admin</span>
              <div className="w-9 h-9 bg-navy-900 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-navy-900/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}

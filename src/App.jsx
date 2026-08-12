import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import AdminLogin from './admin/pages/AdminLogin';
import AdminRoutes from './admin/components/AdminRoutes';
import Dashboard from './admin/pages/Dashboard';
import AdminProperties from './admin/pages/AdminProperties';
import AdminServices from './admin/pages/AdminServices';
import AdminGallery from './admin/pages/AdminGallery';
import AdminReviews from './admin/pages/AdminReviews';
import AdminFAQs from './admin/pages/AdminFAQs';
import AdminEnquiries from './admin/pages/AdminEnquiries';
import AdminBusinessSettings from './admin/pages/AdminBusinessSettings';
import AdminWebsiteSettings from './admin/pages/AdminWebsiteSettings';
import { AdminProvider } from './admin/context/AdminContext';
import NotFound from './pages/NotFound';
import PublicLayout from './components/PublicLayout';

const Hero = lazy(() => import('./components/Hero'));
const PropertySearch = lazy(() => import('./components/PropertySearch'));
const Services = lazy(() => import('./components/Services'));
const FeaturedProperties = lazy(() => import('./components/FeaturedProperties'));
const About = lazy(() => import('./components/About'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const Stats = lazy(() => import('./components/Stats'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const PropertyListing = lazy(() => import('./pages/properties/PropertyListing'));
const PropertyDetail = lazy(() => import('./pages/properties/PropertyDetail'));
const ServicesPage = lazy(() => import('./pages/services/ServicesPage'));
const GalleryPage = lazy(() => import('./pages/gallery/GalleryPage'));
const AboutPage = lazy(() => import('./pages/about/AboutPage'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-navy-200 border-t-navy-900 rounded-full animate-spin" />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="min-h-screen">
        <Header />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Hero />
            <PropertySearch />
            <Services />
            <FeaturedProperties />
            <About />
            <WhyChooseUs />
            <Stats />
            <Testimonials />
            <FAQ />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: '/properties',
    element: <PublicLayout><PropertyListing /></PublicLayout>,
  },
  {
    path: '/properties/:slug',
    element: <PublicLayout><PropertyDetail /></PublicLayout>,
  },
  {
    path: '/services',
    element: <PublicLayout><ServicesPage /></PublicLayout>,
  },
  {
    path: '/gallery',
    element: <PublicLayout><GalleryPage /></PublicLayout>,
  },
  {
    path: '/about',
    element: <PublicLayout><AboutPage /></PublicLayout>,
  },
  {
    path: '/contact',
    element: <PublicLayout><Contact /></PublicLayout>,
  },
  {
    path: '/admin',
    element: <AdminProvider><Outlet /></AdminProvider>,
    children: [
      { path: 'login', element: <AdminLogin /> },
      {
        element: <AdminRoutes />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'properties', element: <AdminProperties /> },
          { path: 'services', element: <AdminServices /> },
          { path: 'gallery', element: <AdminGallery /> },
          { path: 'reviews', element: <AdminReviews /> },
          { path: 'faqs', element: <AdminFAQs /> },
          { path: 'enquiries', element: <AdminEnquiries /> },
          { path: 'business-settings', element: <AdminBusinessSettings /> },
          { path: 'website-settings', element: <AdminWebsiteSettings /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <PublicLayout><NotFound /></PublicLayout>,
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;

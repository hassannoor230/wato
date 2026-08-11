import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './admin/components/AdminLayout';
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

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen">
              <Header />
              <main>
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
              </main>
              <Footer />
            </div>
          } />
          <Route path="/properties" element={<PublicLayout><PropertyListing /></PublicLayout>} />
          <Route path="/properties/:slug" element={<PublicLayout><PropertyDetail /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><GalleryPage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          <Route path="/admin/login" element={<AdminProvider><AdminLogin /></AdminProvider>} />
          <Route path="/admin" element={<AdminProvider><AdminRoutes><Dashboard /></AdminRoutes></AdminProvider>} />
          <Route path="/admin/properties" element={<AdminProvider><AdminRoutes><AdminProperties /></AdminRoutes></AdminProvider>} />
          <Route path="/admin/services" element={<AdminProvider><AdminRoutes><AdminServices /></AdminRoutes></AdminProvider>} />
          <Route path="/admin/gallery" element={<AdminProvider><AdminRoutes><AdminGallery /></AdminRoutes></AdminProvider>} />
          <Route path="/admin/reviews" element={<AdminProvider><AdminRoutes><AdminReviews /></AdminRoutes></AdminProvider>} />
          <Route path="/admin/faqs" element={<AdminProvider><AdminRoutes><AdminFAQs /></AdminRoutes></AdminProvider>} />
          <Route path="/admin/enquiries" element={<AdminProvider><AdminRoutes><AdminEnquiries /></AdminRoutes></AdminProvider>} />
          <Route path="/admin/business-settings" element={<AdminProvider><AdminRoutes><AdminBusinessSettings /></AdminRoutes></AdminProvider>} />
          <Route path="/admin/website-settings" element={<AdminProvider><AdminRoutes><AdminWebsiteSettings /></AdminRoutes></AdminProvider>} />

          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

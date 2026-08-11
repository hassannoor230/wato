import { useState, useEffect } from 'react';
import api from '../../admin/context/AdminContext';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await api.get('/services');
        setServices(response.data.data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="section bg-white border-b border-navy-100">
        <div className="container-premium">
          <div className="text-center mb-14">
            <div className="section-label justify-center">Our Services</div>
            <h1 className="section-title">Comprehensive Real Estate Solutions</h1>
            <p className="section-subtitle mx-auto">End-to-end property services across Gujranwala and surrounding areas.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-premium">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-navy-100 p-8 animate-pulse">
                  <div className="w-14 h-14 bg-navy-100 rounded-2xl mb-6" />
                  <div className="h-6 bg-navy-100 rounded w-2/3 mb-3" />
                  <div className="h-4 bg-navy-100 rounded w-full" />
                </div>
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-navy-500 text-lg">No services available at the moment.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service) => (
                <div key={service._id} className="group bg-white rounded-2xl border border-navy-100 p-8 lg:p-10 transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1 hover:border-navy-200">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-navy-50 text-navy-700 flex items-center justify-center transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-white">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-navy-500 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
